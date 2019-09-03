import React from 'react';
import { Container, Header, Content, Footer, List, Text } from 'native-base';

import Forms from '../context/Forms';
import { styles } from '../utils/Style';

import FormHeader from '../components/ControlForm/FormHeader';
import FormNavigation from '../components/ControlForm/FormNavigation';

import ControlItem from '../components/ControlItem';

export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,openTab: null

        ,instance: null
        ,loading: false
        ,
        };

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
            this.setState({ openTab: response.tabs[0].id })
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


    render()
    {
        const { form, openTab, instance } = this.state;

        const { tabs } = form || {};
        const tab = tabs && tabs.find(tabItem => tabItem.id === openTab);

        return (
            <Container>
                <Header androidStatusBarColor="#5D4037">
                    <FormHeader title={form && form.title} />
                </Header>
                <Content>
                    {this.loading &&
                    <Text style={styles.center}>Loading ...</Text>
                    }
                    {tab &&
                    <List>
                        {tab.controls.map(control => (
                            <ControlItem
                                key={control.param}
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