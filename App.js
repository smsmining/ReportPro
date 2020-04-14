import React from 'react';
import { BackHandler } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import DialogInput from 'react-native-dialog-input';

import { styles } from './utils/Style';

import { Scenes, FormList, ControlForm, ExportPreview, ImportData } from './scenes';
import Access from './context/Access';

export default class App extends React.Component
{
    state =
        {unlocked: null
        ,unlockFailed: false
        };

    componentDidMount()
    {
        Access.IsUnlocked().then(unlocked => this.setState({ unlocked: unlocked }));
    }

    render()
    {
        const { unlocked, unlockFailed } = this.state;

        if (unlocked === null)
            return null;

        if (!unlocked)
        {
            const now = new Date();
            return (
                <DialogInput isDialogVisible
                    title="Access Key"
                    message={(unlockFailed ? "The entered token is invalid.\n" : "") + "Please input access key for " + (now.getMonth() + 1) + "/" + now.getFullYear()}
                    submitInput={(token) => Access.Unlock(token).then(unlocked => this.setState({ unlocked: unlocked, unlockFailed: !unlocked }))}
                    cancelText="Exit"
                    closeDialog={BackHandler.exitApp}
                />);
        }
            
            
        return (
            <Router>
                <Scene key="root" titleStyle={styles.titleStyle}>
                    <Scene
                        key={Scenes.FormList}
                        component={FormList}
                        title="Reports"
                        initial
                        hideNavBar
                    />
                    <Scene
                        key={Scenes.ImportData}
                        component={ImportData}
                        hideNavBar
                    />
                    <Scene
                        key={Scenes.ControlForm}
                        component={ControlForm}
                        hideNavBar
                    />
                    <Scene
                        key={Scenes.ExportPreview}
                        component={ExportPreview}
                        hideNavBar
                    />
                </Scene>
            </Router>
        );
    }
};
