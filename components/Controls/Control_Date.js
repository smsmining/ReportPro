import React from 'react';

import { DatePicker} from 'native-base';
import Colors from '../../utils/ReportColors';
import  InlineLabelItem  from './Layout/InlineLabelItem';

const Control_Date = (props) =>
{
    const dateFormat = require('dateformat');

    const { label, param, format, minValue, maxValue, onChange } = props;

    return (
        <InlineLabelItem label={label}>
            <DatePicker
                    placeHolderText={'Select date'}
                    minimumDate={minValue}
                    maximumDate={maxValue}
                    onDateChange={date => onChange(date, param)}
                    locale={'en'}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'calendar'}
                    textStyle={{ color: Colors.black }}
                    placeHolderTextStyle={{ color: Colors.light }}
                    formatChosenDate={(date) => dateFormat(date, format || "d mmm yyyy")}
                />
        </InlineLabelItem>
    );
  
};

export default Control_Date;