import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { Overlay } from 'react-native-elements';
import { CameraStyles, HighlightStyles } from '../utils/Style';
import { CameraPermissionOptions } from '../utils/Permission';
import { Icon } from 'native-base';

const Options =
    {base64: true
    ,exif: false
    ,writeExif: false
    ,pauseAfterCapture: true
    ,fixOrientation: true
    }

export default class CameraOverlay extends React.Component
{
    state = {
        disabled: false,
        width: 0,
        height: 0,
        orientation: 'portrait'
        }

    componentDidMount()
    {
        this.updateOrientation({ window: Dimensions.get("window") });
        Dimensions.addEventListener("change", this.updateOrientation)
    }

    componentWillUnmount() { Dimensions.removeEventListener("change", this.updateOrientation); }

    updateOrientation = ({ window }) => this.setState({ ...window, orientation: window.width > window.height ? 'landscapeLeft' : 'portrait' });


    onClose = () => this.setState({ disabled: true }, this.props.onClose);

    onTake = (camera) => this.setState({ disabled: true }, () => camera
        .takePictureAsync({ ...Options, orientation: this.state.orientation })
        .then(this.props.onCapture)
        .catch(this.props.onError));

    onClear = () => this.setState({ disabled: true }, this.props.onCapture);


    renderOverlay = (props) =>
    {
        let buttonStyle = { ...CameraStyles.button, ...(this.state.disabled ? HighlightStyles.disabled : {}) };
        return (
            <View style={CameraStyles.overlay}>
                {props.status !== 'READY'
                ?   <View style={CameraStyles.button} >
                        <Text>Loading</Text>
                    </View>
                :   (<React.Fragment>
                    <TouchableOpacity
                        style={buttonStyle}
                        onPress={this.onClose}
                        disabled={this.state.disabled}
                    >
                        <Icon name="close" type="MaterialCommunityIcons"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={buttonStyle}
                        onPress={() => this.onTake(props.camera)}
                        disabled={this.state.disabled}
                    >
                        <Icon name="camera" type="SimpleLineIcons"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={buttonStyle}
                        onPress={this.onClear}
                        disabled={this.state.disabled}
                    >
                        <Icon name="copy" type="FontAwesome" />
                    </TouchableOpacity>
                    </React.Fragment>)
                }
            </View>
        )
    }

    render()
    {
        const { onError } = this.props;
        const { width, height } = this.state;

        return (
            <Overlay
                width={width}
                height={height - 80}
                isVisible={this.props.isVisible || true}
            >
                <RNCamera
                    style={CameraStyles.camera}
                    androidCameraPermissionOptions={CameraPermissionOptions}
                    captureAudio={false}
                    onMountError={onError}
                >
                    {this.renderOverlay}
                </RNCamera>
            </Overlay>
        );
    }
}