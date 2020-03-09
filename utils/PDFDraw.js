import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import RNFetchBlob from 'rn-fetch-blob';

import { RequestStoragePermissions } from './Permission';

export default class PDFDraw
{
    GetResourcesPath = () => RNFetchBlob.fs.asset('resources/' + this._guid + '/');
    GetTemplatePath = () => this.GetResourcesPath() + 'template.pdf';
    GetAppendixPath = () => this.GetResourcesPath() + 'appendix.pdf';

    GetSavePath = (filename) => RNFetchBlob.fs.dirs.DCIMDir + '/Reports/' + this._guid + '/' + filename + ".pdf";

    GetDateStamp = () =>
    {
        const date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() + 1) + "." + date.getMinutes() + "." + date.getSeconds();
    }

    hexTest = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    hexShorthandTest = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexToRgb = (hex) =>
    {
        hex = hex.replace(this.shorthandRegex, function (m, r, g, b)
            { return r + r + g + g + b + b; });

        const result = this.hexTest.exec(hex);
        return result && rgb(parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255);
    }

    _guid;
    _document;
    _appendix;
    _page;

    path;

    Clone = async (guid, filename, onSuccess) =>
    {
        let hasPermission = await RequestStoragePermissions();
        if (!hasPermission)
        {
            this._onError("User denied storage permissions.");
            return;
        }

        this._guid = guid;

        this.path = this.GetSavePath(filename + " " + this.GetDateStamp());
        const rawTemplate = await RNFetchBlob.fs.readFile(this.GetTemplatePath(), 'base64');

        this._document = await PDFDocument.load(rawTemplate);
        this._document.registerFontkit(fontkit);

        const appendixPath = this.GetAppendixPath();

        //  RNFetchBlob.fs.exists crashes where the file doesnt exist
        let appendixExists = false;
        try { appendixExists = await RNFetchBlob.fs.exists(appendixPath); }
        catch (e) { appendixExists = false; }

        if (appendixExists)
        {
            const rawAppendix = await RNFetchBlob.fs.readFile(appendixPath, 'base64');
            this._appendix = await PDFDocument.load(rawAppendix);
        }

        if (onSuccess)
            onSuccess();
    }

    SetPage = (page) =>
    {
        const pages = this._document.getPages();

        this._page = pages.length > page
        ?   pages[page]
        :   this._document.addPage();
    }

    CloneAppendix = async (page) =>
    {
        if (!this._appendix)
            return false;

        const pages = this._appendix.getPages();

        if (pages.length < page)
            return false;

        const [copy] = await this._document.copyPages(this._appendix, [page]);
        this._page = this._document.addPage(copy);
    }

    DrawRectangle = (style) =>
    {
        if (!this._page || !style)
            return;

        style.color = undefined;
        if (style.backgroundColor)
            style.color = style.backgroundColor;

        if (typeof style.color == "string")
            style.color = this.hexToRgb(style.color);

        if (typeof style.borderColor == "string")
            style.borderColor = this.hexToRgb(style.borderColor);

        this._page.drawRectangle(style);
    }

    _cachedImages;
    DrawImage = async (content, style) =>
    {
        if (!this._page || !content || !style)
            return;

        if (!this._cachedImages)
            this._cachedImages = [];

        const imagePath = content.uri.substr(content.uri.indexOf('/storage'));

        let image = this._cachedImages.find(chachedImage => chachedImage.path == imagePath);
        if (!image)
        {
            let imageData = await RNFetchBlob.fs.readFile(imagePath, 'base64');
            const imageType = imagePath.substring(imagePath.lastIndexOf('.'));

            let imageEmbed;
            if ('.png' == imageType)
                imageEmbed = await this._document.embedPng(imageData);
            else if (['.jpg', '.jpeg'].includes(imageType))
                imageEmbed = await this._document.embedJpg(imageData);
            else
                return;

            image = { path: imagePath, embed: imageEmbed };
            this._cachedImages.push(image);
        }

        let renderstyle = { ...style };

        const ratio = content.width / content.height;
        if (style.width > style.height)
        {
            renderstyle.height = style.width / ratio;

            const shrink = style.height / renderstyle.height;
            renderstyle.width *= shrink;
            renderstyle.height *= shrink;
        }
        else
        {
            renderstyle.width = style.height * ratio;

            const shrink = style.width / renderstyle.width;
            renderstyle.width *= shrink;
            renderstyle.height *= shrink;
        }

        renderstyle.x += (style.width - renderstyle.width) / 2;
        renderstyle.y += (style.height - renderstyle.height) / 2;

        this._page.drawImage
            (image.embed
            ,renderstyle
            );
    }

    _cachedFonts;
    DrawText = async (content, style) =>
    {
        if (!this._page || !content || !style)
            return;

        if (!this._cachedFonts)
            this._cachedFonts = [];

        let font = this._cachedFonts.find(cachedFont => cachedFont.name == style.font);
        if (!font)
        {
            let fontData = StandardFonts[style.font];
            if (!StandardFonts)
                fontData = StandardFonts.Helvetica;

            let fontEmbed = await this._document.embedFont(fontData);

            font = { name: style.fontName, embed: fontEmbed };
            this._cachedFonts.push(font);
        }

        if (typeof style.color == "string")
            style.color = this.hexToRgb(style.color);

        let textY = style.y;
        const textHeight = font.embed.heightAtSize(style.size || 12) + 1;
        if (style.height && style.height > textHeight)
            textY = style.y + style.height - textHeight;

        const textW = font.embed.widthOfTextAtSize(content, style.size || 12);
        if (!style.width || style.width > textW)
            return this._page.drawText
                (content
                ,{size: 12
                ,...style
                ,y: textY
                ,font: font.embed
                });

        let i = 0;
        let words = content.split(' ');
        while (i < words.length)
        {
            let line = words.slice(0, i + 1).join(' ');
            const lineW = font.embed.widthOfTextAtSize(line, style.size || 12);

            if (lineW < style.width)
            {
                if (i == words.length - 1)
                    return this._page.drawText
                        (line
                        ,{size: 12
                        ,...style
                        ,y: textY
                        ,font: font.embed
                        });

                i++;
                continue;
            }

            if (i === 0)
            {
                let word = words[0];
                if (font.embed.widthOfTextAtSize(word.charAt(0), style.size || 12) > style.width)
                    throw "Cannot fit text in width [" + style.width + "; '" + content + "':'" + word + "']";

                for (let j = 1; j < word.length; j++)
                {
                    const part = word.substring(0, j) + "-";
                    let wordW = font.embed.widthOfTextAtSize(part, style.size || 12);

                    if (wordW < style.width)
                        continue;

                    this._page.drawText
                        (part
                        ,{size: 12
                        ,...style
                        ,y: textY
                        ,font: font.embed
                            });

                    words[0] = word.substring(j + 1);
                    break;
                }
            }
            else
            {
                line = words.slice(0, i).join(' ');
                this._page.drawText
                    (line
                    ,{size: 12
                    ,...style
                    ,y: textY
                    ,font: font.embed
                    });

                words.splice(0, i + 1);
            }

            textY -= textHeight;
            if (textY < style.y)
                break;

            i = 0;
        }
    }

    Apply = async () =>
    {
        if (!this.path)
            return;

        let saveBytes64 = await this._document.saveAsBase64();
        await RNFetchBlob.fs.writeFile(this.path, saveBytes64, 'base64');
    };
}