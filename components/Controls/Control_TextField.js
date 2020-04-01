import React from 'react';
import { Input } from 'native-base';

import { Colors, HighlightStyles } from '../../utils/Style';
import InlineLabelItem from './Layout/InlineLabelItem';
import { ShouldUpdateForString } from '../ControlItem';

export default class Control_TextField extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForString(this.props, newProps); }

    render()
    {
        return (
            <InlineLabelItem {...this.props} height={52}>
                <Input
                    value={this.props.value}
                    onChangeText={text => this.props.onChange((text && text.length) ? text : null, this.props.param)}
                    maxLength={this.props.maxLength}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={Colors.light}
                    keyboardType={this.props.keyboardType}
                    style={{ ...HighlightStyles.maintain, padding: 0, margin: 0 }}
                    disabled={this.props.disabled}
                />
            </InlineLabelItem>
        );
    }
}