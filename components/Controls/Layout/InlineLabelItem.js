import React from 'react';
import { Label, Body } from 'native-base';

import { styles } from '../../../utils/Style';

import Item from './Item';

export default InlineLabelItem = (props) => (
    <Item {...props}>
        {props.label &&
        <Label style={styles.Label}>{props.label}</Label>
        }
        <Body style={{ ...styles.InlineBody, minHeight: props.height }}>
            {props.children}
        </Body>
    </Item>
);