import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListItem, Text, Left, Right, Icon } from 'native-base';

import { styles, AlignmentStyles } from '../../utils/Style';

export default FormItem = (props) =>
{
    const { item } = props;

    return (
        <ListItem style={styles.borderBottom} onPress={() => Actions.Main({ guid: item.guid })}>
            <Left style={AlignmentStyles.column}>
                <View>
                    <Text>{item.name}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 8 }}> V:{item.version}</Text>
                </View>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
            </Right>
        </ListItem>
    );
};