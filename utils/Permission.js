import { PermissionsAndroid } from 'react-native';

export const RequestStoragePermissions = async (onSuccess, onError) =>
{
    try
    {
        const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE );

        if (granted === PermissionsAndroid.RESULTS.GRANTED);
            return onSuccess();

        return onError("User denied storage permissions.");
    }
    catch (err)
        { onError(err); }
}