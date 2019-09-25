import React from 'react';
import { Content } from 'native-base';
import { Button, Text } from 'native-base';

import ControlItem from '../ControlItem';

export default class Control_looper extends React.Component
{
    getDefaultValue = (length) =>
    {
        const { minLength } = this.props;

        let newValue = [];
        while (newValue.length < (length || minLength))
            newValue.push(null);

        return newValue;
    }

    onLoopAdd = () =>
    {
        const { onChange, param } = this.props;
        let { value } = this.props;

        if (!value)
            value = this.getDefaultValue();;

        value.push(null);
        onChange(value, param);
    }

    onLoopChange = (value, param, index) =>
    {
        let newValue = this.props.value || this.getDefaultValue();

        if (!newValue[index])
            newValue[index] = {};

        newValue[index][param] = value;

        this.props.onChange(newValue, this.props.param);
    };

    renderLoop = (value, index) =>
    {
        const { controls } = this.props;

        return controls.map(control =>
            <ControlItem
                key={control.id}
                {...control}
                label={control.label && control.label.replace('{}', index + 1)}
                value={(value && value[control.param]) || (control.value && control.value.replace('{}', index + 1))}
                onChange={(loopValue, loopParam) => this.onLoopChange(loopValue, loopParam, index)}
            />);
    }

    render ()
    {
        const { value, label, minLength, maxLength } = this.props;

        let children = [];
        for (let i = 0; i < (value ? value.length : minLength) || 0; i++)
            { children.push(this.renderLoop((value && value[i]) || {}, i)); }

        return (
            <Content>
                {children}
                <Button success onPress={this.onLoopAdd} disabled={value && maxLength && value.length === maxLength}><Text>{label || "+ Add Row"}</Text></Button>
            </Content>
        );
    }
   
};


