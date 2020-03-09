import React from 'react';
import { Text } from 'native-base';

import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForString } from '../ControlItem';

export default class Control_TextLabel extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForString(this.props, newProps); }

    render()
    {
        const { label, value } = this.props;

        return (
            <FloatingLabelItem label={label}>
                <Text>{value}</Text>
            </FloatingLabelItem>
        );
    }
}