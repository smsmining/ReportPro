import React from 'react';
import { Keyboard } from 'react-native';
import { Textarea } from 'native-base';

import { Colors, HighlightStyles } from '../../utils/Style';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForString } from '../ControlItem';

export default class Control_TextArea extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForString(this.props, newProps); }

    render()
    {
        return (
            <FloatingLabelItem {...this.props} >
                <Textarea
                    value={this.props.value && this.props.value.toString()}
                    rowSpan={this.props.HeightRows ? this.props.HeightRows : 5}
                    bordered
                    placeholder={this.props.placeholder}
                    placeholderTextColor={Colors.light}
                    onChangeText={text => this.props.onChange((text && text.length) ? text : null, this.props.param)}
                    blurOnSubmit
                    multiline
                    keyboardType={this.props.keyboardType}
                    maxLength={this.props.maxLength}
                    onSubmitEditing={Keyboard.dismiss}
                    style={HighlightStyles.maintain}
                    disabled={this.props.disabled}
                 />
            </FloatingLabelItem>
        );
    }
}