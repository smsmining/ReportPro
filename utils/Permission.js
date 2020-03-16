import { PermissionsAndroid, Platform } from 'react-native';

export const CameraPermissionOptions =
    {title: 'Permission to use camera'
    ,message: 'SMS Reports accesses your camera to insert into documentaion'
    ,buttonPositive: 'Ok'
    ,buttonNegative: 'Cancel'
    }

export const StoragePermission = async (onSuccess, onError) =>
{
    try
    {
        if (Platform.OS == 'ios')
            return true;

        const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE );

        if (granted === PermissionsAndroid.RESULTS.GRANTED);
        {
            if (onSuccess)
                onSuccess();

            return true;
        }

        (onError || console.log)("User denied storage permissions.");

        return false;
    }
    catch (err)
        { (onError || console.log)(err); return false; }
}
