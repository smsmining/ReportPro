import React from 'react';

import ControlItem from './ControlItem';
import MissingRequired from './MissingRequired';

export default class ControlList extends React.Component
{
    shouldComponentUpdate(newProps) { return !!newProps.active || !!newProps.dirty; }

    state = { expand: null, mount: 0 };
    onExpand = (param) => this.setState({ expand: param === this.state.expand ? null : param });

    componentDidMount()
    {
        this.validateDuplicates();

        if (!this.props.controls)
            return;

        this.mountTick = Math.max(Math.ceil(this.props.controls.length / 50), 5);
        this.setState({ mount: this.mountTick });

        if (this.mountTick > this.props.controls.length)
            this.props.onMounting(this.props.controls.length, this.props.param);
    }

    validateDuplicates = () => 
    {
        const { controls } = this.props;

        const params = controls.map(c => c.param).sort();

        var current = null;
        for (var i = 0; i < params.length; i++)
        {
            if (params[i] === current)
                console.log("DUPLICATE PARAM", params[i]);
            else
                current = params[i];
        }
    }

    componentDidUpdate()
    {
        const { controls } = this.props;
        const { mount } = this.state;

        if (!mount)
            return;

        if (controls && mount < controls.length)
            return setTimeout(() => this.setState({ mount: mount + this.mountTick }), 1);

        this.setState({ mount: 0 });
        this.props.onMounting(this.mounting.length, this.props.param);
    }

    mountTick = 0;
    mounting = [];
    setMounting = (mounting, param) =>
    {
        const { controls } = this.props;
        const { mount } = this.state;

        const index = this.mounting.indexOf(param);

        if (!!mounting === (index !== -1))
            return;

        if (mounting)
            return this.mounting.push(param);

        this.mounting.splice(index, 1);
        this.props.onMounting((mount && controls.length - mount) + this.mounting.length, this.props.param)
    }


    renderControl = (props) => (
        <ControlItem
            {...props}
            {...(this.props.instance && this.props.instance[props.param])}

            key={props.param}
            dirty={this.props.dirty}
            active={this.props.active}
            onMounting={this.setMounting}
            highlightRequired={this.props.highlightRequired}

            instance={this.props.instance}
            database={this.props.database}
            onChange={this.props.onChange}

            expand={this.state.expand}
            depth={(this.props.depth || 0) + 1}
            onExpand={this.onExpand}
        />);

    render()
    {
        const { controls } = this.props;
        const { mount } = this.state;

        return controls
        ?   <MissingRequired {...this.props} >
                {(mount ? controls.slice(0, mount) : controls).map(this.renderControl)}
            </MissingRequired>
        :   null;
    }
}