import React from 'react';
import { Icon, Button, Text } from 'native-base';
import Collapsible from 'react-native-collapsible';

import ControlList from '../ControlList';

export default ControlCollapse = (props) =>
{
    const expanded = props.param === props.expand;

    return (
        <React.Fragment>
            <Button onPress={() => props.onExpand(props.param)} dark={!expanded} danger={expanded} rounded={false} bordered iconLeft iconRight>
                {props.icon && <Icon name={props.icon} type={props.iconType} />}
                <Text>{props.label}</Text>
                <Icon name={expanded ? "expand-less" : "expand-more"} type="MaterialIcons" />
            </Button>
            <Collapsible collapsed={!expanded}>
                <ControlList {...props} active={expanded} depth={props.depth + 1} />
            </Collapsible>
        </React.Fragment>
    )
};