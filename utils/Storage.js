import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker'

export const INSTANCE_VERSION = '.v2';

export const Internal = RNFetchBlob.fs.dirs.CacheDir + '/Reports/';
export const Database = Internal + 'database.json';
export const Asset = Platform.select({
                                     ios: RNFetchBlob.fs.dirs.MainBundleDir + '/',
                                     android: RNFetchBlob.fs.asset('resources/')
                                     });
export const Output = RNFetchBlob.fs.dirs.DocumentDir + '/Reports/';

export const Types =
    {Excel: Platform.select(
        {ios: ['com.microsoft.excel.xls', 'com.sms.reports.xlsx']
        ,android: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        })
    }

export const Exists = async (path) =>
{
    let exists = false;
    try { exists = await RNFetchBlob.fs.exists(path); }
    catch (e) { exists = false; }

    return exists;
}

export const Read = async (path, format) =>
{
    let exists = await Exists(path);
    if (!exists) return;

    return await RNFetchBlob.fs
        .readFile(path, format || 'utf8');
}

export const Pick = async (type, format) =>
{
    try
    {
        const file = await DocumentPicker.pick({ type: type });
        return await RNFS.readFile(file.uri, format || 'utf8');
    }
    catch (e)
    {
        if (DocumentPicker.isCancel(e))
            return null;
        throw e;
    }
}

export const Write = async (path, data, format) =>
{
    try
    {
        await RNFetchBlob.fs.writeFile(path, data, format || 'utf8');
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}
