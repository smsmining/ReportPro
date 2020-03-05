import React from 'react';

import ControlItem from './ControlItem';

export default class ControlList extends React.Component
{
    shouldComponentUpdate(newProps) { return newProps.active; }

    state = { expand: null };

    onExpand = (param) => this.setState({ expand: param === this.state.expand ? null : param });

    renderControl = (props) =>
    {
        const { instance, depth, onChange } = this.props;
        const { expand } = this.state;

        return (
            <ControlItem
                {...props}
                key={props.param}
                value={instance && instance[props.param] || props.value}
                instance={instance}
                onChange={onChange}

                expand={expand}
                depth={(depth || 0) + 1}
                onExpand={this.onExpand}
            />);
    }
        

    render()
    {
        return this.props.controls
        ?   <React.Fragment>
                {this.props.controls.map(this.renderControl)}
            </React.Fragment>
        :   null;
    }
}