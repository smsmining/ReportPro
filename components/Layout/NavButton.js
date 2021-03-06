import React from 'react';
import { Button, Icon, Text } from 'native-base';

import { MiscStyles } from '../../utils/Style';

export default NavButton = (props) =>
{
    const { label, icon, iconType, onPress, labelStyle } = props;

    return (
        <Button hasText={label} onPress={onPress} transparent>
            {icon && <Icon name={icon} type={iconType} style={MiscStyles.icon} />}
            {label && <Text style={labelStyle}>{label}</Text>}
        </Button>
    );
}