import { PermissionsAndroid } from 'react-native';

export const RequestStoragePermissions = async (onSuccess, onError) =>
{
    try
    {
        const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE );

        if (granted === PermissionsAndroid.RESULTS.GRANTED);
        {
            if (onSuccess)
                onSuccess();

            return true;
        }

        if (onError)
            onError("User denied storage permissions.");

        return false;
    }
    catch (err)
        { onError(err); return false; }
}