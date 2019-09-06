import React from 'react';
import { Container, Header, Content, Footer, List, Text} from 'native-base';

import Forms from '../context/Forms';
import { styles } from '../utils/Style';

import FormHeader from '../components/ControlForm/FormHeader';
import FormNavigation from '../components/ControlForm/FormNavigation';
import FormFab from '../components/ControlForm/FormFab';
import ControlItem from '../components/ControlItem';

import drawPDF from '../pdf/draw';

export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,openTab: null

        ,instance: null
        ,loading: false
        ,fab_active:false
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
            this.setState({ openTab: response.tabs[0].id });
            this.pdfConfig = response.pdf_pages;
        }
        else
            this.setState({ openTab: null });
    }


    clearAsync = () =>
    {
        if (this._asyncReqForm)
            this._asyncReqForm.cancel();
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

    render()
    {
        const { form, openTab, instance,fab_active } = this.state;

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
                    onPress={this.onActiveFab}
                    guid={form && form.guid}
                />
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