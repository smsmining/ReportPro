/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,} from 'react-native';
import { Container, Header, Content, Input, Label, Left, Button, Body, Title, Right, Text, DatePicker,List, ListItem, Radio, Fab, Footer} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {BottomNavigation, Icon} from 'react-native-material-ui';
import {Colors} from './utils';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      place: '',
      inspector: '',
      name: '',
      company: '',
      phone: '',
      itemSelected: '',
      model_Code: '',
      model_name: '',
      model_SN: '',
      model_ID: '',
      fab_active: false,
    };
    this._setDate = this._setDate.bind(this);
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#5D4037">
          <Left>
            <Button transparent onPress={() => this._buttonPress()}>
              <Icon name="arrow-back" color={Colors.white} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={() => this._saveInfo()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>Basic Information</Text>
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label> Date:</Label>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2010, 1, 1)}
                maximumDate={new Date(2050, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"calendar"}
                placeHolderText={' '.repeat(15)+"Select date"+' '.repeat(23)}
                textStyle={{color: "black"}}
                placeHolderTextStyle={{color: "#d3d3d3"}}
                onDateChange={this._setDate}
                formatChosenDate={this._setDateStyle}
              />
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Place :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({place: text})} />
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Inspector :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({inspector: text})} />
            </ListItem>
            <ListItem itemDivider>
              <Text>Customer Information</Text>
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Name :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({name: text})} />
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Company :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({company: text})} />
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Phone :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({phone: text})} />
            </ListItem>
            <ListItem itemDivider>
              <Text>Customer activity</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Lunch break</Text>
              </Left>
              <Right>
                <Radio
                  selected={this.state.itemSelected === 'itemOne'}
                  onPress={() => this.setState({itemSelected: 'itemOne'})}
                />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Daily Stand Up</Text>
              </Left>
              <Right>
                <Radio
                  selected={this.state.itemSelected === 'itemTwo'}
                  onPress={() => this.setState({itemSelected: 'itemTwo'})}
                />
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>Machine Details</Text>
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Model Code :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({model_Code: text})} />
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Model Name :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({model_name: text})} />
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>S/N :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({model_SN: text})} />
            </ListItem>
            <ListItem style={styles.borderBottom}>
              <Label>Machine ID :{' '.repeat(15)}</Label>
              <Input onChangeText={text => this.setState({model_ID: text})} />
            </ListItem>
          </List>
          {/* <Form style={styles.formStyle}>
            <Item>
              <Label>Inspection Date:</Label>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2010, 1, 1)}
                maximumDate={new Date(2050, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"calendar"}
                placeHolderText={' '.repeat(15)+"Select date"+' '.repeat(23)}
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this._setDate}
                formatChosenDate={this._setDateStyle}
              />
            </Item>
            <Item fixedLabel>
              <Label>Inspection Place :</Label>
              <Input />
            </Item>
            <Item fixedLabel>
              <Label>Password :</Label>
              <Input />
            </Item>
          </Form> */}
        </Content>
        <Fab
          active={this.state.fab_active}
          direction="up"
          containerStyle={{bottom: 76}}
          position="bottomRight"
          style={{ backgroundColor: '#FF0000' }}
          onPress={() => this.setState({fab_active: !this.state.fab_active})}>
          <Icon name="share" />
          <Button style={{ backgroundColor: '#3B5998' }}  >
            <Icon name="email" />
          </Button>
          <Button style={{ backgroundColor: '#34AF23' }} >
            <Icon name="picture-as-pdf" />
          </Button>
        </Fab>

        {/* <ActionButton
          actions={[
            {icon: 'picture-as-pdf', label: 'PDF'},
            {icon: 'email', label: 'Email'},
          ]}
          hidden={this.state.bottomHidden}
          icon="share"
          transition="speedDial"
          onPress={action => {
            if (Platform.OS === 'android') {
              ToastAndroid.show(action, ToastAndroid.SHORT);
            }
          }}
          style={{
            positionContainer: {bottom: 76},
          }}
        /> */}
        <Footer>
          <BottomNavigation
            active={this.state.active}
            hidden={this.state.bottomHidden}
            style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }} 
            >
            <BottomNavigation.Action
              key="record"
              icon="event-note"
              label="Record"
              onPress={() => this.setState({ active: 'Info' })}
            />
            <BottomNavigation.Action
              key="photo"
              icon="photo-camera"
              label="Photo"
              onPress={() => this.setState({ active: 'photo' })}
            />
            <BottomNavigation.Action
              key="history"
              icon="history"
              label="History"
              onPress={() => this.setState({ active: 'history' })}
            />
            <BottomNavigation.Action
              key="settings"
              icon="settings"
              label="Settings"
              onPress={() => this.setState({ active: 'settings' })}
            />
          </BottomNavigation>
        </Footer>
      </Container>
    );
  }

  _buttonPress() {
    Actions.Reports();
  }
  _setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
  _setDateStyle(newDate) {
    return [
      ' '.repeat(15),
      newDate.getDate(),
      '/',
      newDate.getMonth() + 1,
      '/',
      newDate.getFullYear(),
      ' '.repeat(23),
    ];
  }
  _saveInfo() {}

  async _createPDF() {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    console.log("pdf creating");
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    alert(file.filePath);
  }
}

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  // link: {
  //   flex: 2,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.primary,
  // },
  // description: {
  //   flex: 3,
  //   paddingVertical: 16,
  //   fontWeight: '400',
  //   fontSize: 18,
  //   color: Colors.dark,
  // },
  separator: {
    backgroundColor: 'blue',
    height: 1,
  },
  formStyle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  LabelStyle: {
    marginBottom: 32,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },

  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
});
