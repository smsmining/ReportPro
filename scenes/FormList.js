import React from 'react';
import { FlatList, BackHandler } from 'react-native';
import { View, ListItem, Text, Left, Right, Icon, Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Forms from '../context/Forms';
import { styles, AlignmentStyles } from '../utils/Style';

import PageLayout from '../components/Layout/PageLayout';
import { AppSettingsOverlay } from '../components/FormList';
import { keys } from '.';

import DevFlags from '../DevFlags';

export default class FormList extends React.Component
{
    state = {
        forms: null,
        loading: false,

        showSettings: false,
        };

    componentDidMount()
    {
        this.loadForms();

        if (!!DevFlags.AutoLoadForm)
            setTimeout(() => Actions[keys.Main]({ guid: DevFlags.AutoLoadForm }), 1);
    }

    componentWillUnmount()
    {
        this.clearAsync();
    }


    loadForms = () =>
    {
        this.setState({ loading: true });
        
        this._asyncReqForm = Forms.List(this.loadFormsResponse);
    }

    loadFormsResponse = (response) =>
    {
        this._asyncReqForm = null;
        
        this.setState(
            {forms: response
            ,loading: false
            });
    }

    clearAsync = () =>
    {
        if (this._asyncReqForm)
            this._asyncReqForm.cancel();
    }

    renderItem = ({ item }) => (
        <ListItem style={styles.borderBottom} onPress={() => Actions[keys.Main]({ guid: item.guid })}>
            <Left style={AlignmentStyles.column}>
                <View>
                    <Text>{item.name}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 8 }}> V:{item.version}</Text>
                </View>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
            </Right>
        </ListItem>
        );

    render()
    {
        const { forms, loading, showSettings } = this.state;

        return (
            <PageLayout
                back={{ icon: 'settings', onPress: () => this.setState({ showSettings: true }) }}
                next={{ icon: 'window-close', iconType: "MaterialCommunityIcons", onPress: BackHandler.exitApp }}
            >
                <Container>
                    {showSettings &&
                    <AppSettingsOverlay onClose={() => this.setState({ showSettings: false })}/>
                    }
                    <Content>
                        {loading &&
                        <Text style={styles.center}>Loading ...</Text>
                        }
                        {forms &&
                        <FlatList
                            data={forms}
                            keyExtractor={(item) => item.guid}
                            renderItem={this.renderItem}
                        />
                        }
                    </Content>
                </Container>
            </PageLayout>
        );
    }
}