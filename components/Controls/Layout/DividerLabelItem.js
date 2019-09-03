import React from 'react';
import { ListItem, Text } from 'native-base';
import { styles } from '../../../utils/Style';

const DividerLabelItem = (props) =>
{
    const { label } = props;
    return (
        <ListItem itemDivider>
            <Text style={styles.Label}>{label}</Text>
        </ListItem>
    );
};

export default DividerLabelItem;
