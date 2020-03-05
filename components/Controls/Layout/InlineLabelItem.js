import React from 'react';
import { Label, Body, ListItem } from 'native-base';

import { styles } from '../../../utils/Style';

export default InlineLabelItem = (props) => (
    <ListItem style={styles.borderBottom}>
        {props.label &&
        <Label style={styles.Label}>{props.label}</Label>
        }
        <Body style={{ ...styles.InlineBody, minHeight: props.height }}>
            {props.children}
        </Body>
    </ListItem>
);