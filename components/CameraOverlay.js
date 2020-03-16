import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { Overlay } from 'react-native-elements';
import { CameraStyles } from '../utils/Style';
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
    state= {
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

    renderOverlay = (props) => (
        <View style={CameraStyles.overlay}>
            {props.status !== 'READY'
            ?   <View style={CameraStyles.button} >
                    <Text>Loading</Text>
                </View>
            :   (<React.Fragment>
                <TouchableOpacity
                    style={CameraStyles.button}
                    onPress={this.props.onClose}
                >
                    <Icon name="close" type="MaterialCommunityIcons"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={CameraStyles.button}
                    onPress={() => props.camera
                        .takePictureAsync({ ...Options, orientation: this.state.orientation })
                        .then(this.props.onCapture)
                        .catch(this.props.onError)
                    }
                >
                    <Icon name="camera" type="SimpleLineIcons"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={CameraStyles.button}
                    onPress={() => this.props.onCapture()}
                >
                    <Icon name="copy" type="FontAwesome" />
                </TouchableOpacity>
                </React.Fragment>)
            }
        </View>
    )

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