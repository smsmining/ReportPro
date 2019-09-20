import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNFetchBlob from 'rn-fetch-blob';
import { RequestStoragePermissions } from './Permission';

export default class PDFDraw
{
    GetTemplatePath = (guid) => RNFetchBlob.fs.asset('resources/' + guid + '/template.pdf');
    GetSavePath = (guid, filename) => RNFetchBlob.fs.dirs.DCIMDir + '/Reports/' + guid + '/' + filename + ".pdf";

    GetDateStamp = () =>
    {
        const date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() + 1) + "." + date.getMinutes() + "." + date.getSeconds();
    }

    path;
    _page;

    _onError;

    constructor(onError)
    {
        this._onError = onError;
    }

    Clone = (guid, filename, onSuccess) =>
    {
        const srcFile = this.GetTemplatePath(guid);
        this.path = this.GetSavePath(guid, filename + " " + this.GetDateStamp());

        RequestStoragePermissions(
            () => RNFetchBlob.fs.cp(srcFile, this.path).then(onSuccess)
            ,this._onError
            );
    }

    SetPage = (page) => this._page = PDFPage.modify(page);

    DrawImage = (content, style) =>
    {
        if (!this._page || !content || !style)
            return;

        this._page.drawImage
            (content.uri.substr(content.uri.indexOf('/storage'))
            ,'jpg'
            ,style
            );
    }

    DrawText = (content, style) =>
    {
        if (!this._page || !content || !style)
            return;

        this._page.drawText
            (content
            ,style
            );
    }

    Apply = () =>
    {
        if (!this.path)
            return;

        PDFDocument
            .modify(this.path)
            .modifyPage(this._page)
            .write();
    };
}