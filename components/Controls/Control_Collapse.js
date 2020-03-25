import React from 'react';
import { Icon, Button, Text, View } from 'native-base';
import { Badge } from 'react-native-elements'
import Collapsible from 'react-native-collapsible';

import ControlList from '../ControlList';

export default class ControlCollapse extends React.Component
{
    state = { missingRequired: null }

    onMissingRequired = (missing, param) =>
    {
        this.setState({ missingRequired: missing });
        this.props.onMissingRequired(missing, param);
    }

    render()
    {
        const { param, label, highlightRequired, expand, icon, iconType, onExpand } = this.props;
        const { missingRequired } = this.state;

        const expanded = param === expand;
        const showRequired = highlightRequired && missingRequired;

        return (
            <React.Fragment>
            <Button onPress={() => onExpand(param)} dark={!expanded} danger={expanded} rounded={false} full bordered iconLeft iconRight>
                {icon && <Icon name={icon} type={iconType} />}
                <Text>{label}</Text>
                <View>
                    {showRequired ? <Badge status="error" containerStyle={{ position: 'absolute', top: -4, right: -4 }} /> : null}
                    <Icon name={expanded ? "expand-less" : "expand-more"} type="MaterialIcons" />
                </View>
            </Button>
            <Collapsible collapsed={!expanded} duration={150}>
                <ControlList {...this.props} active={expanded} onMissingRequired={this.onMissingRequired}/>
            </Collapsible>
            </React.Fragment>
        )
    }
};