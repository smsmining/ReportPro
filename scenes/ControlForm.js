import React from 'react';
import { Container, Header, Content, Footer, List, Text } from 'native-base';

import Forms from '../context/Forms';
import { styles } from '../utils/Style';

import FormHeader from '../components/ControlForm/FormHeader';
import FormNavigation from '../components/ControlForm/FormNavigation';

import ControlItem from '../components/ControlItem';

import drawPDF from '../draw_pdf/drawAPI';

export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,openTab: null

        ,instance: null
        ,loading: false
        ,
        };

    pdfConfig = null;

    componentDidMount()
    {
        this.loadForm();
    }

    componentWillUnmount()
    {
        this.clearAsync();
    }


    loadForm = () =>
    {
        const { guid } = this.props;

        this.setState({ loading: true });

        this._asyncReqFormConfig = Forms.GetFormConfig(guid, this.loadFormResponse);

        this._asyncReqPDFConfig = Forms.GetPDFConfig(guid, this.loadPDFConfigResponse);
    }

    loadFormResponse = (response) =>
    {
        this._asyncReqFormConfig = null;
        
        this.setState(
            {form: response
            ,loading: false
            ,
            });

        if (response && response.tabs)
            this.setState({ openTab: response.tabs[0].id });
        else
            this.setState({ openTab: null });
    }

    loadPDFConfigResponse = (response) =>
    {
        this._asyncReqPDFConfig = null;
        this.pdfConfig = response;
    }

    clearAsync = () =>
    {
        if (this._asyncReqFormConfig)
            this._asyncReqFormConfig.cancel();
        
        if (this._asyncReqPDFConfig)
            this._asyncReqPDFConfig.cancel();
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
        const { instance } = this.state;
        // hardcoding with file path, it will be replaced with file system operator api later
        let pdfPath = '/storage/emulated/0/Android/data/com.reportsms/files/Pictures/Inspection Report.pdf';

        if(!this.pdfConfig)
            return;

        this.pdfConfig.pages.forEach(page => {

            let PageHandler = drawPDF.PageHandler(page.id);
            page.controls.forEach(control => {
                instance && drawPDF.drawContent(PageHandler,control.type,instance[control.param],control.style);
            });
            drawPDF.pdfWriter(pdfPath,PageHandler);
        });
    }


    render()
    {
        const { form, openTab, instance } = this.state;

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
                                guid={form.guid}
                                {...control}
                                value={instance && instance[control.param] || control.value }
                                onChange={this.setInstanceValue}
                            />
                            ))
                        }
                    </List>
                    }
                </Content>
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