import React from 'react';
import { Button, Icon, Text } from 'native-base';

export default NavButton = (props) =>
{
    const { label, icon, onPress } = props;

    return (
        <Button hasText={label} onPress={onPress} transparent>
            {icon && <Icon name={icon} />}
            {label && <Text>{label}</Text>}
        </Button>
    );
}