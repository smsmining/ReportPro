import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from '../utils/Style';
import Pdf from 'react-native-pdf';
import Forms from '../context/Forms';
import { Container, Header, Content} from 'native-base';
import FormHeader from '../components/ControlForm/FormHeader';
import ReportAlert from '../utils/ReportAlert';
import Mailer from 'react-native-mail';
import DialogInput from 'react-native-dialog-input';

class PDFShow extends Component {

    state =
        {email_active: false,
        };

    onEmailSend = (text) =>
    {
        const { pdf_instance_name } = this.state;
        const { guid } = this.props;
        let pdfPath = Forms.GetFilePath(guid, pdf_instance_name);
    
        if(!text )
        {
            ReportAlert('Email Error ','Please input the email address');
            return;
        }
        this.handleEmail(pdf_instance_name,pdfPath, text);
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
            ReportAlert('Email Error ',error);
        });
    };

    onActiveEmail = () =>
    {
        const { email_active } = this.state;

        this.setState({ email_active: !email_active });
    }

  render() {

    const { form, openTab, instance,fab_active,email_active, pdf_instance_name } = this.state;
    const { guid,pdf_name} = this.props;
    let pdfPath = Forms.GetFilePath(guid, pdf_name);
    const uriValue = 'file://' + pdfPath;
    const source = {uri: uriValue};

    return (
         <Container>
                <Header androidStatusBarColor="#5D4037">
                    <FormHeader
                        title={pdf_name}
                        onPress={this.onEmailPDF}
                        action={'Send PDF'}
                     />
                </Header>
                <Content>
                <View style={styles.pdfContainer}>
                    <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
                     {email_active &&
                    <DialogInput
                        isDialogVisible={email_active}
                        title={'Email'}
                        message={'please input email address'}
                        hintInput ={this.emailAdr}
                        submitText="Send"
                        textInputProps={{keyboardType:'email-address'}}
                        closeDialog={this.onActiveEmail}
                        submitInput={text  => this.onEmailSend(text)}

                    />}
                </View>
                </Content>
            </Container>
    );
  }
}

export default PDFShow;
