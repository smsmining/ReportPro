import React from 'react';
import { Left, Button, Body, Title, Right, Text } from 'native-base';

import { Icon } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

import  Colors  from '../../utils/ReportColors';

const FormHeader = (props) =>
{
    const { title } = props;

    return (
        <React.Fragment>
        <Left>
            <Button transparent onPress={Actions.Reports}>
            <Icon name="arrow-back" color={Colors.white} />
            </Button>
        </Left>
        <Body>
            <Title>{title}</Title>
        </Body>
        <Right>
            <Button hasText transparent>
                <Text>Upload</Text>
            </Button>
        </Right>
        </React.Fragment>
    );
};

export default FormHeader;
