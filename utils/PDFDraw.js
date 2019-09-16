import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNFetchBlob from 'rn-fetch-blob';

const rootDirs = RNFetchBlob.fs.dirs;

const GetFilePath = (guid, filename) =>
{
    return rootDirs.DCIMDir + '/Reports/' + guid + '/' + filename;
};

const CreateDummyPDF = (guid, tempfile, dummyfile, onSuccess, onError) =>
{
    const srcFile = GetFilePath(guid, tempfile);
    const desFile = GetFilePath(guid, dummyfile);

    RNFetchBlob.fs.cp(srcFile, desFile)
        .then(() => onSuccess(desFile))
        .catch(onError);
};

const drawContent = (PageHandler,type,content, style) =>
{
    if(!content || !style)
        return;

    if( type === 'imageSelect')
        PageHandler.drawImage(
            content.uri.substr(content.uri.indexOf('/storage')),
            'jpg',
            style,
        );
    else
       PageHandler.drawText(
           content,
           style,
        );
};

const  PageHandler =  (pageNum) => {

    return PDFPage.modify(pageNum);
};

const  pdfWriter =  (pdfPath,page,onPDFGenerated) => {
    return PDFDocument
    .modify(pdfPath)
    .modifyPage(page)
    .write()
    .then(path => {
        onPDFGenerated(path);
        console.log('PDF modified at: ' + path);
    });
};

export default PDFDraw = { drawContent, PageHandler, pdfWriter, CreateDummyPDF };