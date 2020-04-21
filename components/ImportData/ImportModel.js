import React from 'react';
import { Button, Icon, Text, View } from 'native-base';
import { Overlay } from 'react-native-elements';
import XLSX from 'xlsx';

import { Pick, Types } from '../../utils/Storage';
import { jsonHelper } from '../../utils/jsonHelper';

import Model from '../../context/Model';
import ControlList from '../ControlList';
import { MessageAlert, GeneralAlertDialog } from '../Alerts';
import { AlignmentStyles, LoadingStyles } from '../../utils/Style';
import Control_Spinner from '../Controls/Control_Spinner';

const sheetLimit = /[A-Z]+[0-9]+:[A-Z]+([0-9]+)/;

export default class ImportModel extends React.Component
{
    modelControls = [];

    state =
        {loading: false
        ,highlightRequired: false

        ,entityKey: null
        ,entity: null
        ,dirty: false
        }

    componentDidMount()
    {
        this.modelControls = Model(
            {model: this.props.model
            ,controls: this.props.controls
            }).controls;           
    }

    missingRequired = {};
    setMissingRequired = (missing, param) =>
    {
        if (missing)
            this.missingRequired[param] = missing;
        else
            delete this.missingRequired[param];
    }


    import = async () =>
    {
        this.setState({ loading: true, entityKey: null, entity: null });

        try
        {
            const data = await Pick(Types.Excel, 'base64');
            if (!data)
                return this.setState({ loading: false });

            const workbook = XLSX.read(data, { type: 'base64' });

            if (!workbook.SheetNames || workbook.SheetNames.length === 0)
                throw "No sheets in workbook";

            let result = [];
            for (let i = 0; i < workbook.SheetNames.length; i++)
            {
                const sheetName = workbook.SheetNames[i];
                const sheet = workbook.Sheets[sheetName];
                const rows = parseInt(sheet["!ref"].match(sheetLimit)[1], 10);

                if (isNaN(rows))
                    continue;

                for (let j = 1; j <= rows; j++)
                {
                    const missingKey = null;
                    const parse = {};
                    for (let [param, col] of Object.entries(this.props.importMap))
                    {
                        const value = (sheet[col + j] || {}).w
                        if (value || value === 0)
                            parse[param] = value;
                        else if (param === this.props.entityKey)
                            missingKey = col;
                    }

                    if (!missingKey)
                        result.push(parse);
                    else if (Object.keys(parse))
                        MessageAlert("Failed to Import Row", sheetName + " " + missingKey + j + " was empty and the row could not be imported");
                }
            }

            if (result.length)
                this.props.onChange(result, this.props.param);
            else
                throw "No content in workbook";
        }
        catch (e)
        {
            console.log(e);
            MessageAlert("Failed to open document", "No document was selected or something went wrong.\nNothing was imported");
        }

        this.setState({ loading: false });
    }

    testDirty = (func) =>
    {
        if (!this.state.dirty)
            return func();

        GeneralAlertDialog
            ("Confirm Leave"
            ,"You have made unsaved changes.\nWould you like to proceed without saving?"
            ,func
            );
    }

    onSelect = (value) =>
    {
        const { entities, entityKey } = this.props;

        if (!entities || !entities.length)
            return;

        const entity = entities.find(e => e[entityKey] === value[entityKey].value);
        this.testDirty(() => this.setState({ entityKey: entity && entity[entityKey], entity: entity, highlightRequired: false, dirty: false }));
    }

    onAdd = () => this.testDirty(() => this.setState({ entityKey: null, entity: {}, highlightRequired: false, dirty: false }));

    onChange = (value, param) => this.setState({ entity: { ...this.state.entity, [param]: value }, dirty: true});

    onSave = () =>
    {
        const { entities } = this.props;
        const { entity, entityKey } = this.state;

        const required = Object.keys(this.missingRequired).length;

        this.setState({ highlightRequired: required });
        if (required)
            return MessageAlert
                ("Missing Fields"
                , "There are required fields that have not been filled."
                + "\nPlease complete the highlighted areas before proceeding."
                );

        if (!entities || !entities.length)
            this.props.onChange([entity], this.props.param);

        let resultEntities = jsonHelper.Clone(entities);

        const index = resultEntities.findIndex(e => e[this.props.entityKey] === entityKey);
        if (index === -1)
            resultEntities.push(entity);
        else
            resultEntities.splice(index, 1, entity);

        this.props.onChange(resultEntities, this.props.param);
        this.setState({ entityKey: entity[this.props.entityKey], highlightRequired: false, dirty: false });
    }

    render()
    {
        const { entities } = this.props;
        const { entity, entityKey } = this.state;

        let entityInstance = {};
        if (entity)
            for (let [param, value] of Object.entries(entity))
                entityInstance[param] = { value: value };

        return (
            <View style={{ paddingTop: 10 }}>
                {this.state.loading &&
                <Overlay height={100} containerStyle={AlignmentStyles.auto} isVisible>
                    <Text style={{ ...LoadingStyles.label, marginTop: 25 }}>Loading ...</Text>
                </Overlay>
                }
                {this.props.importMap &&
                <Button onPress={this.import} danger rounded={false} full bordered iconLeft iconRight>
                    <Text>Import {this.props.label ? this.props.label + " " : ""}Excel</Text>
                    <Icon name='import' type='MaterialCommunityIcons' />
                </Button>
                }
                {entities &&
                <Control_Spinner
                    param={this.props.entityKey}
                    label={'Edit' + (this.props.label ? " " + this.props.label : "")}
                    value={entityKey}
                    onSet={this.onSelect}
                    db={{ table: this.props.param }}
                    database={{ [this.props.param]: entities }}
                    dirty={this.props.dirty}
                />
                }
                <Button onPress={this.onAdd} success rounded={false} full bordered iconLeft iconRight>
                    <Text>+ Add New {this.props.label ? " " + this.props.label : ""}</Text>
                </Button>
                {entity !== undefined && entity !== null &&
                <React.Fragment>
                    <ControlList
                        param='edit'
                        instance={entityInstance}
                        controls={this.modelControls}
                        onChange={this.onChange}
                        onMissingRequired={this.setMissingRequired}
                        highlightRequired={this.state.highlightRequired}
                        onMounting={this.props.onMounting}
                        dirty={this.props.dirty}
                        active
                    />
                    <Button onPress={this.onSave} success>
                        <Text>Save {this.props.label ? " " + this.props.label : ""}</Text>
                    </Button>
                </React.Fragment>
                }
            </View>
        );
    }
}