import React from 'react';

import ControlItem from './ControlItem';
import MissingRequired from './MissingRequired';

export default class ControlList extends React.Component
{
    shouldComponentUpdate(newProps) { return newProps.active || newProps.dirty; }

    state = { expand: null };
    onExpand = (param) => this.setState({ expand: param === this.state.expand ? null : param });

    renderControl = (props) =>
    {
        const { instance, depth, index, onChange, highlightRequired, dirty } = this.props;
        const { expand } = this.state;

        let control = instance && instance[props.param];

        let label = props.label;
        let value = control && control.value || props.value;

        if (index || index === 0)
        {
            if (label)
                label = label.replace('{}', index + 1);

            if (value && typeof value === 'string')
                value = value.replace('{}', index + 1);
        }

        const required = props.required;

        return (
            <ControlItem
                {...props}
                key={props.param}
                index={undefined}
                dirty={dirty}

                label={label}
                value={value}
                instance={instance}
                onChange={onChange}

                required={required}
                highlightRequired={highlightRequired}

                expand={expand}
                depth={(depth || 0) + 1}
                onExpand={this.onExpand}
            />);
    }
        

    render()
    {
        return this.props.controls
        ?   <MissingRequired {...this.props} >
                {this.props.controls.map(this.renderControl)}
            </MissingRequired>
        :   null;
    }
}