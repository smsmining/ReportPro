import React from 'react';

export default class MissingRequired extends React.Component
{
    missingRequired = { here: [], below: {}, tally: 0 };

    sendUpwards = () =>
    {
        this.missingRequired.tally = this.missingRequired.here.length;
        for (let [, value] of Object.entries(this.missingRequired.below))
            this.missingRequired.tally += value.tally;

        this.props.onMissingRequired
            (this.missingRequired.tally ? this.missingRequired : null
            ,this.props.param
            );
    }

    onMissingRequiredBelow = (missing, param) =>
    {
        if (missing)
            this.missingRequired.below[param] = missing;
        else
            delete this.missingRequired.below[param];

        this.sendUpwards();
    }

    renderChild = (child) =>
    {
        const { required, value, param } = child.props;

        const missing = required && (value === undefined || value === null);
        const missingIndex = this.missingRequired.here.indexOf(param);

        if (!missing ^ missingIndex === -1)
        {
            if (missing)
                this.missingRequired.here.push(param);
            else
                this.missingRequired.here = this.missingRequired.here.filter(c => c !== param);

            this.sendUpwards();
        }

        return React.cloneElement(child, { onMissingRequired: this.onMissingRequiredBelow });
    }

    render()
    {
        return this.props.children
        ?   <React.Fragment>
                {React.Children.map(this.props.children, this.renderChild)}
            </React.Fragment>
        :   null;
    }
}