
import React from 'react';
import { Fab ,Button} from 'native-base';
import {Icon} from 'react-native-material-ui';
import { styles } from '../../utils/Style';
import { Actions } from 'react-native-router-flux';

const FormFab = (props) =>
{

    const {fab_active,onActiveFab,onActiveEmail,guid,pdf_name} = props;

    return (
        <Fab
            active={fab_active}
            direction="up"
            containerStyle={styles.FabContainerBottom}
            position="bottomRight"
            style={styles.FabbackgroundColor}
            onPress={onActiveFab}
            >
            <Icon name="share" />
            <Button style={styles.FabEmailbackgroundColor} onPress={onActiveEmail} >
                <Icon name="email" />
            </Button>
            <Button style={styles.FabPDFbackgroundColor} onPress={() => Actions.PDF({guid,pdf_name})} >
                <Icon name="picture-as-pdf" />
            </Button>
        </Fab>
    );
};

export default FormFab;
