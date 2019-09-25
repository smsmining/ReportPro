import React from 'react';
import {Keyboard} from 'react-native';
import { Textarea } from 'native-base';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import Colors from '../../utils/ReportColors';

const Control_TextArea = (props) =>
{
    const { label, value, param, onChange,HeightRows,maxLength,keyboardType,placeholder  } = props;

    return (
        <FloatingLabelItem label={label}>
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
             />
        </FloatingLabelItem>
    );
};

export default Control_TextArea;
