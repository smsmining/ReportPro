import React from 'react';
import { Content, Footer, List, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Forms from '../context/Forms';
import { styles } from '../utils/Style';

import FormNavigation from '../components/ControlForm/FormNavigation';
import ControlItem from '../components/ControlItem';
import PageLayout from '../components/Layout/PageLayout';


export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,openTab: null
        ,instance: null
        ,loading: false
        };

    pdf_instance_index = 0;
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
            });

        if (response && response.tabs)
            this.setState({ openTab: response.tabs[0].id});
        else
            this.setState({ openTab: null });
    }


    clearAsync = () =>
    {
        if (this._asyncReqForm)
            this._asyncReqForm.cancel();
    }


    setInstanceValue = (value, param) => this.setState({ instance: { ...this.state.instance, [param]: value } });

    onCreatePDF = () =>
    {
        const { guid } = this.props;
        const { instance } = this.state;
        
        Actions.PDF({ guid, instance, pdf_instance_index: this.pdf_instance_index });

        this.pdf_instance_index++;
    }

    onOpenTab = (id) => this.setState({ openTab: id });

    render()
    {
        const { form, openTab, instance, loading } = this.state;

        const { tabs } = form || {};
        const tab = tabs && tabs.find(tabItem => tabItem.id === openTab);

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.Reports }}
                next={{ label: "Create PDF", onPress: this.onCreatePDF }}
                header={form.title || ""}
            >
                <Content>
                    {loading &&
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
                <Footer>
                    {tabs && tabs.length > 1 &&
                    <FormNavigation
                        tabs={tabs}
                        onPress={this.onOpenTab}
                    />
                    }
                </Footer>
            </PageLayout>
        );
    }
}
