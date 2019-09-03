import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import { styles } from './utils/Style';

import FormList from './scenes/FormList';
import ControlForm from './scenes/ControlForm';
export default () => {
    return (
        <Router>
            <Scene key="root" titleStyle={styles.titleStyle}>
                <Scene
                    key="Reports"
                    component={FormList}
                    title="Reports"
                    initial={true}
                    hideNavBar={true}
                />
                <Scene
                    key="Main"
                    component={ControlForm}
                    hideNavBar={true}
                />
            </Scene>
        </Router>
    );
};
