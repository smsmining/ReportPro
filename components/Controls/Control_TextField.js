import React from 'react';

import { Input } from 'native-base';
import InlineLabelItem from './Layout/InlineLabelItem';
import Colors from '../../utils/ReportColors';

const Control_TextField = (props) =>
{
    const { label, value, param, onChange, maxLength, keyboardType, placeholder } = props;

    return (
        <InlineLabelItem label={label}>
            <Input
                value={value}
                onChangeText={text => onChange(text, param)}
                maxLength={maxLength ? maxLength : 50}
                placeholder={placeholder}
                placeholderTextColor={Colors.light}
                keyboardType={keyboardType} />
        </InlineLabelItem>
    );
};

export default Control_TextField;
