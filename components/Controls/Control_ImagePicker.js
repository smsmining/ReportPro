import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Text, TouchableOpacity,View,Image} from 'react-native';
import { styles } from '../../utils/Style';
import Colors from '../../utils/ReportColors';
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

    return (
        <FloatingLabelItem label={label}>
            <TouchableOpacity  style={styles.center} onPress={() => selectImage(param, onChange)}>
                <View style={ styles.ImageContainer}>
                    {value
                ?   <Image style={styles.image} source={value} />
                :   <Text style={{ color: Colors.light }}>
                        Select a Photo
                    </Text>
                    }
                </View>
            </TouchableOpacity>
        </FloatingLabelItem>
    );
};

export default Control_ImagePicker;
