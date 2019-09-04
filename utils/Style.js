import {StyleSheet} from 'react-native';
import Colors from './ReportColors';
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({
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
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    FormBody: {
      marginLeft: 32,
    },
    container: {
      flex: 1,
    },

    ImageContainer: {
      flex:1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Label: {
      fontSize: 13,
      fontWeight: 'bold',
      color: Colors.dark,
    },
    background: {
      paddingBottom: 40,
      paddingTop: 96,
      paddingHorizontal: 32,
      backgroundColor: Colors.lighter,
    },
    logo: {
      opacity: 0.8,
      overflow: 'visible',
      resizeMode: 'cover',
      marginLeft: -128,
      marginBottom: -192,
    },
    text: {
      fontSize: 40,
      fontWeight: '600',
      textAlign: 'center',
      color: Colors.black,
    },
    image: {
      width: Dimensions.get('window').width,
    },
    imageStatic: {
      width: Dimensions.get('window').width,
      height: 200,
    },
  });
