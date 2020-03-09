import React from 'react';
import { DatePicker} from 'native-base';

import { Colors } from '../../utils/Style';
import InlineLabelItem from './Layout/InlineLabelItem';
import { ShouldUpdateForDate } from '../ControlItem';

export default class Control_Date extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForDate(this.props, newProps); }

    dateFormat = require('dateformat');

    state = { key: 0 }

    componentWillReceiveProps(nextProps)
    {
        if ((nextProps.value ? nextProps.value.getTime() : 0)
        !=  (this.props.value ? this.props.value.getTime() : 0)
            )
            this.setState({ key: this.state.key + 1 });
    }

    render()
    {
        const { label, param, value, format, minValue, maxValue, onChange } = this.props;
        const { key } = this.state;

        return (
            <InlineLabelItem label={label}>
                <DatePicker
                    key={param + key}
                    minimumDate={minValue}
                    maximumDate={maxValue}
                    defaultDate={value}
                    placeHolderText={value ? undefined : 'Select date'}
                    placeHolderTextStyle={value ? undefined : { color: Colors.light }}
                    onDateChange={date => onChange(date, param)}
                    locale={'en'}
                    modalTransparent={false}
                    animationType={'fade'}
                    textStyle={{ color: Colors.black }}
                    formatChosenDate={(date) => this.dateFormat(date, format || "d mmm yyyy")}
                />
            </InlineLabelItem>
        );
    }
}