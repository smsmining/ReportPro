import React from 'react';
import { Text } from 'native-base';
import FloatingLabelItem from './Layout/FloatingLabelItem';

const Control_TextLabel = (props) =>
{
    const { label, value } = props;

    return (
        <FloatingLabelItem label={label}>
            <Text>{value}</Text>
        </FloatingLabelItem>
    );
};

export default Control_TextLabel;
