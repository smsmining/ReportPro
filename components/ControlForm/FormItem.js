import React from 'react';
import { Actions } from 'react-native-router-flux';
import { ListItem, Text, Left, Right, Icon } from 'native-base';
import { styles } from '../../utils/Style';

const FormItem = (props) => {

    const {item, loading} = props;
    return (
        <ListItem style={styles.borderBottom} onPress={() => Actions.Main({ guid: item.guid })} disabled={loading}>
            <Left>
                <Text>{item.name} V:{item.version}</Text>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
            </Right>
        </ListItem>
    );
};

export default FormItem;

