import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Overlay, Icon } from 'react-native-elements'
import SignatureCapture from 'react-native-signature-capture';

import FloatingLabelItem from './Layout/FloatingLabelItem';
import { ShouldUpdateForString } from '../ControlItem';
import { styles, AlignmentStyles, Colors, GlobalStyles } from '../../utils/Style';
import { Body, Left, Right } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';

export default class Control_Signature extends React.Component
{
    state = {
        open: false
        }

    shouldComponentUpdate(newProps, newState) { return newState.open ^ this.state.open ||ShouldUpdateForString(this.props, newProps); }

    toggleDialog = () => this.setState({ open: !this.state.open });

    onChange = (event) =>
    {
        this.props.onChange({ uri: "data:image/png;base64," + event.encoded, width: 300, height: 175 }, this.props.param);
        this.toggleDialog();
    }

    render()
    {
        const { label, value } = this.props;
        const { open } = this.state;

        const input = (
            <Overlay height={250} containerStyle={AlignmentStyles.auto} isVisible={open}>
                <View style={{ ...styles.borderBottom, flex: 1, flexDirection: 'column' }}>
                    <View style={{ ...styles.borderBottom, flex: 1, flexDirection: 'row' }}>
                        <Icon name='save' type='Feather' onPress={() => this.refs["sign"].saveImage()} />
                        <Text style={{ flexGrow: 1, textAlign: "center" }}>{label}</Text>
                        <Icon name='cancel' type='MaterialCommunityIcons' onPress={this.toggleDialog} />
                    </View>
                    <SignatureCapture
                        ref='sign'
                        style={{ width: 300, height: 175 }}
                        onSaveEvent={this.onChange}
                        saveImageFileInExtStorage={false}
                        showNativeButtons={false}
                        showTitleLabel={false}
                        viewMode='portrait'
                        maxSize={300}
                    />
                </View>
            </Overlay>
        );

        if (value)
        {
            let renderStyle =
                {width: GlobalStyles.screenWidth.width
                ,height: value.height * GlobalStyles.screenWidth.width / value.width
                };

            return (
                <FloatingLabelItem label={label} height={renderStyle.height}>
                    <TouchableOpacity style={styles.center} onPress={this.toggleDialog}>
                        <View style={styles.ImageContainer}>
                            <Image style={renderStyle} source={value} />
                        </View>
                    </TouchableOpacity>
                    {input}
                </FloatingLabelItem>
                );
            }

        return (
            <InlineLabelItem label={label}>
                <TouchableOpacity style={styles.center} onPress={this.toggleDialog}>
                    <View style={styles.ImageContainer}>
                        <Text style={{ color: Colors.secondary, margin: 5 }}>
                            Sign Here
                        </Text>
                    </View>
                </TouchableOpacity>
                {input}
            </InlineLabelItem>
        );
    }
}