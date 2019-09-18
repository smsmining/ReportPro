import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNFetchBlob from 'rn-fetch-blob';

export class PDFDraw
{
    Path = (guid, filename) => RNFetchBlob.fs.dirs.DCIMDir + '/Reports/' + guid + '/' + filename;

    _path;
    _page;

    Clone = (guid, filename, onSuccess) =>
    {
        const date = new Date();
        const dateStamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() + 1) + "." + date.getMinutes() + "." + date.getSeconds();

        const srcFile = this.Path(guid, filename);
        this._path = this.Path(guid, filename.substring(0, filename.indexOf('.pdf')) + dateStamp + '.pdf');

        RNFetchBlob.fs.cp(srcFile, this._path)
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

    Apply = (onSuccess) =>
    {
        if (this._path)
            return;

        return PDFDocument
            .modify(this._path)
            .modifyPage(this._page)
            .write()
            .then(path =>
            {
                console.log('PDF modified at: ' + path);

                if (onSuccess)
                    onSuccess(path);
            });
    };
}