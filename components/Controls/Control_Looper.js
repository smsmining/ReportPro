import React from 'react';
import { Content } from 'native-base';
import { Button, Text } from 'native-base';

import ControlItem from '../ControlItem';

export default class Control_looper extends React.Component
{
    getDefaultValue = () =>
    {
        const { minLength, setLength } = this.props;

        let newValue = [];

        const length = setLength || minLength || 0;
        while (newValue.length < length)
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
        const { value, label, minLength, maxLength, setLength } = this.props;

        let children = [];
        const length = (value && value.length) || setLength || minLength || 0;
        for (let i = 0; i < length; i++)
            { children.push(this.renderLoop((value && value[i]) || {}, i)); }

        return (
            <Content>
                {children}
                {!setLength &&
                <Button success onPress={this.onLoopAdd} disabled={value && maxLength && value.length === maxLength}><Text>{label || "+ Add Row"}</Text></Button>
                }
            </Content>
        );
    }
   
};


