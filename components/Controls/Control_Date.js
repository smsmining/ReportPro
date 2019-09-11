import React from 'react';

import { DatePicker} from 'native-base';
import Colors from '../../utils/ReportColors';
import  InlineLabelItem  from './Layout/InlineLabelItem';

const Control_Date = (props) =>
{
    const formatChosenDate = (date) => [date.getDate(), '/', date.getMonth() + 1, '/', date.getFullYear()];

    const { label, param, onChange } = props;

    return (
        <InlineLabelItem label={label}>
            <DatePicker
                    placeHolderText={'Select date'}
                    defaultDate={new Date()}
                    minimumDate={new Date(2010, 1, 1)}
                    maximumDate={new Date(2050, 12, 31)}
                    onDateChange={newDate => onChange(newDate.getDate().toString() + '/' + (newDate.getMonth() + 1).toString() + '/' + newDate.getFullYear().toString(), param)}
                    locale={'en'}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'calendar'}
                    textStyle={{ color: Colors.black }}
                    placeHolderTextStyle={{ color: Colors.light }}
                    formatChosenDate={formatChosenDate}
                />
        </InlineLabelItem>
    );
  
};

export default Control_Date;