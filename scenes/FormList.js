import React from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Button, Text, Left, Right, Icon, Header, Title, Body } from 'native-base';

import   Forms  from '../context/Forms';

import { styles } from '../utils/Style';
import  HeaderSMS  from '../utils/ReportHearder';
import FormItem from '../components/ControlForm/FormItem';
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
            ,
            });
    }

    clearAsync = () =>
    {
        if (this._asyncReqForm)
            this._asyncReqForm.cancel();
    }


    renderFormItem = (data,loading) => {
        return <FormItem item = {data.item} loading = {loading} />;
    }

    render()
    {
        const { forms, loading } = this.state;

        return (
            <Container>
                <Header androidStatusBarColor="#5D4037" >
                    <Left>
                        <Button transparent>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Reports</Title>
                    </Body>
                    <Right />
                </Header>
                <HeaderSMS />
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
            </Container>
        );
    }
}