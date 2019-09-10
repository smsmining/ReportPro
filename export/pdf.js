import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import ReportAlert from '../utils/ReportAlert';
import Forms from '../context/Forms';

var pdfConfig = null;
var pdfName = '';
var pdf_instance_index = 0;

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
        // call the function to display the pdf here???
    });
};

const onGenPDF = (guid,instance) =>
{

    Forms.GetPDFConfig(guid,instance, handlerPDFResponse);
}


const handlerPDFResponse = (guid,response,instance) =>
{
    if(!response)
        return;

    pdfConfig = response.pdf_pages;
    pdfName = response.pdf_name;

    Forms.CreateDummyPDF_1(guid,instance, pdfName, pdfName.substring(0,pdfName.indexOf('.pdf')) + pdf_instance_index + '.pdf', onWritePDF);

    pdf_instance_index++;
}


const onWritePDF = (pdfPath,instance) =>
{
    if(!pdfConfig)
        return;

        pdfConfig.forEach(page => {

        let pdfPage = PageHandler(page.id);
        page.controls.forEach(control => {
            instance && drawContent(pdfPage,control.type,instance[control.param],control.style);
        });
        pdfWriter(pdfPath,pdfPage);
    });
}

export default  {onGenPDF};
