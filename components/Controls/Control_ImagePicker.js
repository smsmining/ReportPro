import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { styles, GlobalStyles, Colors } from '../../utils/Style';

import InlineLabelItem from './Layout/InlineLabelItem';
import FloatingLabelItem from './Layout/FloatingLabelItem';

const options =
        {quality: 1.0
        ,maxWidth: 500
        ,maxHeight: 500
        ,mediaType: 'photo'
        ,noData: true
        ,storageOptions: { skipBackup: true, privateDirectory: true },
        };

const selectImage = (param, onChange) =>
    ImagePicker.showImagePicker(options, response =>
    {
        if (response.error || response.didCancel )
            return;
        onChange({ uri: response.uri, width: response.width, height: response.height }, param);
    });

export default Control_ImagePicker = (props) =>
{
    const { label, value, param, onChange } = props;

    if (value)
    {
        let renderStyle =
            {width: GlobalStyles.screenWidth.width
            ,height: value.height * GlobalStyles.screenWidth.width / value.width
            };

        return (
            <FloatingLabelItem label={label} height={renderStyle.height}>
                <TouchableOpacity style={styles.center} onPress={() => selectImage(param, onChange)}>
                    <View style={styles.ImageContainer}>
                        <Image style={renderStyle} source={value} />
                    </View>
                </TouchableOpacity>
            </FloatingLabelItem >
            );
        }

    return (
        <InlineLabelItem label={label}>
            <TouchableOpacity style={styles.center} onPress={() => selectImage(param, onChange)}>
                <View style={styles.ImageContainer}>
                    <Text style={{ color: Colors.secondary, margin: 5 }}>
                        Select a Photo
                    </Text>
                </View>
            </TouchableOpacity>
        </InlineLabelItem>
    );
};