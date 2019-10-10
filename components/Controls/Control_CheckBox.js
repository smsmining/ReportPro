import React from 'react';
import { CheckBox, Body, Text, ListItem } from 'native-base';

import ReportColors from '../../utils/ReportColors';

export default Control_CheckBox = (props) =>
{
    const { label, value, param, onChange } = props;

    return (
        <ListItem>
            <CheckBox checked={value} color={ReportColors.primary} onPress={() => onChange(!value, param)} />
            <Body>
                <Text>{label}</Text>
            </Body>
        </ListItem>
    );
};



