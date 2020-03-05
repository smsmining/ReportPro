import React from 'react';
import { ListItem, Text } from 'native-base';

import { styles, Colors } from '../../../utils/Style';

export default DividerLabelItem = (props) => (
    <ListItem style={{ backgroundColor: Colors.secondary }} itemDivider>
        <Text style={{ ...styles.Label, width: "100%" }}>{props.label}</Text>
    </ListItem>
);