import {Alert} from 'react-native';

export default MessageAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK' }], { cancelable: false });