import React from 'react';
import {Content } from 'native-base';
import ControlItem from '../ControlItem';
import {Button, Text } from 'native-base';

export default class Control_looper extends React.Component
{

    componentDidMount()
    {
        const { minLegnth , param, onChange } = this.props;
        let { value } = this.props;

        if(value)
            return;

        value = [];
        for(let i = 0; i < minLegnth; i++)
            value.push({});

        onChange(value, param);
    }
    onLoopChange = (loopValue, loopParam,index) =>
    {
        const { value ,param, onChange} = this.props;

        value[index][loopParam] = loopValue;
        onChange(value,param);
    };

    onLoopAdd= () =>
    {
        const { onChange,param } = this.props;
        let { value } = this.props;

        if(!value)
            value = [];

        value.push({});
        onChange(value,param);
    }

    render ()
    {
        const { value ,controls, label, maxLength} = this.props;

        return (
            <Content>
                { (value !== '') && value.map( loop => controls && controls.map(control => (
                    <ControlItem
                        key={control.id}
                        {...control}
                        value={loop[control.param] || control.value }
                        onChange={(loopValue,loopParam) => this.onLoopChange(loopValue,loopParam,value.indexOf(loop))}
                    />)))
                }
                <Button success onPress={this.onLoopAdd} disabled={value && value.length === maxLength}><Text>{label || "+ Add Row"}</Text></Button>
            </Content>
        );
    }
   
};


