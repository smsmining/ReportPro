import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import { styles, GlobalStyles, Colors } from '../../utils/Style';
import ImageHelper from '../../utils/imageHelper';

import InlineLabelItem from './Layout/InlineLabelItem';
import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForImage } from '../ControlItem';
import CameraOverlay from '../CameraOverlay';
import { MessageAlert } from '../Alerts';
import { Remove } from '../../utils/Storage';
import AppFlags from '../../AppFlags';

export default class Control_ImagePicker extends React.Component
{
    state = { show: false, image: null };

    shouldComponentUpdate(newProps, newState)
    {
        return  newState.show ^ this.state.show
            ||  (newState.image || {}).uri !== (this.state.image || {}).uri
            ||  ShouldUpdateForImage(this.props, newProps);
    }

    componentDidUpdate(oldProps)
    {
        this.handleValueChange(oldProps.value);
    }

    handleValueChange = async (oldValue) =>
    {
        const { value } = this.props;

        if ((value || {}).uri === (oldValue || {}).uri
        &&  (value || {}).timestamp === (oldValue || {}).timestamp
            )
            return;

        let renderStyle =
            {width: GlobalStyles.screenWidth.width
            ,height: value.height * GlobalStyles.screenWidth.width / value.width
            };

        let { uri, type } = ImageHelper.getImageParams(value.uri);
        let path = await ImageHelper.imageScale(uri, renderStyle.width, renderStyle.height, type, AppFlags.PDFDraw.image.compressionQuality);
        this.setState({ image: { style: renderStyle, uri: path } });
    }

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
            onChange({ uri: 'file://' + path, width: value.width, height: value.height, timestamp: new Date().getTime() }, param);
        })
        .then(() => Remove(value.uri));
    }

    onError = (e) =>
    {
        console.log(e);
        this.toggleCamera();
        MessageAlert("Photo not captured", "There was an issue taking the photo.");
    }
        

    render()
    {
        const { disabled } = this.props;
        const { show, image } = this.state;

        const camera = show ? <CameraOverlay onCapture={this.onChange} onClose={this.toggleCamera} onError={this.onError} /> : null;

        if (image)
            return (
                <FloatingLabelItem {...this.props} height={image.style.height}>
                    <TouchableOpacity style={styles.center} onPress={this.toggleCamera} disabled={disabled}>
                        <View style={styles.ImageContainer}>
                            <Image style={image.style} source={{ uri: image.uri }} />
                        </View>
                    </TouchableOpacity>
                    {camera}
                </FloatingLabelItem >
                );

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
