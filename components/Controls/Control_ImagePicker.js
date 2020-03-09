import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { styles, GlobalStyles, Colors } from '../../utils/Style';

import InlineLabelItem from './Layout/InlineLabelItem';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForImage } from '../ControlItem';
import { GeneralAlertDialog } from '../Alerts';

const options =
        {quality: 1.0
        ,mediaType: 'photo'
        ,noData: true
        ,storageOptions: { skipBackup: true, privateDirectory: true },
        };

export default class Control_ImagePicker extends React.Component
{
    shouldComponentUpdate(newProps) { return ShouldUpdateForImage(this.props, newProps); }

    selectImage = () => ImagePicker.launchCamera(options, response =>
    {
        const { param, onChange, pdf } = this.props;

        if (response.error || response.didCancel)
            return;

        if (response.width === response.height || !pdf)
            return onChange({ uri: response.uri, width: response.width, height: response.height }, param);

        const imgVert = (response.width / response.height) < 1;
        for (let page in Object.values(pdf))
        {
            const pdfVert = (page.width / page.height) < 1;
        
            if (pdfVert === imgVert)
                continue;

            return GeneralAlertDialog
                ('Confirm Rotation'
                ,'The image was expected to be ' + (pdfVert ? 'vertical' : 'horizontal') + '.\nWould you like to take it again?'
                ,this.selectImage
                ,() => onChange({ uri: response.uri, width: response.width, height: response.height }, param)
                ,'Retake'
                ,'Keep'
                );
        }

        onChange({ uri: response.uri, width: response.width, height: response.height }, param);
    });

    render()
    {
        const { label, value } = this.props;

        if (value)
        {
            let renderStyle =
                {width: GlobalStyles.screenWidth.width
                ,height: value.height * GlobalStyles.screenWidth.width / value.width
                };

            return (
                <FloatingLabelItem label={label} height={renderStyle.height}>
                    <TouchableOpacity style={styles.center} onPress={this.selectImage}>
                        <View style={styles.ImageContainer}>
                            <Image style={renderStyle} source={value} />
                        </View>
                    </TouchableOpacity>
                </FloatingLabelItem >
                );
            }

        return (
            <InlineLabelItem label={label}>
                <TouchableOpacity style={styles.center} onPress={this.selectImage}>
                    <View style={styles.ImageContainer}>
                        <Text style={{ color: Colors.secondary, margin: 5 }}>
                            Select a Photo
                        </Text>
                    </View>
                </TouchableOpacity>
            </InlineLabelItem>
        );
    }
}