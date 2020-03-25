import React from 'react';
import { Text } from 'native-base';

import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForString } from '../ControlItem';

export default class Control_TextLabel extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForString(this.props, newProps); }

    render()
    {
        return (
            <FloatingLabelItem {...this.props} >
                <Text>{this.props.value}</Text>
            </FloatingLabelItem>
        );
    }
}