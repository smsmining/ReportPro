import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Icon } from 'native-base';
import { Overlay, Badge } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { TabView, TabBar } from 'react-native-tab-view';
import ProgressBar from 'react-native-progress/Bar';

import { Scenes } from '.';
import DevFlags from '../DevFlags';

import { jsonHelper } from '../utils/jsonHelper';
import { GlobalStyles, LayoutPartials, AlignmentStyles, LoadingStyles, Colors } from '../utils/Style';
import ReportColors from '../utils/ReportColors';
import Forms from '../context/Forms';
import Instance from '../context/Instance';
import Database from '../context/Database';
import Model from '../context/Model';

import ControlList from '../components/ControlList';
import PageLayout from '../components/Layout/PageLayout';
import SaveLoadFab from '../components/ControlForm/SaveLoadFAB';
import { MessageAlert, GeneralAlertDialog } from '../components/Alerts';
import { ControlKeys } from '../components/ControlItem';
import RulesEngine from '../components/RulesEngine';
import AppFlags from '../AppFlags';

export default class ControlForm extends React.Component
{
    state =
        {form: null
        ,navigation: -1
        ,mountTick: 0

        ,instanceID: null
        ,instance: null
        ,database: null

        ,dirty: false
        ,highlightRequired: false

        ,loading: false
        ,hasSaved: null
        ,isTracking: false
        };

    componentDidMount()
    {
        this.loadForm();
        Instance.Clear({ guid: this.props.guid });
    }

    componentWillUnmount()
    {
        this.clearAsync();

        if (!this.state.instanceID)
            Instance.Clear({ guid: this.props.guid });
    }

    componentDidUpdate(oldProps, oldState)
    {
        if (this.state.dirty)
            this.setState({ dirty: false });

        this.mountUpdate(oldState.mountTick);
    }

    clearAsync = () => { if (this._asyncReqForm) this._asyncReqForm.cancel(); }


    loadForm = () =>
    {
        if (this.state.loading)
            return;

        this.setState({ loading: true });

        this._asyncReqForm = Forms.Get(this.props.guid).then(this.loadFormResponse);
        Database.Read().then(database => this.setState({ database: database }));
        Instance.Exists({ guid: this.props.guid, id: this.state.instanceID }).then(response => this.setState({ hasSaved: response }));
    }

    loadFormResponse = (response) =>
    {
        this._asyncReqForm = null;
        this.setState(
            {form: {...response, tabs: response.tabs.map(tab => this.validateLoadControl(tab)) }
            ,index: 0
            ,mountTick: 1
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


    onSaveCatch = (e) => { console.log(e); MessageAlert("Save Failed", 'Something went wrong saving the form'); }
    onSave = () =>
    {
        if (this.state.instanceID && !this.state.isTracking)
            GeneralAlertDialog
                ("Save Form"
                ,"If you proceed you will override any saved progress"
                ,() => this.onSaveCall().then(this.onSaveAlert).catch(this.onSaveCatch)
                );
        else
            this.onSaveCall().then(this.onSaveAlert).catch(this.onSaveCatch);
    }

    onSaveAlert = () => this.setState({ hasSaved: true, isTracking: true }, () => MessageAlert("Save Form", "Saved Successfully.\nChanges will now be autosaved."));
    onSaveCall = async () =>
    {
        if (this.state.instanceID)
            return await Instance.Write
                ({ guid: this.props.guid, id: this.state.instanceID }
                ,this.state.instance
                );

        const newID = new Date().getTime();
        this.setState({ instanceID: newID });
        await Instance.Write
            ({ guid: this.props.guid, id: newID, from: null }
            ,this.state.instance
            );
    }

    onLoad = () => GeneralAlertDialog
        ("Load Form"
        ,"If you proceed you will loose any unsaved progress"
        ,() => Instance.Read({ guid: this.props.guid, id: this.state.hasSaved })
            .then(result => this.setState({ instance: result, dirty: true, isTracking: true, instanceID: this.state.hasSaved }, () => MessageAlert("Form Loaded", "Loaded Successfully.\nChanges will now be autosaved.")))
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

        Actions[Scenes.ExportPreview]({ guid: this.props.guid, id: this.state.instanceID, instance: this.state.instance, onChange: this.clearInstanceValue });
    }


    clearInstanceValue = () => this.setState({ instance: null, dirty: true, isTracking: false });

    saveInstanceValueExternal = async (value, filename, format) => await Instance.WriteValue({ guid: this.props.guid, id: this.state.instanceID }, value, filename, format);

    setInstanceValue = (value, param) => this.setInstance({ [param]: { ...(this.state.instance || {})[param], value: value } });
    setInstance = (values, dirty) =>
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


    mounting = {};
    mountingIsLoading = () =>
    {
        if (this.state.form.tabs.length !== Object.keys(this.mounting).length)
            return true;

        for (const [, value] of Object.entries(this.mounting))
            if (value)
                return true;

        return false;
    }

    mountUpdate = (oldTick) =>
    {
        if (!this.state.mountTick || oldTick === this.state.mountTick)
            return;

        let ticks = Math.max(this.state.mountTick, oldTick) + 1;
        if ((AppFlags.ControlForm.MaxRenderTicks
        &&   ticks >= AppFlags.ControlForm.MaxRenderTicks)
        ||  !this.mountingIsLoading()
            )
            ticks = 0;

        setTimeout(() => this.setState({ mountTick: ticks }), AppFlags.ControlForm.DelayRenderTicks);
    }

    setMounting = (mounting, param) =>
    {
        const noChange = !this.mounting[param] === !mounting;
        this.mounting[param] = mounting;

        if (noChange)
            return;

        let tally = 0;
        for (const [, value] of Object.entries(this.mounting))
            tally += value ? value.tally : 0;

        if (tally)
            this.setState({ loading: tally })
        else
            setTimeout(() =>
            {
                if (this.mountingIsLoading())
                    return;

                this.setState({ loading: false });
            }, 500);
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
                rules={this.state.form.rules}
                onSet={this.setInstance}
            >
                <ControlList
                    {...props.route}
                    onMissingRequired={this.setMissingRequired}
                    highlightRequired={this.state.highlightRequired}
                    mountTick={this.state.mountTick}
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

        const commonProps =
            {instance: this.state.instance
            ,database: this.state.database
            ,onChange: this.setInstanceValue
            ,save: this.saveInstanceValueExternal
            };

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

                ,...commonProps
                });
        }

        let loadOverlay = null;
        if (loading)
        {
            let loadingStatus = [];
            for (let i = 0; i < routes.length; i++)
            {
                let result = { title: routes[i].title, value: 0 };
                if (i in this.mounting)
                {
                    const value = this.mounting[i];
                    result.value = value ? (value.tally / value.tallyOf).toFixed(2) : 1
                }
                loadingStatus.push(result);
            }

            loadOverlay = (
                <Overlay height={100 + (35 * routes.length)} containerStyle={AlignmentStyles.auto} isVisible>
                    <View>
                        <Text style={{ ...LoadingStyles.label, marginTop: 25 }}>Loading ...</Text>
                        {loadingStatus.map(status =>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginLeft: 25 }}>{status.title}</Text>
                            <ProgressBar
                                progress={status.value}
                                color={Colors.primary}
                                borderColor={Colors.primary}
                                width={null}                                      
                            />
                        </View>
                        )}
                    </View>
                </Overlay>
            );
        }

        return (
            <PageLayout
                back={{ icon: "home", onPress: Actions.pop }}
                next={tabs && !loading && { icon: "file-pdf-outline", iconType: "MaterialCommunityIcons", onPress: this.onCreatePDF }}
                header={title}
            >
                {loadOverlay}
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