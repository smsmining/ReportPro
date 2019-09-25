import React from 'react';
import { Actions } from 'react-native-router-flux';
import { ListItem, Text, Left, Right, Icon } from 'native-base';

import { styles } from '../../utils/Style';

export default FormItem = (props) =>
{
    const { item } = props;

    return (
        <ListItem style={styles.borderBottom} onPress={() => Actions.Main({ guid: item.guid })}>
            <Left>
                <Text>{item.name} V:{item.version}</Text>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
            </Right>
        </ListItem>
    );
};