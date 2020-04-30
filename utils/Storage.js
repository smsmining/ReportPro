import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker'
import { zip } from 'react-native-zip-archive'


const MakeDir = async (path) =>
{
    const root = await path.substr(0, path.lastIndexOf('/') + 1);
    if (await RNFetchBlob.fs.exists(root))
        return;

    await RNFetchBlob.fs.mkdir(root);    
}

export const Internal = RNFetchBlob.fs.dirs.CacheDir + '/Reports/';
export const Temp = async () =>
{
    const folder = Internal + 'temp/' + (new Date().getTime()) + '/';
    await MakeDir(folder);
    return folder;
}
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
    try { return await RNFetchBlob.fs.exists(path); }
    catch (e) { return false; }
}

export const Scan = async (path) =>
{
    try { return await RNFetchBlob.fs.ls(path); }
    catch (e) { return null; }
}

export const Read = async (path, format) =>
{
    if (path.startsWith('file://'))
        path = path.replace('file://', '');

    if (!await Exists(path)) return;

    return await RNFetchBlob.fs
        .readFile(path, format || 'utf8');
}

export const Pick = async (type, format) =>
{
    try
    {
        const file = await DocumentPicker.pick(type ? { type: type } : undefined);
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
    if (path.startsWith('file://'))
        path = path.replace('file://', '');

    try
    {
        await MakeDir(path);
        await RNFetchBlob.fs.writeFile(path, data, format || 'utf8');
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

export const Remove = async (path) =>
{
    if (path.startsWith('file://'))
        path = path.replace('file://', '');

    if (!await Exists(path))
        return;

    await RNFetchBlob.fs.unlink(path);
}

export const Rename = async (from, to) =>
{
    MakeDir(to);

    let isDir = await RNFetchBlob.fs.isDir(from);
    if (!isDir)
    {
        const data = await Read(from, 'base64');
        await Write(to, data, 'base64');
        await Remove(from);
        return;
    }

    let scan = await Scan(from);
    if (!scan)
        return;

    if (!from.endsWith('/')) from += '/';
    if (!to.endsWith('/')) to += '/';

    for (let i = 0; i < scan.length; i++)
        await Rename(from + scan[i], to + scan[i])

    await Remove(from);
}

export const Zip = async (path) =>
{
    const stats = await RNFetchBlob.fs.stat(path);

    const folder = stats.path.substr(0, stats.path.lastIndexOf('/'));
    const file = stats.filename.substring(0, stats.filename.length - 4);

    const target = await Temp() + file + '.zip';
    return 'file://' + await zip(folder, target);
}