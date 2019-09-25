import React from 'react';
import { Picker, Icon } from 'native-base';

import InlineLabelItem from './Layout/InlineLabelItem';

export default Control_Spinner = (props) =>
{
    const { label, value, param, onChange, controls } = props;

    return (
        <InlineLabelItem label={label}>
            {controls
        ?   <Picker
                mode="dropdown"
                Icon={<Icon name="arrow-down" />}
                selectedValue={value}
                onValueChange={(newValue) => onChange(newValue, param)}
            >
                {controls.map(option => (<Picker.Item key={option.value} label={option.label} value={option.value} />))}
            </Picker>
        :   <Text>No Options</Text>
            }
        </InlineLabelItem>
    );
};