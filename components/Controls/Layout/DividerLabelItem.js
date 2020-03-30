import React from 'react';
import { Text } from 'native-base';

import { styles, Colors } from '../../../utils/Style';

import Item from './Item';

export default DividerLabelItem = (props) => (
    <Item {...props} style={{ backgroundColor: Colors.secondary }} itemDivider>
        <Text style={{ ...styles.Label, width: "100%" }}>{props.label}</Text>
    </Item>
);