
import React from 'react';
import { Fab ,Button} from 'native-base';
import {Icon} from 'react-native-material-ui';
import { styles } from '../../utils/Style';
import { Actions } from 'react-native-router-flux';

const FormFab = (props) =>
{

    const {fab_active,onPress,guid} = props;

    return (
        <Fab
            active={fab_active}
            direction="up"
            containerStyle={styles.FabContainerBottom}
            position="bottomRight"
            style={styles.FabbackgroundColor}
            onPress={onPress}
            >
            <Icon name="share" />
            <Button style={styles.FabEmailbackgroundColor}  >
                <Icon name="email" />
            </Button>
            <Button style={styles.FabPDFbackgroundColor} onPress={() => Actions.PDF({ guid: guid })} >
                <Icon name="picture-as-pdf" />
            </Button>
        </Fab>
    );
};

export default FormFab;
