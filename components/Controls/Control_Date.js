import React from 'react';
import { DatePicker } from 'native-base';

import Colors from '../../utils/ReportColors';
import InlineLabelItem from './Layout/InlineLabelItem';

export default class Control_Date extends React.Component
{
    dateFormat = require('dateformat');

    state =
        {key: 0
        ,observeValue: null
        }

    componentWillReceiveProps(nextProps)
    {
        if ((nextProps.value ? nextProps.value.getTime() : -1)
        !=  (this.state.observeValue ? this.state.observeValue.getTime() : -1)
            )
            this.setState({ key: this.state.key + 1, observeValue: nextProps.value });
    }

    onChange(value)
    {
        const { param, onChange } = this.props;

        this.setState({ observeValue: value });

        onChange(value, param);
    }

    render()
    {
        const { label, param, value, format, minValue, maxValue } = this.props;
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
                    onDateChange={this.onChange}
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