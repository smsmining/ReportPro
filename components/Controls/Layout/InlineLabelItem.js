import React from 'react';
import { Label, Body, ListItem,View } from 'native-base';

import { styles } from '../../../utils/Style';

const InlineLabelItem = (props) =>
{
    return (
        <ListItem style={styles.borderBottom}>
            <Label style={styles.Label}>{props.label}</Label>
            <Body style={styles.FormBody}>
                <View style={styles.container}>
                    {props.children}
                </View>
            </Body>
        </ListItem>
    );
};

export default InlineLabelItem;
