import React from 'react';
import { Button, Text } from 'native-base';

import ControlList from '../ControlList';
import { jsonHelper } from '../../utils/jsonHelper';
import MissingRequired from '../MissingRequired';

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
            value = this.getDefaultValue();

        value.push(null);
        onChange(value, param);
    }

    onLoopChange = (value, param, index) =>
    {
        let newValue = (this.props.value && jsonHelper.Clone(this.props.value)) || this.getDefaultValue();

        if (!newValue[index])
            newValue[index] = {};

        newValue[index][param] = { ...newValue[index][param], value: value };

        this.props.onChange(newValue, this.props.param);
    };

    loopControlMap = (props, values, index) =>
    {
        const control = values && values[props.param];

        let label = (control && control.label) || props.label;
        if (label)
            label = label.replace('{}', index + 1);

        let value = (control && control.value) || props.value;
        if (value && typeof value === 'string')
            value = value.replace('{}', index + 1);

        return { ...props, label: label, value: value };
    }

    render ()
    {
        const { value, label, minLength, required, highlightRequired, maxLength, setLength, controls } = this.props;

        let children = [];
        const length = (value && value.length) || setLength || minLength || 0;
        for (let i = 0; i < length; i++)
        {
            const loop = (value && value[i]) || {};

            let renderControls = jsonHelper.Clone(controls);
            if (controls)
                renderControls = renderControls.map((control) => this.loopControlMap(control, loop, i));

            children.push(
                    <ControlList
                        {...this.props}
                        key={i}
                        param={i}
                        controls={renderControls}

                        instance={loop}
                        onChange={(loopValue, loopParam) => this.onLoopChange(loopValue, loopParam, i)}
                        active
                    />)
        }

        let success = !required || !highlightRequired;
        return (
            <React.Fragment>
            <MissingRequired {...this.props}>
                {children}
            </MissingRequired>
            {!setLength &&
            <Button danger={!success} success={success} onPress={this.onLoopAdd} disabled={value && maxLength && value.length === maxLength}>
                <Text>{label || "+ Add Row"}</Text>
            </Button>
            }
            </React.Fragment>
        );
    }
   
};