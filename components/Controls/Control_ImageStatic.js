import React from 'react';
import { Image, View } from 'react-native';

import FloatingLabelItem from './Layout/FloatingLabelItem';
import { styles, GlobalStyles } from '../../utils/Style';

const Control_ImageStatic = (props) =>
{
    const { label, value, size } = props;

    const { w, h } = size || {};
    const ratio = w ? w / GlobalStyles.screenWidth.width : 1;

    return (
        <FloatingLabelItem label={label}>
            <View style={styles.ImageContainer}>
                <Image source={{ uri: value }} style={{ width: (w || GlobalStyles.screenWidth.width) / ratio, height: (h || 200) / ratio }}/>
           </View>
        </FloatingLabelItem>
    );
};
export default Control_ImageStatic;
