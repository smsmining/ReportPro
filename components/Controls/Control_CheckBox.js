import React from 'react';
import { CheckBox, Body, Text, ListItem } from 'native-base';

import { Colors } from '../../utils/Style';
import { ShouldUpdate } from '../ControlItem';

export default class Control_CheckBox extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdate(this.props, newProps); }

    render()
    {
        const { label, value, param, onChange } = this.props;

        return (
            <ListItem>
                <CheckBox checked={value} color={Colors.primary} onPress={() => onChange(!value, param)} />
                <Body>
                    <Text>{label}</Text>
                </Body>
            </ListItem>
        );
    }
}