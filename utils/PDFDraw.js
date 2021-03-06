import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

import { StoragePermission } from './Permission';
import { Write, Read, Asset, Temp } from './Storage';
import AppFlags from '../AppFlags';
import ImageHelper from './imageHelper';

export default class PDFDraw
{
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
    _temp;

    Clone = async (guid, onSuccess) =>
    {
        let hasPermission = await StoragePermission();
        if (!hasPermission)
        {
            this._onError("User denied storage permissions.");
            return;
        }

        this._guid = guid;
        this._temp = await Temp();

        const rawTemplate = await Read(Asset + this._guid + '/' + 'template.pdf', 'base64');

        this._document = await PDFDocument.load(rawTemplate);
        this._document.registerFontkit(fontkit);

        const appendixRaw = await Read(Asset + this._guid + '/' + 'appendix.pdf', 'base64');
        if (appendixRaw)
            this._appendix = await PDFDocument.load(appendixRaw);

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

    DrawImage = async (content, style) =>
    {
        if (!this._page || !content || !style)
            return;

        let renderstyle = ImageHelper.FitInside(content, style);

        let imageData = ImageHelper.getImageParams(content.uri);
        if (!['png', 'jpeg', 'jpg'].includes(imageData.type))
            return console.log("Unknown image type: " + imageData.type);

        const scale = ImageHelper.calcScale(content.width, renderstyle.width);
        if (scale > 1)
            imageData.uri = await ImageHelper.imageScale
                (imageData.uri
                ,renderstyle.width * scale, renderstyle.height * scale
                ,imageData.type
                ,AppFlags.PDFDraw.image.compressionQuality
                ,'base64'
                );
        else
            imageData.uri = imageData.uri.replace('data:image/' + imageData.type + ';base64,', '');

        let imageEmbed;
        if (imageData.type === 'png')
            imageEmbed = await this._document.embedPng(imageData.uri);
        else
            imageEmbed = await this._document.embedJpg(imageData.uri);
        
        renderstyle.x += (style.width - renderstyle.width) / 2;
        renderstyle.y += (style.height - renderstyle.height) / 2;

        await this._page.drawImage
            (imageEmbed
            ,renderstyle
            );
    }

    _cachedFonts;
    DrawText = async (content, style) =>
    {
        if (!this._page || !content || !style)
            return;

        const renderContent = content.toString();

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

        const textW = font.embed.widthOfTextAtSize(renderContent, style.size || 12);
        if (!style.width || style.width > textW)
            return this._page.drawText
                (renderContent
                ,{size: 12
                ,...style
                ,y: textY
                ,font: font.embed
                });

        let i = 0;
        let words = renderContent.split(' ');
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
                    throw "Cannot fit text in width [" + style.width + "; '" + renderContent + "':'" + word + "']";

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

    Apply = async (filename) =>
    {
        const path = this._temp + filename + ".pdf";

        let saveBytes64 = await this._document.saveAsBase64();
        console.log(saveBytes64.length / (4000000 / 3) + "Mb pdf size");
        await Write(path, saveBytes64, 'base64');
        return path;
    };
}
