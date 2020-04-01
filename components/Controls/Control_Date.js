import React from 'react';
import { DatePicker, View} from 'native-base';

import { Colors, HighlightStyles } from '../../utils/Style';
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
        const { param, value, format, minValue, maxValue, onChange, disabled } = this.props;
        const { key } = this.state;

        return (
            <InlineLabelItem {...this.props} >
                <View style={HighlightStyles.maintain}>
                    <DatePicker
                        key={param + key}
                        minimumDate={minValue}
                        maximumDate={maxValue}
                        defaultDate={value}
                        placeHolderText={value ? undefined : 'Select date'}
                        placeHolderTextStyle={value ? undefined : { color: Colors.secondary }}
                        onDateChange={date => onChange(date, param)}
                        locale={'en'}
                        modalTransparent={false}
                        animationType={'fade'}
                        textStyle={{ color: Colors.black }}
                        formatChosenDate={(date) => this.dateFormat(date, format || "d mmm yyyy")}
                        disabled={disabled}
                    />
                </View>
            </InlineLabelItem>
        );
    }
}