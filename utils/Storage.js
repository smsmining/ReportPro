import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const Internal = RNFetchBlob.fs.dirs.CacheDir + '/Reports/';
export const Asset = Platform.select({
                                     ios: RNFetchBlob.fs.dirs.MainBundleDir + '/',
                                     android: RNFetchBlob.fs.asset('resources/')
                                     });
export const Output = RNFetchBlob.fs.dirs.DocumentDir + '/Reports/';

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
