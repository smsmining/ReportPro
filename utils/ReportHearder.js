
import React from 'react';
import {Text, ImageBackground} from 'react-native';
import { styles } from './Style';

const HeaderSMS = () => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('./sms_logo.png')}
    style={styles.background}
    imageStyle={styles.logo}>
    <Text style={styles.text}>Welcome to SMS Report Demo</Text>
  </ImageBackground>
);


export default HeaderSMS;
