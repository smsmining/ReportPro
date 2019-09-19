import React from 'react';
import { Text } from 'native-base';

import { styles } from '../utils/Style';

import Control_TextField from './Controls/Control_TextField';
import Control_Date from './Controls/Control_Date';
import Control_TextArea from './Controls/Control_TextArea';
import Control_Spinner from './Controls/Control_Spinner';
import Control_ImagePicker from './Controls/Control_ImagePicker';
import Control_TextLabel from './Controls/Control_TextLabel';
import DividerLabelItem from './Controls/Layout/DividerLabelItem';
import Control_ImageStatic from './Controls/Control_ImageStatic';
import Control_Looper from './Controls/Control_Looper';


const ControlItem = (props) =>
{
    const { type, label } = props;

    if (type === 'divider')
        return (<DividerLabelItem label={label}/>);

    switch (type)
    {
        case 'textField':   return (<Control_TextField {...props} />);
        case 'date':        return (<Control_Date {...props} />);
        case 'textArea':    return (<Control_TextArea {...props} />);
        case 'spinner':     return (<Control_Spinner {...props} />);
        case 'imageSelect': return (<Control_ImagePicker {...props} />);
        case 'textLabel':   return (<Control_TextLabel {...props} />);
        case 'imageStatic':   return (<Control_ImageStatic {...props} />);
        case 'looper':   return (<Control_Looper {...props} />);
    }

    return (<Text style={styles.center}>WARNING: Unknown control type</Text>);
};

export default ControlItem;
