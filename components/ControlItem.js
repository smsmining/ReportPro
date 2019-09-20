import React from 'react';
import { Text } from 'native-base';

import { styles } from '../utils/Style';

import Control_Date from './Controls/Control_Date';
import DividerLabelItem from './Controls/Layout/DividerLabelItem';
import Control_ImagePicker from './Controls/Control_ImagePicker';
import Control_ImageStatic from './Controls/Control_ImageStatic';
import Control_Looper from './Controls/Control_Looper';
import Control_Spinner from './Controls/Control_Spinner';
import Control_TextArea from './Controls/Control_TextArea';
import Control_TextField from './Controls/Control_TextField';
import Control_TextLabel from './Controls/Control_TextLabel';


export const ControlKeys = 
    {Date:          'date'
    ,Divider:       'divider'
    ,ImageSelect:   'imageSelect'
    ,ImageStatic:   'imageStatic'
    ,Looper:        'looper'
    ,Spinner:       'spinner'
    ,Tab:           'tab'
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
        case ControlKeys.Looper:       return (<Control_Looper {...props} />);
    }

    return (<Text style={styles.center}>WARNING: Unknown control type</Text>);
};