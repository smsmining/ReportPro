import React from 'react';
import { Button, Text } from 'native-base';

import ControlList from '../ControlList';
import { jsonHelper } from '../../utils/jsonHelper';
import MissingRequired from '../MissingRequired';
import RulesEngine from '../RulesEngine';

export default class Control_looper extends React.Component
{
    state = { dirty: false }

    componentDidUpdate()
    {
        const { dirty } = this.state;

        if (dirty)
            this.setState({ dirty: false });
    }

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
    }

    onLoopSet = (values, index) =>
    {
        let newValue = (this.props.value && jsonHelper.Clone(this.props.value)) || this.getDefaultValue();

        if (!newValue[index])
            newValue[index] = {};

        for (let [param, value] of Object.entries(values))
            newValue[index][param] = { ...newValue[index][param], ...value };

        this.props.onChange(newValue, this.props.param);
        this.setState({ dirty: true });
    }

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


    mounting = {};
    setMounting = (mounting, param) =>
    {
        if ((param in this.mounting) === !!mounting)
            return;

        if (mounting)
            this.mounting[param] = mounting;
        else
            delete this.mounting[param];

        let progress =
            {mounting: 0
            ,of: 0
            ,below: this.mounting
            };

        progress.tally = progress.mounting;
        progress.tallyOf = progress.of;
        for (const [, value] of Object.entries(progress.below))
        {
            progress.tally += value.tally;
            progress.tallyOf += value.tallyOf;
        }

        this.props.onMounting(!progress.tally ? null : progress, this.props.param);
    }


    render ()
    {
        const { value, label, minLength, required, highlightRequired, maxLength, setLength, controls, disabled } = this.props;

        let children = [];
        const length = (value && value.length) || setLength || minLength || 0;
        for (let i = 0; i < length; i++)
        {
            let loop = (value && value[i]) || {};

            let renderControls = jsonHelper.Clone(controls);
            if (controls)
                renderControls = renderControls.map((control) => this.loopControlMap(control, loop, i));

            children.push(
                <RulesEngine {...this.props} onChange={(loopValue, loopParam) => this.onLoopChange(loopValue, loopParam, i)} onSet={(loopValue) => this.onLoopSet(loopValue, i)}>
                    <ControlList
                        {...this.props}
                        key={i}
                        param={i}
                        dirty={this.props.dirty || this.mounting.length}
                        onMounting={this.setMounting}
                        controls={renderControls}

                        instance={loop}
                        onChange={(loopValue, loopParam) => this.onLoopChange(loopValue, loopParam, i)}
                        save={async (value, file, format) => await this.props.save(value, this.props.param + '.' + i + '.' + file, format)}
                        active
                    />
                </RulesEngine>)
        }

        let success = !required || !highlightRequired;
        return (
            <React.Fragment>
            <MissingRequired {...this.props}>
                {children}
            </MissingRequired>
            {!setLength &&
            <Button danger={!disabled && !success} success={!disabled && success} dark={disabled} onPress={this.onLoopAdd} disabled={disabled || (value && maxLength && value.length === maxLength)}>
                <Text>{label || "+ Add Row"}</Text>
            </Button>
            }
            </React.Fragment>
        );
    }
   
};