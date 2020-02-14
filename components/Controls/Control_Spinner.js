import React from 'react';
import { Picker, Icon, View } from 'native-base';
import { Input } from 'native-base';

import { jsonHelper } from '../../utils/jsonHelper';

import InlineLabelItem from './Layout/InlineLabelItem';

export default Control_Spinner = (props) =>
{
    const { label, value, param, onChange, controls} = props;

    const onItemChange = (newValue) =>
    {
        const selected = controls && controls.find(c => c.value === newValue);
        onChange(
             selected.manual ? { manual: true, value: newValue } : newValue
            ,param
            );
    }

    const onManualChange = (newValue) => onChange({ manual: true, value: newValue }, param );


    let renderValue = value;
    let renderControls = jsonHelper.Clone(controls);
    let renderManual = false;
    if (typeof value === 'object' && value.manual)
    {
        const selected = renderControls && renderControls.find(c => c.manual);
        selected.value = value.value;
        renderValue = value.value;
        renderManual = true;
    }

    return (
        <View>
            <InlineLabelItem label={label}>
                {renderControls
            ?   <React.Fragment>
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
                </React.Fragment>
            :   <Text>No Options</Text>
                }
            </InlineLabelItem>
        </View>

    );
};