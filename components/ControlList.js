import React from 'react';

import ControlItem from './ControlItem';
import MissingRequired from './MissingRequired';

export default class ControlList extends React.Component
{
    shouldComponentUpdate(newProps) { return newProps.active || newProps.dirty; }

    state = { expand: null };
    onExpand = (param) => this.setState({ expand: param === this.state.expand ? null : param });

    renderControl = (props) => (
        <ControlItem
            {...props}
            {...(this.props.instance && this.props.instance[props.param])}

            key={props.param}
            dirty={this.props.dirty}
            highlightRequired={this.props.highlightRequired}

            instance={this.props.instance}
            onChange={this.props.onChange}

            expand={this.state.expand}
            depth={(this.props.depth || 0) + 1}
            onExpand={this.onExpand}
        />);

    render()
    {
        return this.props.controls
        ?   <MissingRequired {...this.props} >
                {this.props.controls.map(this.renderControl)}
            </MissingRequired>
        :   null;
    }
}