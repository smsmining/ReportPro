/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Forms from './Forms';
import Main from './Main';
import {Router, Scene} from 'react-native-router-flux';
import {StyleSheet} from 'react-native';
import {Colors} from './utils';

const App = () => {
  return (
    <Router>
      <Scene key="root" titleStyle={styles.titleStyle}>
        <Scene
          key="Reports"
          component={Forms}
          title="Reports"
          initial={true}
          // navigationBarStyle={styles.FormsBackground}
          hideNavBar={true}
        />
        <Scene
          key="Main"
          component={Main}
          // navigationBarStyle={styles.FormsBackground}
          // leftButtonStyle={{backgroundColor:Colors.lighter,marginTop:0, borderBottomWidth:0}}
          // rightButtonImage={require('./logo.png')}
          // rightTitle={'Save'}
          // onRight={() => {}}
          // title="Work"
          hideNavBar={true}
        />
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    textDecorationStyle: 'solid',
    flex: 1,
    color: Colors.lighter,
  },
  FormsBackground: {
    backgroundColor: Colors.blue,
    marginTop: 0,
    borderBottomWidth: 0,
  },
});

export default App;
