import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Icon } from 'native-base';
import { Overlay, Badge } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { TabView, TabBar } from 'react-native-tab-view';

import Forms from '../context/Forms';

import { GlobalStyles, LayoutPartials, AlignmentStyles, LoadingStyles } from '../utils/Style';
import ReportColors from '../utils/ReportColors';

import ControlList from '../components/ControlList';
import PageLayout from '../components/Layout/PageLayout';
import SaveLoadFab from '../components/ControlForm/SaveLoadFAB';
import { MessageAlert, GeneralAlertDialog } from '../components/Alerts';
import { INSTANCE_VERSION, Read, Database } from '../utils/Storage';
import { ControlKeys } from '../components/ControlItem';
import { Scenes } from '.';
import Model from '../context/Model';
import RulesEngine from '../components/RulesEngine';
import { jsonHelper } from '../utils/jsonHelper';
import DevFlags from '../DevFlags';

export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,navigation: -1

        ,instance: null
        ,database: null

        ,dirty: false
        ,highlightRequired: false

        ,loading: false
        ,hasSaved: null
        ,isTracking: false
        };

    componentDidMount() { this.loadForm(); }
    componentWillUnmount() { this.clearAsync(); }

    componentDidUpdate()
    {
        if (this.state.dirty)
            this.setState({ dirty: false });
    }

    clearAsync = () => { if (this._asyncReqForm) this._asyncReqForm.cancel(); }


    loadForm = () =>
    {
        const { guid } = this.props;
        const { loading } = this.state;

        if (loading)
            return;

        this.setState({ loading: true });
        
        Read(Database).then(database =>
        {
            this.setState({ database: database && jsonHelper.parseJson(database) });
            this._asyncReqForm = Forms.Get(guid, this.loadFormResponse);
            Forms.HasInstance(guid + INSTANCE_VERSION, response => this.setState({ hasSaved: response }));
        });
    }

    loadFormResponse = (response) =>
    {
        this._asyncReqForm = null;
        this.setState(
            {form: {...response, tabs: response.tabs.map(tab => this.validateLoadControl(tab)) }
            ,index: 0
            });
    }

    validateLoadControl = (control) =>
    {
        if (control.type === ControlKeys.Tab
        ||  control.type === ControlKeys.Collapse
            )
            return { ...control, controls: control.controls.map(child => this.validateLoadControl(child)) };

        if (control.type === ControlKeys.Model)
        {
            const model = Model(control);
            return { ...model, controls: model.controls.map(child => this.validateLoadControl(child)) };
        }
            
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
        if (this.state.hasSaved && !this.state.isTracking)
            GeneralAlertDialog
                ("Save Form"
                ,"If you proceed you will override any saved progress"
                ,() => this.onSaveCall(this.onSaveAlert)
            );
        else
            this.onSaveCall(this.onSaveAlert);
    }

    onSaveAlert = () => this.setState({ hasSaved: true, isTracking: true }, () => MessageAlert("Save Form", "Saved Successfully.\nChanges will now be autosaved.")); 
    onSaveCall = (callback) => Forms.SaveInstance
        (this.props.guid + INSTANCE_VERSION
        ,this.state.instance
        ,callback
        );

    onLoad = () => GeneralAlertDialog
        ("Load Form"
        ,"If you proceed you will loose any unsaved progress"
        ,() => Forms.LoadInstance(this.props.guid + INSTANCE_VERSION, result => this.setState({ instance: result, dirty: true, isTracking: true }, () => MessageAlert("Form Loaded", "Loaded Successfully.\nChanges will now be autosaved.")))
        );

    onNew = () => GeneralAlertDialog
        ("New Form"
        ,"If you proceed you will loose any unsaved progress"
        ,() => this.setState({ instance: null, dirty: true, isTracking: false })
        );

    onCreatePDF = () =>
    {
        const required = Object.keys(this.missingRequired).length;

        this.setState({ highlightRequired: required });
        if (required && !DevFlags.PrintWithoutRequired)
            return MessageAlert
                ("Missing Fields"
                ,"There are required fields that have not been filled."
            +  "\nPlease complete the highlighted areas before proceeding."
                );

        Actions[Scenes.ExportPreview]({ guid: this.props.guid, instance: this.state.instance, onChange: this.clearInstanceValue });
    }


    clearInstanceValue = () => this.setState({ instance: null, dirty: true, isTracking: false });

    setInstanceValue = (value, param) => this.setInstance({ [param]: { ...(this.state.instance || {})[param], value: value } });
    setInstance = (values) =>
    {
        let result = values;
        if (this.state.instance)
        {
            result = jsonHelper.Clone(this.state.instance);
            for (let [key, value] of Object.entries(values))
                result[key] = { ...result[key], ...value };
        }

        this.setState({ instance: result, dirty: dirty }, this.state.isTracking ? this.onSaveCall : undefined);
    }

    missingRequired = {};
    setMissingRequired = (missing, param) =>
    {
        if (missing)
            this.missingRequired[param] = missing;
        else
            delete this.missingRequired[param];
    }

    mounting = [];
    setMounting = (mounting, param) =>
    {
        const index = this.mounting.indexOf(param);

        if (!!mounting === (index !== -1))
            return;

        if (mounting)
            return this.mounting.push(param);
        else
            this.mounting.splice(index, 1);
            
        setTimeout(() => this.setState({ loading: !!this.mounting.length }), 500);
    }


    renderIcon = ({ route }) => (
        <View>
            {!(!this.state.highlightRequired || !this.missingRequired[route.param]) &&
            <Badge status="error" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
            }
            <Icon name={route.icon} style={{ color: this.state.index == route.key ? ReportColors.primary : ReportColors.border, fontSize: 18 }} type="FontAwesome" />
        </View>
    );
    renderTabBar = (props) => (
        <TabBar
            {...props}
            renderIcon={this.renderIcon}
            activeColor={ReportColors.primary}
            inactiveColor={ReportColors.border}
            style={{ ...LayoutPartials.absoluteBottom, backgroundColor: ReportColors.secondary, borderTopColor: ReportColors.border, borderTopWidth: 2.5 }}
            indicatorStyle={{ backgroundColor: ReportColors.primary, height: 2.5 }}
        />)

    renderScene = (props) => (
        <ScrollView>
            <RulesEngine
                {...props.route}
                instance={this.state.instance}
                database={this.state.database}
                onChange={this.setInstanceValue}

                rules={this.state.form.rules}
                onSet={this.setInstance}
            >
                <ControlList
                    {...props.route}
                    instance={this.state.instance}
                    database={this.state.database}
                    onChange={this.setInstanceValue}

                    onMissingRequired={this.setMissingRequired}
                    highlightRequired={this.state.highlightRequired}
                    onMounting={this.setMounting}
                />
            </RulesEngine>
        </ScrollView>
    );

    render()
    {
        const { form, index, instance, hasSaved, loading, dirty } = this.state;
        const { tabs, title } = form || {};

        let routes = [];

        if(form)
        for (let pos in tabs)
        {
            const tab = tabs[pos];

            routes.push(
                {key: pos
                ,param: pos
                ,title: tab.label
                ,icon: tab.icon
                ,active: pos == index
                ,dirty: loading || dirty
                ,controls: tab.controls
                });
        }

        return (
            <PageLayout
                back={{ icon: "home", onPress: Actions.pop }}
                next={tabs && !loading && { icon: "file-pdf-outline", iconType: "MaterialCommunityIcons", onPress: this.onCreatePDF }}
                header={title}
            >
                {loading &&
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