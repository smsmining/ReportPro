import React from 'react';

import { Picker,Icon} from 'native-base';
import InlineLabelItem from './Layout/InlineLabelItem';
const Control_Spinner = (props) =>
{
    const { label, value, param, onChange, controls } = props;

    return (
        <InlineLabelItem label={label}>
            <Picker
                mode="dropdown"
                Icon={<Icon name="arrow-down" />}
                selectedValue={value}
                onValueChange={(newValue) => onChange(newValue, param)}
            >
                {controls
            ?    controls.map(c => (<Picker.Item key={c.value} label={c.label} value={c.value} />))
            :   (<Picker.Item label="No Options" value=""/>)
                }
            </Picker>
        </InlineLabelItem>
    );
};

export default Control_Spinner;
