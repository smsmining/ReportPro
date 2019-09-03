import React from 'react';
import { Label, Body, ListItem, View } from 'native-base';

import { styles } from '../../../utils/Style';

const FloatingLabelItem = (props) =>
{
    return (
        <ListItem style={styles.borderBottom}>
            <Body>
                <Label style={styles.Label}>{props.label}</Label>
                <View style={styles.container}>
                    {props.children}
                </View>
            </Body>
        </ListItem>
    );
};

export default FloatingLabelItem;
