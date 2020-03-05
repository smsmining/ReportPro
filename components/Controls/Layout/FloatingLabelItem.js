import React from 'react';
import { Label, Body, ListItem } from 'native-base';

import { styles } from '../../../utils/Style';

export default FloatingLabelItem = (props) =>
{
    return (
        <ListItem style={styles.borderBottom}>
            <Body style={{ minHeight: props.height && props.height + 25 }}>
                {props.label &&
                <Label style={styles.Label}>{props.label}</Label>
                }
                {props.children}
            </Body>
        </ListItem>
    );
};