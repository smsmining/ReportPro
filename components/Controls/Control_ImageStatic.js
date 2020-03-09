import React from 'react';
import { Image, View } from 'react-native';

import { styles, GlobalStyles } from '../../utils/Style';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForString } from '../ControlItem';

export default class Control_ImageStatic extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForString(this.props, newProps); }

    render()
    {
        const { label, value, size } = this.props;

        const { w, h } = size || {};
        const ratio = w ? w / GlobalStyles.screenWidth.width : 1;

        return (
            <FloatingLabelItem label={label}>
                <View style={styles.ImageContainer}>
                    <Image source={{ uri: value }} style={{ width: (w || GlobalStyles.screenWidth.width) / ratio, height: (h || 200) / ratio }}/>
            </View>
            </FloatingLabelItem>
        );
    }
}