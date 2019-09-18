import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNFetchBlob from 'rn-fetch-blob';

export default class PDFDraw
{
    GetPath = (guid, filename) => RNFetchBlob.fs.dirs.DCIMDir + '/Reports/' + guid + '/' + filename + ".pdf";

    path;
    _page;

    Clone = (guid, filename, onSuccess) =>
    {
        const date = new Date();
        const dateStamp = " " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() + 1) + "." + date.getMinutes() + "." + date.getSeconds();

        const srcFile = this.GetPath(guid, filename);
        this.path = this.GetPath(guid, filename + dateStamp);

        RNFetchBlob.fs.cp(srcFile, this.path)
            .then(() => onSuccess());
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