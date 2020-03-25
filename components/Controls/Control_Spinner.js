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

        const wasManual = typeof this.props.value === 'object' && this.props.value.manual;
        const isManual = typeof newProps.value === 'object' && newProps.value.manual;

        if(wasManual ^ isManual)
            return true;

        if(wasManual && isManual)
            return this.props.value.value !== newProps.value.value;

        return this.props.value !== newProps.value;
    }

    render()
    {
        const { value, param, onChange, controls, radio } = this.props;

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
                    <InlineLabelItem {...this.props} >
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
        else if (!radio)
        {
            const selected = renderControls.find(c => renderValue === c.value);
            if (!selected)
                renderControls.unshift({label: ""});
        }

        if (radio)
            return (
                <View>
                    <FloatingLabelItem {...this.props} >
                        <List dataArray={renderControls} horizontal
                            renderRow={(option) =>
                                <ListItem key={option.value} style={{ borderBottomWidth: 0, marginLeft: 0, paddingLeft: 0 }}>
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
                <InlineLabelItem {...this.props} >
                    <Picker
                        mode="dropdown"
                        Icon={<Icon name="arrow-down" />}
                        selectedValue={renderValue}
                        onValueChange={onItemChange}
                        style={HighlightStyles.maintain}
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
    }
};