import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Icon } from 'native-base';
import { Overlay } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { TabView, TabBar } from 'react-native-tab-view';

import Forms from '../context/Forms';

import { GlobalStyles, LayoutPartials, AlignmentStyles, LoadingStyles } from '../utils/Style';
import ReportColors from '../utils/ReportColors';

import ControlList from '../components/ControlList';
import PageLayout from '../components/Layout/PageLayout';
import SaveLoadFab from '../components/ControlForm/SaveLoadFAB';
import { MessageAlert, GeneralAlertDialog } from '../components/Alerts';
import { INSTANCE_VERSION } from '../utils/Storage';
import { ControlKeys } from '../components/ControlItem';

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

        Forms.HasInstance(guid + INSTANCE_VERSION, response => this.setState({ hasSaved: response }));
    }

    loadFormResponse = (response) =>
    {
        this._asyncReqForm = null;
        this.setState(
            {form: {...response, tabs: response.tabs.map(tab => this.validateLoadControl(tab)) }
            ,index: 0
            ,loading: false
            });
    }

    validateLoadControl = (control) =>
    {
        if (control.type === ControlKeys.Tab
        ||  control.type === ControlKeys.Collapse
            )
            return { ...control, controls: control.controls.map(child => this.validateLoadControl(child)) };

        if (control.type === ControlKeys.Looper)
            return { ...control, controls: control.controls.map(child => this.validateLoadControl(child)), value: control.value && control.value.map(this.validateLoadValue)};

        return control;
    }

    validateLoadValue = (data) =>
    {
        for (const [key, value] of Object.entries(data))
        {
            if (typeof value === 'object'
            && !(value instanceof Date)
                )
                continue;

            data[key] = { value: value };
        }

        return data;
    }

    onSave = () =>
    {
        const { hasSaved } = this.state;

        if (hasSaved)
            GeneralAlertDialog
                ("Save Form"
                ,"If you proceed you will override any saved progress"
                ,this.onSaveCall
            );
        else
            this.onSaveCall();
    }

    onSaveCall = () =>
        Forms.SaveInstance(this.props.guid + INSTANCE_VERSION, this.state.instance, () => { this.setState({ hasSaved: true }); MessageAlert("Save Form", "Saved Successfully") });

    onLoad = () => GeneralAlertDialog
        ("Load Form"
        ,"If you proceed you will loose any unsaved progress"
        ,() => Forms.LoadInstance(this.props.guid + INSTANCE_VERSION, result => this.setState({ instance: result }) )
        );

    onNew = () => GeneralAlertDialog
        ("New Form"
        ,"If you proceed you will loose any unsaved progress"
        ,() => {this.setState({ instance: null })}
        );


    onCreatePDF = () => Actions.PDF({ guid: this.props.guid, instance: this.state.instance ,onChange: this.clearInstanceValue  });

    clearInstanceValue = () => this.setState({ instance: null });

    setInstanceValue = (value, param) => this.setState({ instance: { ...this.state.instance, [param]: { ...(this.state.instance || {})[param], value: value } } });

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

    renderScene = (props) => (
        <ScrollView>
            <ControlList {...props.route} instance={this.state.instance} onChange={this.setInstanceValue} />
        </ScrollView>
    );

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
                ,controls: tab.controls
                });
        }

        return (
            <PageLayout
                back={{ icon: "home", onPress: Actions.pop }}
                next={tabs && loading === null && { icon: "file-pdf-outline", iconType: "MaterialCommunityIcons", onPress: this.onCreatePDF }}
                header={title}
            >
                {loading !== null &&
                <Overlay height={100} containerStyle={AlignmentStyles.auto} isVisible>
                    <Text style={{ ...LoadingStyles.label, marginTop: 25 }}>Loading ...</Text>
                </Overlay>
                }
                {tabs &&
                <View style={{ height: GlobalStyles.screenHeight.height - 80 }}>
                    <TabView
                        navigationState={{ index: index, routes: routes }}
                        onIndexChange={index => this.setState({ index: index })}
                        renderScene={this.renderScene}
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