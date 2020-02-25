import React from 'react';
import { Platform, FlatList, BackHandler, Linking } from 'react-native';
import { Container, Content, Text } from 'native-base';

import Forms from '../context/Forms';
import { styles } from '../utils/Style';

import FormItem from '../components/ControlForm/FormItem';
import PageLayout from '../components/Layout/PageLayout';

export default class FormList extends React.Component
{
    state = {
        forms: null,
        loading: false,
        };

    componentDidMount()
    {
        this.loadForms();
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

    render()
    {
        const { forms, loading } = this.state;

        return (
            <PageLayout
                back={Platform.OS === 'android' ? { icon: 'cloud-download', onPress: () => Linking.openURL('http://smsmining.ga/') } : undefined}
                next={{ icon: 'window-close', iconType: "MaterialCommunityIcons", onPress: BackHandler.exitApp }}
            >
                <Container>
                    <Content>
                        {loading &&
                        <Text style={styles.center}>Loading ...</Text>
                        }
                        {forms &&
                        <FlatList
                            data={forms}
                            keyExtractor={(item) => item.guid}
                            renderItem={FormItem}
                        />
                        }
                    </Content>
                </Container>
            </PageLayout>
        );
    }
}