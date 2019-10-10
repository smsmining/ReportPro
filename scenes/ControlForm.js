import React from 'react';
import { View, ScrollView } from 'react-native';
import { List, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TabView, TabBar } from 'react-native-tab-view';

import Forms from '../context/Forms';
import { GlobalStyles, LayoutPartials, AlignmentStyles } from '../utils/Style';

import ControlItem from '../components/ControlItem';
import PageLayout from '../components/Layout/PageLayout';
import SaveLoadFab from '../components/ControlForm/SaveLoadFAB';
import { MessageAlert, ConfirmAlert } from '../components/Alerts';
import ReportColors from '../utils/ReportColors';


export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,navigation: {index: -1, routes: []}
        ,instance: null

        ,hasSaved: null
        ,loading: false
        };

    componentDidMount()
        { this.loadForm(); }

    componentWillUnmount()
        { this.clearAsync(); }

    clearAsync = () =>
        { if (this._asyncReqForm) this._asyncReqForm.cancel(); }


    loadForm = () =>
    {
        const { guid } = this.props;
        const { loading } = this.state;

        if (loading)
            return;

        this.setState({ loading: true });
        this._asyncReqForm = Forms.Get(guid, this.loadFormResponse);

        Forms.HasInstance(guid, response => this.setState({ hasSaved: response }));
    }

    loadFormResponse = (response) =>
    {
        const { tabs } = response || {};

        this._asyncReqForm = null;

        let routes = [];
        for (let pos in tabs)
            routes.push({ key: pos, title: tabs[pos].label, icon: tabs[pos].icon });

        this.setState(
            {form: response
            ,navigation: { index: 0, routes: routes }
            ,loading: false
            });
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

    setInstanceValue = (value, param) => this.setState({ instance: { ...this.state.instance, [param]: value } });

    renderIcon = ({ route }) => (<Icon name={route.icon} style={{ color: this.state.navigation.index == route.key ? ReportColors.primary : ReportColors.border, fontSize: 18 }} type="FontAwesome" />)
    renderTabBar = (props) => (
        <TabBar
            {...props}
            renderIcon={this.renderIcon}
            activeColor={ReportColors.primary}
            inactiveColor={ReportColors.border}
            style={{ ...LayoutPartials.absoluteBottom, backgroundColor: ReportColors.secondary, borderTopColor: ReportColors.border, borderTopWidth: 2.5 }}
            indicatorStyle={{ backgroundColor: ReportColors.primary, height: 2.5 }}
        />)

    renderList = ({ route }) =>
    {
        const { form, instance } = this.state;
        const { tabs } = form;

        const tab = route && tabs[route.key];
        if (!tab)
            return null;

        return (
            <ScrollView>
                <List>
                    {tab.controls.map(control => (
                        <ControlItem
                            {...control}
                            key={control.param}
                            value={instance && instance[control.param] || control.value}
                            onChange={this.setInstanceValue}
                        />
                    ))}
                </List>
            </ScrollView>
        );
    }
    

    render()
    {
        const { form, navigation, instance, hasSaved, loading } = this.state;
        const { tabs, title } = form || {};

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={{ label: "Create PDF", onPress: this.onCreatePDF }}
                header={title}
            >
                <View style={{ height: GlobalStyles.screenHeight.height - 80 }}>
                    {loading &&
                    <Text style={AlignmentStyles.auto}>Loading ...</Text>
                    }
                    {tabs &&
                    <TabView
                        navigationState={navigation}
                        onIndexChange={index => this.setState({ navigation: { ...navigation, index: index } })}
                        renderScene={this.renderList}
                        renderTabBar={this.renderTabBar}
                        tabBarPosition='bottom'
                        initialLayout={GlobalStyles.screenWidth}
                    />
                    }
                </View>
                {hasSaved !== null &&
                <SaveLoadFab onSave={this.onSave} onLoad={hasSaved && this.onLoad} onNew={instance && this.onNew} />
                }
            </PageLayout>
        );
    }
}