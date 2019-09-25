import {Alert} from 'react-native';

export const MessageAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK' }], { cancelable: false });
export const ConfirmAlert = (title, text, onConfirm, onCancel) => Alert.alert(
     title, text
    ,[{ text: "Cancel", onPress: () => onCancel && onCancel() }
     ,{ text: "Confirm", onPress: () => onConfirm && onConfirm() }
     ]
    ,{ cancelable: false }
);