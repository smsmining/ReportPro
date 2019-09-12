import {Alert} from 'react-native';

const MessageAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK' }], { cancelable: false });
export default MessageAlert;