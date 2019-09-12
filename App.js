import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import { styles } from './utils/Style';

import { keys, FormList, ControlForm, ExportPreview } from './scenes';

export default () => {
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
};
