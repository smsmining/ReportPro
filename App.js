import React from 'react';
import { BackHandler } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import DialogInput from 'react-native-dialog-input';

import { styles } from './utils/Style';

import { keys, FormList, ControlForm, ExportPreview } from './scenes';
import Access from './context/Access';

export default class App extends React.Component
{
    state =
        {unlocked: null

        ,unlockLoading: false
        ,unlockFailed: false
        };

    componentDidMount()
    {
        Access.IsUnlocked(unlocked => this.setState({ unlocked: unlocked }));
    }

    render()
    {
        const { unlocked, unlockLoading, unlockFailed } = this.state;

        if (unlocked === null)
            return null;

        if (!unlocked)
        {
            if (unlockLoading) return null;

            const now = new Date();
            return (
                <DialogInput isDialogVisible
                    title="Access Key"
                    message={(unlockFailed ? "The entered token is invalid.\n" : "") + "Please input access key for " + (now.getMonth() + 1) + "/" + now.getFullYear()}
                    submitInput={(token) =>
                        {
                            this.setState({ unlockLoading: true });
                            Access.Unlock(token, unlocked => this.setState({ unlocked: unlocked, unlockFailed: !unlocked, unlockLoading: false }));
                        }}
                    cancelText="Exit"
                    closeDialog={BackHandler.exitApp}
                />);
        }
            
            
        return (
            <Router>
                <Scene key="root" titleStyle={styles.titleStyle}>
                    <Scene
                        key={keys.Reports}
                        component={FormList}
                        title="Reports"
                        initial={true}
                        hideNavBar={true}
                    />
                    <Scene
                        key={keys.Main}
                        component={ControlForm}
                        hideNavBar={true}
                    />
                    <Scene
                        key={keys.Export}
                        component={ExportPreview}
                        hideNavBar={true}
                    />
                </Scene>
            </Router>
        );
    }
};
