import React from 'react';
import { Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Button, Icon, Body } from 'native-base';

import { styles, MarginStyles, AlignmentStyles } from '../../utils/Style';
import { ZipShare, ZipCreate } from '../../utils/Storage';

const optionHeight = 90;

const ShareOption = (props) => (
    <View style={{ ...MarginStyles.md.b, height: optionHeight }}>
        <Text style={{ ...styles.Label, ...MarginStyles.sm.b }}>
            <Icon {...props.icon} /> {props.title}
        </Text>
        <View style={AlignmentStyles.row}>
            <Button style={{ width: '50%' }} onPress={props.onShare} danger rounded={false} full bordered iconLeft iconRight>
                <Icon name='share' type='SimpleLineIcons' />
                <Text> Share</Text>
            </Button>
            <Button style={{ width: '50%' }} onPress={props.onCreate} danger rounded={false} full bordered iconLeft iconRight>
                <Icon name='save' />
                <Text> Save</Text>
            </Button>
        </View>
    </View>
    )

export default ShareDialog = (props) =>
{
    const share = async ({ title, path }) =>
    {
        await ZipShare(path, title);
        props.onClose();
    }

    const create = async ({ title, path }) =>
    {
        await ZipCreate(path, title);
        props.onClose();
    }

    let renderOptions = props.options.map(o => ({ ...o, onShare: () => share(o.file), onCreate: () => create(o.file) }));

    return (
        <Overlay isVisible={props.isVisible} height={(renderOptions.length * optionHeight) + 100}>
            <View>
                {renderOptions.map(ShareOption)}
                <Button onPress={props.onClose} danger rounded={false} full bordered iconLeft >
                    <Icon name='close' type='MaterialCommunityIcons' />
                    <Text>Close</Text>
                </Button>
            </View>
        </Overlay>
        )
}