
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import ReportAlert from '../utils/ReportAlert';
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

const  pdfWriter =  (pdfPath,page) => {
    return PDFDocument
    .modify(pdfPath)
    .modifyPage(page)
    .write()
    .then(path => {
        console.log('PDF modified at: ' + path);
        ReportAlert('PDF Created','the pdf doc has been created. \nyou can preview and email it by pressing the sharing float button');
    });
};

export default  { drawContent, PageHandler, pdfWriter};
