import React from 'react';
import { Label, Body } from 'native-base';

import { styles } from '../../../utils/Style';

import Item from './Item';

export default FloatingLabelItem = (props) =>
{
    return (
        <Item {...props}>
            <Body style={{ minHeight: props.height && props.height + 25 }}>
                {props.label &&
                <Label style={styles.Label}>{props.label}</Label>
                }
                {props.children}
            </Body>
        </Item>
    );
};