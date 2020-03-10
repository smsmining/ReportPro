import React from 'react';
import { Text } from 'native-base';

import { styles } from '../utils/Style';

import DividerLabelItem from './Controls/Layout/DividerLabelItem';

import Control_CheckBox from './Controls/Control_CheckBox';
import Control_Collapse from './Controls/Control_Collapse';
import Control_Date from './Controls/Control_Date';
import Control_ImagePicker from './Controls/Control_ImagePicker';
import Control_ImageStatic from './Controls/Control_ImageStatic';
import Control_Looper from './Controls/Control_Looper';
import Control_Spinner from './Controls/Control_Spinner';
import Control_TextArea from './Controls/Control_TextArea';
import Control_TextField from './Controls/Control_TextField';
import Control_TextLabel from './Controls/Control_TextLabel';
import Control_Signature from './Controls/Control_Signature';

export const ControlKeys = 
    {Tab:           'tab'
    ,Divider:       'divider'

    ,CheckBox:      'checkBox'
    ,Collapse:      'collapse'
    ,Date:          'date'
    ,ImageSelect:   'imageSelect'
    ,ImageStatic:   'imageStatic'
    ,Looper:        'looper'
    ,Signature:     'signature'
    ,Spinner:       'spinner'
    ,TextArea:      'textArea'
    ,TextField:     'textField'
    ,TextLabel:     'textLabel'
    };


export default ControlItem = (props) =>
{
    const { type, label } = props;

    if (type === ControlKeys.Divider)
        return (<DividerLabelItem label={label}/>);

    switch (type)
    {
        case ControlKeys.TextField:    return (<Control_TextField {...props} />);
        case ControlKeys.Date:         return (<Control_Date {...props} />);
        case ControlKeys.TextArea:     return (<Control_TextArea {...props} />);
        case ControlKeys.Spinner:      return (<Control_Spinner {...props} />);
        case ControlKeys.ImageSelect:  return (<Control_ImagePicker {...props} />);
        case ControlKeys.TextLabel:    return (<Control_TextLabel {...props} />);
        case ControlKeys.ImageStatic:  return (<Control_ImageStatic {...props} />);
        case ControlKeys.Signature:    return (<Control_Signature {...props} />);
        case ControlKeys.Looper:       return (<Control_Looper {...props} />);
        case ControlKeys.CheckBox:     return (<Control_CheckBox {...props} />);
        case ControlKeys.Collapse:     return (<Control_Collapse {...props} />);
    }

    return (<Text style={styles.center}>WARNING: Unknown control type</Text>);
};

export const ShouldUpdate = (props, newProps) => (
    newProps.label ^ props.label
||  newProps.label !== props.label

||  newProps.value ^ props.value
)

export const ShouldUpdateForDate = (props, newProps) => (
    ShouldUpdate(props, newProps)
||  (props.value && newProps.value
&&  props.value.getTime() !== newProps.value.getTime()
    )
)

export const ShouldUpdateForImage = (props, newProps) => (
    ShouldUpdate(props, newProps)
||  (newProps.value || {}).uri !== (props.value || {}).uri
)

export const ShouldUpdateForString = (props, newProps) => (
        ShouldUpdate(props, newProps)
    ||  newProps.value !== props.value
)

