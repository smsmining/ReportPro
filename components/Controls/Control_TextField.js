import React from 'react';
import { Input } from 'native-base';

import { Colors } from '../../utils/Style';
import InlineLabelItem from './Layout/InlineLabelItem';
import { ShouldUpdateForString } from '../ControlItem';

export default class Control_TextField extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForString(this.props, newProps); }

    render()
    {
        return (
        <InlineLabelItem label={this.props.label} height={50}>
            <Input
                value={this.props.value}
                onChangeText={text => this.props.onChange(text, this.props.param)}
                maxLength={this.props.maxLength}
                placeholder={this.props.placeholder}
                placeholderTextColor={Colors.light}
                keyboardType={this.props.keyboardType}
            />
        </InlineLabelItem>
        );
    }
}