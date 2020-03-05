import React from 'react';
import { Input } from 'native-base';

import { Colors } from '../../utils/Style';
import InlineLabelItem from './Layout/InlineLabelItem';

export default Control_TextField = (props) => (
    <InlineLabelItem label={props.label} height={50}>
        <Input
            value={props.value}
            onChangeText={text => props.onChange(text, props.param)}
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            placeholderTextColor={Colors.light}
            keyboardType={props.keyboardType}
        />
    </InlineLabelItem>
);