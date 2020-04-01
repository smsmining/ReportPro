import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import { styles, GlobalStyles, Colors } from '../../utils/Style';

import InlineLabelItem from './Layout/InlineLabelItem';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForImage } from '../ControlItem';
import CameraOverlay from '../CameraOverlay';


export default class Control_ImagePicker extends React.Component
{
    state = { show: false };

    shouldComponentUpdate(newProps, newState) { return newState.show ^ this.state.show || ShouldUpdateForImage(this.props, newProps); }

    toggleCamera = () => this.setState({ show: !this.state.show });
    onChange = (value) =>
    {
        const { param, onChange } = this.props;

        this.toggleCamera();
        onChange(value ? { uri: "data:image/" + value.uri.substr(value.uri.lastIndexOf('.') + 1) + ";base64," + value.base64, width: value.width, height: value.height } : value, param);
    }

    render()
    {
        const { value, disabled } = this.props;
        const { show } = this.state;

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
                    {show && <CameraOverlay onCapture={this.onChange} onClose={this.toggleCamera} onError={console.log}/>}
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
                {show && <CameraOverlay onCapture={this.onChange} onClose={this.toggleCamera} onError={console.log}/>}
            </InlineLabelItem>
        );
    }
}
