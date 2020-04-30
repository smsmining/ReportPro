import React from 'react';

import ControlItem from './ControlItem';
import MissingRequired from './MissingRequired';
import AppFlags from '../AppFlags';

export default class ControlList extends React.Component
{
    shouldComponentUpdate(newProps) { return !!newProps.active || !!newProps.dirty; }

    state = { expand: null };
    onExpand = (param) => this.setState({ expand: param === this.state.expand ? null : param });

    componentDidMount()
    {
        this.validateDuplicates();
        this.startMount();
    }

    componentDidUpdate()
    {
        this.tickMount();
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


    mountIncrease = 1;
    mountCapacity = () => this.props.mountTick * this.mountIncrease;
    mounting = {};
    startMount = () =>
    {
        if (!this.props.controls)
            return;

        if (AppFlags.ControlForm.MaxRenderTicks)
            this.mountIncrease = Math.ceil(this.props.controls.length / AppFlags.ControlForm.MaxRenderTicks);

        this.sendMountingUpwards(-1);
    }

    tickMount = () =>
    {
        const { controls } = this.props;

        let newLength = this.mountCapacity();
        if (newLength === 0)
            return;

        if (newLength > controls.length)
            newLength = 0;

        this.sendMountingUpwards(newLength > 0 ? newLength : 0);
    }

    setMounting = (mounting, param) =>
    {
        if ((param in this.mounting) === !!mounting)
            return;

        if (mounting)
            this.mounting[param] = mounting;
        else
            delete this.mounting[param];

        this.sendMountingUpwards(this.mountCapacity());
    }

    sendMountingUpwards = (mount) =>
    {
        const { controls } = this.props;

        let progress =
            {mounting: mount > 0 ? mount : 0
            ,of: controls.length
            ,below: this.mounting
            };

        progress.tally = progress.mounting;
        progress.tallyOf = progress.of;
        for (const [, value] of Object.entries(progress.below))
        {
            progress.tally += value.tally;
            progress.tallyOf += value.tallyOf;
        }

        this.props.onMounting((mount !== -1 && !progress.tally) ? null : progress, this.props.param);
    }


    renderControl = (props) => (
        <ControlItem
            {...props}
            {...(this.props.instance && this.props.instance[props.param])}

            key={props.param}
            dirty={this.props.dirty}
            active={this.props.active}
            mountTick={this.props.mountTick}
            onMounting={this.setMounting}
            highlightRequired={this.props.highlightRequired}

            instance={this.props.instance}
            database={this.props.database}
            onChange={this.props.onChange}
            onSet={this.props.onSet}
            save={this.props.save}

            expand={this.state.expand}
            depth={(this.props.depth || 0) + 1}
            onExpand={this.onExpand}
        />);

    render()
    {
        const { controls, mountTick } = this.props;

        return controls
        ?   <MissingRequired {...this.props} >
                {(mountTick ? controls.slice(0, this.mountCapacity()) : controls).map(this.renderControl)}
            </MissingRequired>
        :   null;
    }
}