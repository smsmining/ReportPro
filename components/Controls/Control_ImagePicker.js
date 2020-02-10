import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Text, TouchableOpacity,View,Image} from 'react-native';
import { styles } from '../../utils/Style';
import Colors from '../../utils/ReportColors';
import InlineLabelItem from './Layout/InlineLabelItem';
import FloatingLabelItem from './Layout/FloatingLabelItem';

const selectImage = (param, onChange) =>
{
    const options =
        {quality: 1.0
        ,maxWidth: 500
        ,maxHeight: 500
        ,storageOptions: { skipBackup: true },
        };
    ImagePicker.showImagePicker(options, response =>
    {
        if (response.error || response.didCancel )
            return;
        onChange({ uri: response.uri, width: response.width, height: response.height }, param);
    });
};

const Control_ImagePicker = (props) =>
{
    const { label, value, param, onChange } = props;

    if (value)
        return (
            <FloatingLabelItem label={label}>
                <TouchableOpacity style={styles.center} onPress={() => selectImage(param, onChange)}>
                    <View style={styles.ImageContainer}>
                        <Image style={styles.image} source={value} />
                    </View>
                </TouchableOpacity>
            </FloatingLabelItem >
            );

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

export default Control_ImagePicker;
