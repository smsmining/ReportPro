import React from 'react';
import { View, ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements'
import { List, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Forms from '../context/Forms';
import { GlobalStyles, LayoutPartials, AlignmentStyles, LoadingStyles } from '../utils/Style';

import ControlItem from '../components/ControlItem';
import PageLayout from '../components/Layout/PageLayout';
import SaveLoadFab from '../components/ControlForm/SaveLoadFAB';
import { MessageAlert, ConfirmAlert } from '../components/Alerts';
import ReportColors from '../utils/ReportColors';


export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,navigation: -1
        ,instance: null

        ,hasSaved: null

        ,loading: null
        };

    componentDidMount() { this.loadForm(); }
    componentWillUnmount() { this.clearAsync(); }

    clearAsync = () => { if (this._asyncReqForm) this._asyncReqForm.cancel(); }


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
        this._asyncReqForm = null;
        this.setState(
            {form: response
            ,index: 0
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

    renderIcon = ({ route }) => (<Icon name={route.icon} style={{ color: this.state.index == route.key ? ReportColors.primary : ReportColors.border, fontSize: 18 }} type="FontAwesome" />)
    renderTabBar = (props) => (
        <TabBar
            {...props}
            renderIcon={this.renderIcon}
            activeColor={ReportColors.primary}
            inactiveColor={ReportColors.border}
            style={{ ...LayoutPartials.absoluteBottom, backgroundColor: ReportColors.secondary, borderTopColor: ReportColors.border, borderTopWidth: 2.5 }}
            indicatorStyle={{ backgroundColor: ReportColors.primary, height: 2.5 }}
        />)

    componentDidUpdate()
    {
        const { loading } = this.state;

        if (loading === false)
            setTimeout(() => this.setState({ loading: null }), 1);
    }

    render()
    {
        const { form, index, instance, hasSaved, loading } = this.state;
        const { tabs, title } = form || {};

        let routes = [];

        if(form)
        for (let pos in tabs)
        {
            const tab = tabs[pos];

            routes.push(
                {key: pos
                ,title: tab.label
                ,icon: tab.icon
                ,active: pos == index
                ,controls: tab.controls.map(c => (
                    {...c
                    ,key: c.param
                    ,value: instance && instance[c.param] || c.value
                    ,onChange: this.setInstanceValue
                    }
                ))});
        }

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={tabs && loading === null && { label: "Create PDF", onPress: this.onCreatePDF }}
                header={title}
            >
                {loading !== null &&
                <Overlay height={100} containerStyle={AlignmentStyles.auto} >
                    <Text style={{ ...LoadingStyles.label, marginTop: 25 }}>Loading ...</Text>
                </Overlay>
                }
                {tabs &&
                <View style={{ height: GlobalStyles.screenHeight.height - 80 }}>
                    <TabView
                        navigationState={{ index: index, routes: routes }}
                        onIndexChange={index => this.setState({ index: index })}
                        renderScene={(props) => (<ControlFormList {...props} />)}
                        renderTabBar={this.renderTabBar}
                        tabBarPosition='bottom'
                        initialLayout={GlobalStyles.screenWidth}
                    />
                </View>
                }
                {hasSaved !== null &&
                <SaveLoadFab onSave={this.onSave} onLoad={hasSaved && this.onLoad} onNew={instance && this.onNew} />
                }
            </PageLayout>
        );
    }
}

class ControlFormList extends React.Component
{
    shouldComponentUpdate(newProps) { return newProps.route.active !== false; }

    render()
    {
        const { route } = this.props;
        const { controls } = route;

        if (!controls) return null;

        return (
            <ScrollView>
                <List>
                    {controls.map(ControlItem)}
                </List>
            </ScrollView>
        );
    }
}