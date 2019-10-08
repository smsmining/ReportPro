import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import RNFetchBlob from 'rn-fetch-blob';

import { RequestStoragePermissions } from './Permission';

export default class PDFDraw
{
    GetResourcesPath = () => RNFetchBlob.fs.asset('resources/' + this._guid + '/');
    GetTemplatePath = () => this.GetResourcesPath() + 'template.pdf';
    GetFontPath = (fontName) => RNFetchBlob.fs.asset('fonts/' + fontName + '.ttf');
    GetResFontPath = (fontName) => this.GetResourcesPath() + 'fonts/' + fontName + '.ttf';

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
        let rawTemplate = await RNFetchBlob.fs.readFile(this.GetTemplatePath(), 'base64');

        this._document = await PDFDocument.load(rawTemplate);
        this._document.registerFontkit(fontkit);

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

        this._page.drawImage
            (image.embed
            ,style
            );
    }

    _cachedFonts;
    DrawText = async (content, style) =>
    {
        if (!this._page || !content || !style)
            return;

        if (!this._cachedFonts)
            this._cachedFonts = [];

        style.font = style.font || "FreeSerif";

        let font = this._cachedFonts.find(cachedFont => cachedFont.name == style.font);
        if (!font)
        {
            let fontPath = this.GetResFontPath(style.font);
            let fontExists = await RNFetchBlob.fs.exists(fontPath);
            if (!fontExists)
                fontPath = this.GetFontPath(style.font);

            let fontData = await RNFetchBlob.fs.readFile(fontPath, 'base64');
            let fontEmbed = await this._document.embedFont(fontData);

            font = { name: style.fontName, embed: fontEmbed };
            this._cachedFonts.push(font);
        }

        if (typeof style.color == "string")
            style.color = this.hexToRgb(style.color);

        this._page.drawText
            (content
            ,{size: 12
             ,...style
             ,font: font.embed
             }
            );
    }

    Apply = async () =>
    {
        if (!this.path)
            return;

        let saveBytes64 = await this._document.saveAsBase64();
        await RNFetchBlob.fs.writeFile(this.path, saveBytes64, 'base64');
    };
}