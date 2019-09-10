import React from 'react';
import Forms from '../context/Forms';
import drawPDF from './PDFDraw';
import { Container, Header } from 'native-base';
import FormHeader from '../components/ControlForm/FormHeader';
import { Text } from 'react-native';
import { styles } from '../utils/Style';
import PDFDisplay from './PDFDisplay';
import DialogInput from 'react-native-dialog-input';
import MessageAlert from '../utils/MessageAlert';
import Mailer from 'react-native-mail';


export default class PDF extends React.Component
{
    state = { 
        loaded: false,
        pdf: null,
        email_active: false,
    };

     pdfConfig = null;
     pdfName = '';

    

    componentDidMount()
    {
        const { guid} = this.props;
        this._asyncReqPDF = Forms.Get(guid, this.handlerPDFResponse);
    }

    componentWillUnmount()
    {
        if (this._asyncReqPDF)
            this._asyncReqPDF.cancel();
    }

    handlerPDFResponse = (response) => {
        this._asyncReqPDF = null;

        const { guid,pdf_instance_index } = this.props;

        if(!response)
            return;
        this.pdfConfig = response.pdf_pages;
        this.pdfName = response.pdf_name;
        Forms.CreateDummyPDF(guid, this.pdfName, this.pdfName.substring(0,this.pdfName.indexOf('.pdf')) + pdf_instance_index + '.pdf', this.onWritePDF);
    }

    onWritePDF = (pdfPath) =>
    {
        const { instance } = this.props;

        if(!this.pdfConfig)
            return;

        this.pdfConfig.forEach(page => {
        let pdfPage = drawPDF.PageHandler(page.id);
        page.controls.forEach(control => {
            instance && drawPDF.drawContent(pdfPage,control.type,instance[control.param],control.style);
        });
        drawPDF.pdfWriter(pdfPath,pdfPage,this.onPDFGenerated);
        });
    }

    onPDFGenerated = (data) =>{
        this.setState({pdf: data});
    }

    onActiveEmail = () =>
    {
        const { email_active } = this.state;

        this.setState({ email_active: !email_active });
    }

    onEmailSend = (text) =>
    {
        const { pdf } = this.state;
    
        if(!text )
        {
            MessageAlert('Email Error ','Please input the email address');
            return;
        }
        this.handleEmail(this.pdfName,pdf, text);
        this.onActiveEmail();
    }

    handleEmail = (pdfname,pdfPath,email) => {
        Mailer.mail({
          subject: pdfname,
          recipients: [email],
          body: '<b>Please check</b>',
          isHTML: true,
          attachment: {
            path: pdfPath,
            type: 'pdf',
            name: pdfname,
          },
        }, (error, event) => {
            MessageAlert('Email Error ',error);
        });
    };

    render()
    {
        const {loaded,pdf,email_active} = this.state;
        return (
            <Container>
                <Header androidStatusBarColor="#5D4037">
                    <FormHeader
                        title={this.pdfName}
                        onPress={this.onActiveEmail}
                        action={'Send PDF'}
                     />
                </Header>
                {!loaded &&
                    <Text style={styles.loadingText}>Loading ...</Text>
                }
                {pdf && <PDFDisplay
                    pdfPath = {pdf}
                    onLoadComplete = {()=> this.setState({ loaded:true})}
                    onError = {(error) => this.setState({loaded: false})}
                />
                }
                {email_active &&
                <DialogInput
                    isDialogVisible={email_active}
                    title={'Email'}
                    message={'please input email address'}
                    submitText="Send"
                    textInputProps={{keyboardType:'email-address'}}
                    closeDialog={this.onActiveEmail}
                    submitInput={text  => this.onEmailSend(text)}

                />}
            </Container>

        );
    }
}