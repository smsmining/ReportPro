import React from 'react';
import { Input, Picker, Icon, View, CheckBox, Body, Text, List, ListItem } from 'native-base';

import { jsonHelper } from '../../utils/jsonHelper';

import FloatingLabelItem from './Layout/FloatingLabelItem';
import InlineLabelItem from './Layout/InlineLabelItem';

import ReportColors from '../../utils/ReportColors';

export default Control_Spinner = (props) =>
{
    const { label, value, param, onChange, controls, radio } = props;

    const onItemChange = (newValue) =>
    {
        const selected = controls && controls.find(c => c.value === newValue);
        onChange(
             selected.manual ? { manual: true, value: newValue } : newValue
            ,param
            );
    }

    const onManualChange = (newValue) => onChange({ manual: true, value: newValue }, param );


    if (!controls)
        return (
            <View>
                <InlineLabelItem label={label}>
                    <Text>No Options</Text>
                </InlineLabelItem>
            </View>);


    let renderControls = jsonHelper.Clone(controls);
    let renderValue = value;
    let renderManual = false;
    if (typeof value === 'object' && value.manual)
    {
        const selected = renderControls.find(c => c.manual);
        selected.value = value.value;
        renderValue = value.value;
        renderManual = true;
    }

    if (radio)
        return (
            <View>
                <FloatingLabelItem label={label}>
                    <List dataArray={renderControls} horizontal
                        renderRow={(option) =>
                            <ListItem style={{ borderBottomWidth: 0, marginLeft: 0, paddingLeft: 0 }}>
                                <CheckBox checked={renderValue === option.value} color={ReportColors.primary} onPress={() => onItemChange(option.value)} />
                                <Body>
                                    <Text>{option.label}</Text>
                                </Body>
                            </ListItem>}
                    />
                    {renderManual &&
                    <Input
                        placeholder="Type Here"
                        value={renderValue}
                        onChangeText={onManualChange}
                    />
                    }
                </FloatingLabelItem>
            </View>);

    return (
        <View>
            <InlineLabelItem label={label}>
                <Picker
                    mode="dropdown"
                    Icon={<Icon name="arrow-down" />}
                    selectedValue={renderValue}
                    onValueChange={onItemChange}
                >
                    {renderControls.map(option => (<Picker.Item key={option.value} label={option.label} value={option.value} />))}
                </Picker>
                {renderManual &&
                <Input
                    placeholder="Type Here"
                    value={renderValue}
                    onChangeText={onManualChange}
                />
                }
            </InlineLabelItem>
        </View>);
};