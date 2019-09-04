import React from 'react';
import { Image ,View} from 'react-native';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import { styles } from '../../utils/Style';

const Control_ImageStatic = (props) => {

    const { label, value } = props;

    return (
        <FloatingLabelItem label={label}>
           <View style={ styles.ImageContainer}>
                <Image  source={value}  style={styles.imageStatic} />
           </View>
        </FloatingLabelItem>
    );
};
export default Control_ImageStatic;
