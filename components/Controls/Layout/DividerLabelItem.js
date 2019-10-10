import React from 'react';
import { ListItem, Text } from 'native-base';

import { styles } from '../../../utils/Style';
import ReportColors from '../../../utils/ReportColors';

const DividerLabelItem = (props) =>
{
    const { label } = props;
    return (
        <ListItem style={{ backgroundColor: ReportColors.secondary }} itemDivider>
            <Text style={styles.Label}>{label}</Text>
        </ListItem>
    );
};

export default DividerLabelItem;
