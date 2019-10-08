import React from 'react';
import { Alert } from 'react-native';
import { Content, Footer, List, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Forms from '../context/Forms';
import { styles } from '../utils/Style';

import FormNavigation from '../components/ControlForm/FormNavigation';
import ControlItem from '../components/ControlItem';
import PageLayout from '../components/Layout/PageLayout';
import SaveLoadFab from '../components/ControlForm/SaveLoadFAB';
import { MessageAlert, ConfirmAlert } from '../components/Alerts';


export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,openTab: null
        ,hasSaved: null
        ,instance: null
        ,loading: false
        };

    componentDidMount()
    {
        this.loadForm();
    }

    componentWillUnmount()
    {
        this.clearAsync();
    }

    clearAsync = () =>
    {
        if (this._asyncReqForm)     this._asyncReqForm.cancel();
    }


    loadForm = () =>
    {
        const { guid } = this.props;

        this.setState({ loading: true });

        this._asyncReqForm = Forms.Get(guid, this.loadFormResponse);

        Forms.HasInstance(guid, response => this.setState({ hasSaved: response }));
    }

    loadFormResponse = (response) =>
    {
        const { tabs } = response || {};

        this._asyncReqForm = null;
        
        this.setState(
            {form: response
            ,loading: false
            });

        this.onOpenTab(tabs && tabs[0].id);
    }

    onSave = () =>
    {
        const { hasSaved } = this.state;

        if (hasSaved)
            ConfirmAlert
                ("Save Form"
                ,"If you proceed you will override any saved progress"
                ,this.onSaveCall
            );
        else
            this.onSaveCall();
    }

    onSaveCall = () =>
        Forms.SaveInstance(this.props.guid, this.state.instance, () => { this.setState({ hasSaved: true }); MessageAlert("Save Form", "Saved Successfully") });

    onLoad = () => ConfirmAlert
        ("Load Form"
        ,"If you proceed you will loose any unsaved progress"
        ,() => Forms.LoadInstance(this.props.guid, result => this.setState({ instance: result }) )
        );

    onNew = () => ConfirmAlert
        ("New Form"
        ,"If you proceed you will loose any unsaved progress"
        ,() => {this.setState({ instance: null })}
        );


    onCreatePDF = () => Actions.PDF({ guid: this.props.guid, instance: this.state.instance });


    onOpenTab = (id) => this.setState({ openTab: id });

    setInstanceValue = (value, param) => this.setState({ instance: { ...this.state.instance, [param]: value } });

    render()
    {
        const { form, openTab, instance, hasSaved, loading } = this.state;

        const { tabs, title } = form || {};
        const tab = tabs && tabs.find(tabItem => tabItem.id === openTab);

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={{ label: "Create PDF", onPress: this.onCreatePDF }}
                header={title}
            >
                <Content>
                    {loading &&
                    <Text style={styles.center}>Loading ...</Text>
                    }
                    {tab &&
                    <List>
                        {tab.controls.map(control => (
                            <ControlItem
                                {...control}
                                key={control.param}
                                value={instance && instance[control.param] || control.value }
                                onChange={this.setInstanceValue}
                            />
                            ))
                        }
                    </List>
                    }
                </Content>
                {hasSaved !== null &&
                <SaveLoadFab onSave={this.onSave} onLoad={hasSaved && this.onLoad} onNew={instance && this.onNew} />
                }
                {tabs && tabs.length > 1 &&
                <Footer>
                    <FormNavigation
                        tabs={tabs}
                        onPress={this.onOpenTab}
                    />
                </Footer>
                }
            </PageLayout>
        );
    }
}