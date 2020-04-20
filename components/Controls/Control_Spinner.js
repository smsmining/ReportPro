import React from 'react';
import { Input, Picker, Icon, View, CheckBox, Body, Text, List, ListItem } from 'native-base';

import { jsonHelper } from '../../utils/jsonHelper';

import ReportColors from '../../utils/ReportColors';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import InlineLabelItem from './Layout/InlineLabelItem';

import { ShouldUpdate } from '../ControlItem';
import { HighlightStyles } from '../../utils/Style';

export default class Control_Spinner extends React.Component
{
    shouldComponentUpdate(newProps)
    {
        if (ShouldUpdate(this.props, newProps))
            return true;

        if(!this.props.value && !newProps.value)
            return false;

        const wasManual = this.props.value && typeof this.props.value === 'object' && this.props.value.manual;
        const isManual = newProps.value && typeof newProps.value === 'object' && newProps.value.manual;

        if(wasManual ^ isManual)
            return true;

        if(wasManual && isManual)
            return this.props.value.value !== newProps.value.value;

        return this.props.value !== newProps.value;
    }

    render()
    {
        const { value, param, manual, onSet, controls, db, database, radio, disabled } = this.props;

        if (!controls && !db)
            return (
                <View>
                    <InlineLabelItem {...this.props} >
                        <Text>No Options</Text>
                    </InlineLabelItem>
                </View>);


        let renderControls = controls ? jsonHelper.Clone(controls) : [];
        if (db && database)
        {
            const { table, column } = db;

            const dbTable = database[table];
            const dbColumn = column || param;

            let renderDb = [];
            if (dbTable && dbTable.length)
                for (let i = 0; i < dbTable.length; i++)
                    if (dbTable[i] && dbTable[i][dbColumn] !== undefined)
                        renderDb.push({ label: dbTable[i][dbColumn], value: dbTable[i][dbColumn] });

            renderDb.sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase());
            renderControls = renderControls.concat(renderDb);
        }

        let renderManual = null;
        if (manual || (value && !renderControls.find(c => c.value === value)))
        {
            const selected = renderControls.find(c => c.manual);
            if (selected)
                selected.value = value;
            else
                renderControls.push({ label: 'Manual Entry', value: value });

            renderManual = (
                <Input
                    placeholder="Type Here"
                    value={value}
                    onChangeText={(newValue) => onSet({ [param]: { value: newValue, manual: true } })}
                    disabled={disabled}
                    style={HighlightStyles.maintain}
                />);
        }
        else if (!radio)
        {
            const selected = renderControls.find(c => value === c.value);
            if (!selected)
                renderControls.unshift({label: ""});
        }

        const onItemChange = (newValue) =>
        {
            const selected = renderControls && renderControls.find(c => c.value === newValue);
            onSet({ [param]: { value: newValue, manual: selected.manual } })
        }

        if (radio)
            return (
                <FloatingLabelItem {...this.props} >
                    <List dataArray={renderControls} horizontal
                        renderRow={(option) =>
                            <ListItem key={option.value} style={{ borderBottomWidth: 0, marginLeft: 0, paddingLeft: 0 }}>
                                <CheckBox checked={value === option.value} color={ReportColors.primary} onPress={() => onItemChange(option.value)} disabled={disabled}/>
                                <Body>
                                    <Text>{option.label}</Text>
                                </Body>
                            </ListItem>}
                    />
                    {renderManual}
                </FloatingLabelItem>);

        return (
            <InlineLabelItem {...this.props} >
                <Picker
                    mode="dropdown"
                    Icon={<Icon name="arrow-down" />}
                    selectedValue={value}
                    onValueChange={onItemChange}
                    style={HighlightStyles.maintain}
                    enabled={!disabled}
                >
                    {renderControls.map(option => (<Picker.Item key={option.value} label={option.label} value={option.value} />))}
                </Picker>
                {renderManual}
            </InlineLabelItem>);
    }
};