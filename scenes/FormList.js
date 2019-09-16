import React from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Text, Image } from 'native-base';

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
            <PageLayout header="Reports">
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
/*

            <PageLayout header="Reports">
                <Image source={SMSLogo} style={styles.imageStatic} />
                <Container>
                    <Content>
                        {loading &&
                        <Text style={styles.center}>Loading ...</Text>
                        }
                        {forms &&
                        <FlatList
                            data={forms}
                            keyExtractor={(item) => item.guid}
                            renderItem={this.renderFormItem}
                        />
                        }
                    </Content>
                </Container>
            </PageLayout>

*/