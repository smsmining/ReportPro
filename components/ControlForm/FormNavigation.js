import React from 'react';
import { BottomNavigation } from 'react-native-material-ui';
const FormNavigation = (props) =>
{
    const { tabs, onPress } = props;

    return (
        <BottomNavigation style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}>
            {tabs.map(tab => (
                <BottomNavigation.Action
                    key={tab.id}
                    icon={tab.icon}
                    label={tab.label}
                    onPress={() => onPress(tab.id)}
                />
            ))}
        </BottomNavigation>
    );
};
export default FormNavigation;
