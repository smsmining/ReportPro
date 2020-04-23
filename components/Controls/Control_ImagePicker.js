import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import { styles, GlobalStyles, Colors } from '../../utils/Style';

import InlineLabelItem from './Layout/InlineLabelItem';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForImage } from '../ControlItem';
import CameraOverlay from '../CameraOverlay';
import { MessageAlert } from '../Alerts';


export default class Control_ImagePicker extends React.Component
{
    state = { show: false };

    shouldComponentUpdate(newProps, newState) { return newState.show ^ this.state.show || ShouldUpdateForImage(this.props, newProps); }

    toggleCamera = () => this.setState({ show: !this.state.show });
    onChange = (value) =>
    {
        const { param, onChange, save } = this.props;

        if (!value)
        {
            this.toggleCamera();
            onChange(value, param);
            return;
        }
        
        save(value.base64, param + '.' + value.uri.substr(value.uri.lastIndexOf('.') + 1), 'base64')
        .then(path =>
        {
            this.toggleCamera();
            onChange({ uri: 'file://' + path, width: value.width, height: value.height }, param);
        });
    }

    onError = (e) =>
    {
        console.log(e);
        this.toggleCamera();
        MessageAlert("Photo not captured", "There was an issue taking the photo.");
    }
        

    render()
    {
        const { value, disabled } = this.props;
        const { show } = this.state;

        const camera = show ? <CameraOverlay onCapture={this.onChange} onClose={this.toggleCamera} onError={this.onError} /> : null;

        if (value)
        {
            let renderStyle =
                {width: GlobalStyles.screenWidth.width
                ,height: value.height * GlobalStyles.screenWidth.width / value.width
                };

            return (
                <FloatingLabelItem {...this.props} height={renderStyle.height}>
                    <TouchableOpacity style={styles.center} onPress={this.toggleCamera} disabled={disabled}>
                        <View style={styles.ImageContainer}>
                            <Image style={renderStyle} source={value} />
                        </View>
                    </TouchableOpacity>
                    {camera}
                </FloatingLabelItem >
                );
            }

        return (
            <InlineLabelItem {...this.props} >
                <TouchableOpacity style={styles.center} onPress={this.toggleCamera} disabled={disabled}>
                    <View style={styles.ImageContainer}>
                        <Text style={{ color: Colors.secondary, margin: 5 }}>
                            Select a Photo
                        </Text>
                    </View>
                </TouchableOpacity>
                {camera}
            </InlineLabelItem>
        );
    }
}
