import React from 'react';
import {Content } from 'native-base';
import ControlItem from '../ControlItem';
import {Button, Text } from 'native-base';

export default class Control_looper extends React.Component
{
    componentDidMount()
    {
        const { minLength, param, onChange } = this.props;
        let { value } = this.props;

        if(value)
            return;

        value = [];
        for(let i = 0; i < minLength; i++)
            value.push(this.loopDefault());

        onChange(value, param);
    }

    onLoopAdd = () =>
    {
        const { onChange, param } = this.props;
        let { value } = this.props;

        if(!value)
            value = [];

        value.push(this.loopDefault());
        onChange(value, param);
    }

    loopDefault = () =>
    {
        const { value, controls } = this.props;

        let values = {};

        const length = (value || []).length + 1;

        for (child in controls)
        {
            const { param, value } = controls[child];

            if (!param || !value)
                continue;

            values[param] = value.replace("{}", length);
        }

        return values;
    }

    onLoopChange = (loopValue, loopParam, index) =>
    {
        const { value, param, onChange} = this.props;

        value[index][loopParam] = loopValue;
        onChange(value, param);
    };

    

    render ()
    {
        const { value ,controls, label, maxLength } = this.props;

        return (
            <Content>
                { value && value.map( loop => controls && controls.map(control => (
                    <ControlItem
                        key={control.id}
                        {...control}
                        label={control.label && control.label.replace('{}', value.indexOf(loop) + 1)}
                        value={loop[control.param] || control.value }
                        onChange={(loopValue, loopParam) => this.onLoopChange(loopValue, loopParam, value.indexOf(loop))}
                    />)))
                }
                <Button success onPress={this.onLoopAdd} disabled={value && value.length === maxLength}><Text>{label || "+ Add Row"}</Text></Button>
            </Content>
        );
    }
   
};


