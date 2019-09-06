
import {Alert} from 'react-native';

const ReportAlert = (title,text) =>
{
    Alert.alert(
        title,
        text,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
};

export default ReportAlert;

