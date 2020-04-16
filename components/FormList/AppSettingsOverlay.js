import React from 'react';
import { Platform, Linking } from 'react-native';

import { Overlay, } from 'react-native-elements';
import { Icon, View, Button, Text } from 'native-base';

import { GeneralAlertDialog } from '../Alerts';
import { Scenes } from '../../scenes';
import { Actions } from 'react-native-router-flux';

export const AppSettingsOverlay = (props) =>
{
    update = () => GeneralAlertDialog
            ("Update App"
            ,"Warning: Updating the app may cause current in-progress forms to be lost."
        +  "\nPlease ensure any required documents are submitted before updating."
            ,() => Linking.openURL('http://smsmining.ga/')
            )
    
    return (
        <Overlay isVisible>
            <View>
                {Platform.OS === 'android' &&
                <Button onPress={this.update} danger bordered full iconLeft >
                    <Icon name='cloud-download' />
                    <Text>Update</Text>
                </Button>
                }
                <Button onPress={() => { props.onClose(); Actions[Scenes.ImportData](); }} danger bordered full iconLeft >
                    <Icon name='folder-download' type='MaterialCommunityIcons' />
                    <Text>Import Data</Text>
                </Button>
                <Button onPress={props.onClose} dark full >
                    <Text>Close</Text>
                </Button>
            </View>
        </Overlay>
    );
};