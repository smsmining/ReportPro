import React from 'react';

import ControlItem from './ControlItem';

export default class ControlList extends React.Component
{
    shouldComponentUpdate(newProps) { return newProps.active; }

    state = { expand: null };

    onExpand = (param) => this.setState({ expand: param === this.state.expand ? null : param });

    controlMap = (props) => (
        <ControlItem
            {...props}
            expand={this.state.expand}
            depth={(this.props.depth || 0) + 1}
            onExpand={this.onExpand}
        />);

    render()
    {
        const { controls } = this.props;
        if (!controls) return null;

        return (
            <React.Fragment>
            {controls.map(this.controlMap)}
            </React.Fragment>
        );
    }
}