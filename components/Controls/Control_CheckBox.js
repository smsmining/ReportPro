import React from 'react';
import { CheckBox, Body, Text } from 'native-base';

import { Colors } from '../../utils/Style';

import Item from './Layout/Item';
import { ShouldUpdate } from '../ControlItem';

export default class Control_CheckBox extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdate(this.props, newProps); }

    render()
    {
        const { label, value, param, disabled, onChange } = this.props;

        return (
            <Item {...this.props}>
                <CheckBox checked={value} color={Colors.primary} onPress={() => onChange(!value, param)} disabled={disabled} />
                <Body>
                    <Text>{label}</Text>
                </Body>
            </Item>
        );
    }
}