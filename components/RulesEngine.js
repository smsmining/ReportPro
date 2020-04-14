import React from 'react';

import { Engine } from 'json-rules-engine';
import { jsonHelper } from '../utils/jsonHelper';
import { ControlKeys } from './ControlItem';
import { MessageAlert } from './Alerts';

export const Check =
	{Eq: 'equal'
	,NotEq: 'notEqual'

	,LT: 'lessThan'
	,LE: 'lessThanInclusive'

	,GT: 'greaterThan'
	,GE: 'greaterThanInclusive'

    //  TO BE INVESTIGATED
	,Array:
		{Some: 'contains'       // fact(an array) must include value
        ,None: 'doesNotContain' // fact(an array) must not include value

        ,Either: 'in'           // fact must be included in value(an array)
        ,Neither: 'notIn'       // fact must not be included in value(an array)
        }
	}

export const Alerts =
    {Message: 'Message'
    }

export default class RulesEngine extends React.Component
{
    engine = new Engine();
    nested = [];

    componentDidMount()
    {
        this.nested = this.getNestedControls(this.props);
        this.engine = this.loadEngine();
    }

    getNestedControls = (parent) =>
    {
        if (!parent || !parent.controls)
            return;

        let result = [];
        for (let i = 0; i < parent.controls.length; i++)
        {
            if (parent.controls[i].type === ControlKeys.Collapse || parent.controls[i].type === ControlKeys.Model)
                result = result.concat(this.getNestedControls(parent.controls[i]));
        }
        return result.concat(parent.controls);
    }

    loadEngine = () =>
    {
        const { rules } = this.props;

        if (!rules)
            return this.engine = null;

        const parse = jsonHelper.Clone(rules);
        for (let i = 0; i < parse.length; i++)
        {
            let rule = parse[i];

            if (!rule.conditions || (!rule.success && !rule.failure))
                continue;

            rule.conditions = this.validateRuleCondition(rule.conditions);
            rule.event =
                {type: 'instance'
                ,params: { success: rule.success, failure: rule.failure }
                }

            parse[i] = rule;
        }

        return new Engine(parse, { allowUndefinedFacts: true })
            .on('success', this.handleSuccess)
            .on('failure', this.handleFailure);
    }

    validateRuleCondition = (condition) =>
    {
        if (!condition.any && !condition.all)
        {
            condition.fact = condition.param;
            return condition;
        }

        if (condition.any)
            for (let i = 0; i < condition.any.length; i++)
                condition.any[i] = this.validateRuleCondition(condition.any[i]);

        if (condition.all)
            for (let i = 0; i < condition.all.length; i++)
                condition.all[i] = this.validateRuleCondition(condition.all[i]);

        return condition;
    }


    getFacts = () =>
    {
        const { instance } = this.props;

        let facts = this.nested;
        if (instance)
            for (let [key, value] of Object.entries(instance))
                facts[key] = { ...facts[key], ...value } ;

        return facts;
    }

    toValueFacts = (facts) =>
    {
        let result = {};
        for (let [key, value] of Object.entries(facts))
            if (value.value !== undefined && value.value != null)
                result[key] = value.value;

        return result;
    }


    ruleTick = null;

    onChange = (value, param) =>
    {
        const { onChange, onSet, database } = this.props;

        let facts = this.getFacts();
        let fact = facts.find(f => f.param === param) || {};

        let row = null;
        if (fact.db && database)
        {
            const dbColumn = fact.db.column || param;
            row = database[fact.db.table].find(r => r[dbColumn] && r[dbColumn] === value);
        }

        if (row)
        {
            let dirty = {};
            for (let [dbParam, dbValue] of Object.entries(row))
                if (dbValue !== undefined && dbValue != null)
                {
                    facts[dbParam] = { ...facts[dbParam], value: dbValue };
                    dirty[dbParam] = { value: dbValue };
                } 

            if (!this.engine || fact.value === value)
                return onSet(dirty);

            this.ruleTick = { dirty: dirty, pending: [] };
        }
        else
        {
            if (!this.engine || fact.value === value)
                return onChange(value, param);

            facts[param] = { ...fact, value: value };
            this.ruleTick = { dirty: { [param]: { value: value } }, pending: [] };
        }

        this.engine.run(this.toValueFacts(facts)).then(() =>
        {
            if (this.ruleTick.pending.length)
                return this.handleEvents();

            if (Object.keys(this.ruleTick.dirty) === 1)
                onChange(value, param);
            else
                return onSet(this.ruleTick.dirty);

            this.ruleTick = null;
        });
    }

    handleSuccess = (event) =>
    {
        if (!event.params.success) return;
        this.ruleTick.pending = this.ruleTick.pending.concat(event.params.success);
    }

    handleFailure = (event) =>
    {
        if (!event.params.failure) return;
        this.ruleTick.pending = this.ruleTick.pending.concat(event.params.failure);
    }

    handleEvents = () =>
    {
        const { onSet } = this.props;

        let facts = this.getFacts();
        for (let [key, value] of Object.entries(this.ruleTick.dirty))
            facts[key] = { ...facts[key], ...value };

        let dirty = false;
        for (let i = 0; i < this.ruleTick.pending.length; i++)
        {
            const event = this.ruleTick.pending[i];

            const param = event.param;
            if (param)
            {
                const fact = facts[param] || {};
                for (let [key, value] of Object.entries(event))
                {
                    if (key === 'param' || fact[key] === value)
                        continue;

                    facts[param] = { ...fact, ...event };
                    delete facts[param].param;

                    this.ruleTick.dirty[param] = { ...this.ruleTick.dirty[param], ...event };
                    delete this.ruleTick.dirty[param].param;

                    dirty |= 'value' in event && fact.value !== event.value;
                    break;
                }

                break;
            }

            const alert = event.alert;
            if (alert)
            {
                if (alert === Alerts.Message)
                    MessageAlert(event.title, event.message);

                break;
            }
        }

        if (dirty)
        {
            this.ruleTick.pending = [];
            return this.engine.run(this.toValueFacts(facts)).then(this.handleEvents);
        }

        onSet(this.ruleTick.dirty);
        this.ruleTick = null;
    }


    renderChild = (child) => React.cloneElement(child, { onChange: this.onChange, onSet: this.props.onSet });
    render()
    {
        return this.props.children
        ?   <React.Fragment>
                {React.Children.map(this.props.children, this.renderChild)}
            </React.Fragment>
        :   null;
    }
}