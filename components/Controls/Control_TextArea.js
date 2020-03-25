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
        const { value, param, onChange, HeightRows, maxLength, keyboardType, placeholder } = this.props;

        return (
            <FloatingLabelItem {...this.props} >
                <Textarea
                    value={value}
                    rowSpan={HeightRows ? HeightRows : 5}
                    bordered
                    placeholder={placeholder}
                    placeholderTextColor={Colors.light}
                    onChangeText={text => onChange(text, param)}
                    blurOnSubmit={true}
                    multiline={true}
                    keyboardType = {keyboardType}
                    maxLength={maxLength ? maxLength : 200}
                    onSubmitEditing={Keyboard.dismiss}
                    style={HighlightStyles.maintain}
                 />
            </FloatingLabelItem>
        );
    }
}