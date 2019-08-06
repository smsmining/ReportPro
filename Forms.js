import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';

import {Colors,HeaderSMS} from './utils';

import {Actions} from 'react-native-router-flux';
import { Container, Content, Button, ListItem, Text, Left, Right, Icon, Header, Title, Body } from 'native-base';

export default class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
      };
   }
   _buttonPress = (title) => {
    // Actions.Main({ isShowingText: 'xxxx', isShowingButton: 'xxxx'});
    this.state.title = title;
    Actions.Main( this.state );
    // Alert.alert('You tapped the button!');
  }
  _keyExtractor  = (item, index) => index.toString()

  _renderItem = ({ item }) => (
      <ListItem style={styles.borderBottom} onPress={() => this._buttonPress(item.title)}>
        <Left>
          <Text>{item.title}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )

   render() {
    const formList = [
      {
        title: 'Inspection Report',
      },
      {
        title: 'Hire-on Report',
      },
      {
        title: 'Hire-off Report',
      },
      {
        title: 'Form 4',
      },
      {
        title: 'Form 5',
      },
      {
        title: 'Form 6',
      },
      {
        title: 'Form 7',
      },
      {
        title: 'Form 8',
      },
      {
        title: 'Form 9',
      },
      {
        title: 'Form 10',
      },
    ];
    return (
      <Container>
          <Header androidStatusBarColor="#5D4037" >
                    <Left>
                        <Button
                            transparent>
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
            <FlatList  keyExtractor={this._keyExtractor}
                          data={formList}
                          renderItem={this._renderItem} />
          </Content>
          </Container>
      </Container>
      );

   }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  separator: {
    backgroundColor: 'blue',
    height: 1,
    marginLeft: 18,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
});

