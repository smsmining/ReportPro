
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

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

export default  { drawContent, PageHandler, pdfWriter};
