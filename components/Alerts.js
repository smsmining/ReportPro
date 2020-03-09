import { Alert } from 'react-native';

export const MessageAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK' }], { cancelable: false });
export const GeneralAlertDialog = (title, text, onConfirm, onCancel, confirmName, cancelName) => Alert.alert(
     title, text
    ,[{ text: cancelName || "Cancel", onPress: () => onCancel && onCancel() }
     ,{ text: confirmName || "Confirm", onPress: () => onConfirm && onConfirm() }
     ]
    ,{ cancelable: false }
);