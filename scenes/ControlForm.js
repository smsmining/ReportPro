import React from 'react';
import { Container, Header, Content, Footer, List, Text} from 'native-base';

import Forms from '../context/Forms';
import { styles } from '../utils/Style';

import FormHeader from '../components/ControlForm/FormHeader';
import FormNavigation from '../components/ControlForm/FormNavigation';
import FormFab from '../components/ControlForm/FormFab';
import ControlItem from '../components/ControlItem';

import drawPDF from '../pdf/draw';
import ReportAlert from '../utils/ReportAlert';
import ReportAsyncStore from '../utils/ReportAsyncStore';
import Mailer from 'react-native-mail';
import DialogInput from 'react-native-dialog-input';

export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,openTab: null

        ,instance: null
        ,loading: false
        ,fab_active: false
        ,email_active: false
        ,pdf_instance_name: null
        ,
        };

    pdfConfig = null;
    emailAdr = null;
    pdf_instance_index = 0;

    componentDidMount()
    {
        this.loadForm();
        this.loadEmail();
    }

    componentWillUnmount()
    {
        this.clearAsync();
    }


    loadForm = () =>
    {
        const { guid } = this.props;

        this.setState({ loading: true });

        this._asyncReqForm = Forms.Get(guid, this.loadFormResponse);

    }


    loadFormResponse = (response) =>
    {
        this._asyncReqForm = null;
        
        this.setState(
            {form: response
            ,loading: false
            ,
            });

        if (response && response.tabs)
        {
            this.setState({ openTab: response.tabs[0].id ,pdf_instance_name : response.pdf_name});
            this.pdfConfig = response.pdf_pages;
        }
        else
            this.setState({ openTab: null });
    }

    loadEmail = () =>
    {
        this._asyncReqEmail = ReportAsyncStore.getData('email',this.loadEmailResponse);
    }

    loadEmailResponse = (response) =>
    {
        this._asyncReqEmail = null;

        if (response)
            this.emailAdr = response;
    }


    clearAsync = () =>
    {
        if (this._asyncReqForm)
            this._asyncReqForm.cancel();

        if (this._asyncReqEmail)
            this._asyncReqEmail.cancel();
    }


    setInstanceValue = (value, param) =>
    {
        const { instance } = this.state;

        this.setState({ instance: { ...instance, [param]: value } });
    }


    onOpenTab = (id) =>
    {
        this.setState({ openTab: id });
    }

    onGenPDF = () =>
    {
        const { form } = this.state;
        const { guid } = this.props;
        this.setState({ pdf_instance_name: form.pdf_name.substring(0,form.pdf_name.indexOf('.pdf')) + this.pdf_instance_index + '.pdf' });
        Forms.CreateDummyPDF(guid, form.pdf_name, form.pdf_name.substring(0,form.pdf_name.indexOf('.pdf')) + this.pdf_instance_index + '.pdf', this.onWritePDF);
        this.pdf_instance_index++;
    }

    onWritePDF = (pdfPath) =>
    {
        const { instance} = this.state;

        if(!this.pdfConfig)
            return;

        this.pdfConfig.forEach(page => {

            let PageHandler = drawPDF.PageHandler(page.id);
            page.controls.forEach(control => {
                instance && drawPDF.drawContent(PageHandler,control.type,instance[control.param],control.style);
            });
            drawPDF.pdfWriter(pdfPath,PageHandler);
        });
    }

    onActiveFab = () =>
    {
        const { fab_active } = this.state;

        this.setState({ fab_active: !fab_active });
    }

    onActiveEmail = () =>
    {
        const { email_active } = this.state;

        this.setState({ email_active: !email_active });
    }


    onEmailSend = (text) =>
    {
        const { pdf_instance_name } = this.state;
        const { guid } = this.props;
        let pdfPath = Forms.GetFilePath(guid, pdf_instance_name);
    
        if(!text && !this.emailAdr)
        {
            ReportAlert('Email Error ','Please input the email address');
            return;
        }
        if(!text)
            text = this.emailAdr;

        this.handleEmail(pdf_instance_name,pdfPath, text);
        ReportAsyncStore.storeData('email',text);
        this.onActiveEmail();
        this.emailAdr = text;
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

    render()
    {
        const { form, openTab, instance,fab_active,email_active, pdf_instance_name } = this.state;

        const { tabs } = form || {};
        const tab = tabs && tabs.find(tabItem => tabItem.id === openTab);

        return (
            <Container>
                <Header androidStatusBarColor="#5D4037">
                    <FormHeader
                        title={form && form.title}
                        onPress={this.onGenPDF}
                     />
                </Header>
                <Content>
                    {this.loading &&
                    <Text style={styles.center}>Loading ...</Text>
                    }
                    {tab &&
                    <List>
                        {tab.controls.map(control => (
                            <ControlItem
                                key={control.id}
                                {...control}
                                value={instance && instance[control.param] || control.value }
                                onChange={this.setInstanceValue}
                            />
                            ))
                        }
                    </List>
                    }
                </Content>
               <FormFab
                    fab_active={fab_active}
                    onActiveFab={this.onActiveFab}
                    onActiveEmail={this.onActiveEmail}
                    guid={form && form.guid}
                    pdf_name={form && pdf_instance_name}
                />
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
                <Footer>
                    {tabs && tabs.length > 1 &&
                    <FormNavigation
                        tabs={tabs}
                        onPress={this.onOpenTab}
                    />
                    }
                </Footer>
            </Container>
        );
    }
}