import React from 'react';

import { DatePicker} from 'native-base';
import Colors from '../../utils/ReportColors';
import  InlineLabelItem  from './Layout/InlineLabelItem';

const Control_Date = (props) =>
{
    const formatChosenDate = (date) => [date.getDate(), '/', date.getMonth() + 1, '/', date.getFullYear()];

    const { label, param, onChange, minimumDate, maximumDate } = props;

    return (
        <InlineLabelItem label={label}>
            <DatePicker
                    placeHolderText={'Select date'}
                    defaultDate={new Date()}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    onDateChange={newDate => onChange(newDate, param)}
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