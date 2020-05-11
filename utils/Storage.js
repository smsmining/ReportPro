import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker'
import { zip } from 'react-native-zip-archive'
import Share from 'react-native-share';

import { MessageAlert } from '../components/Alerts';
import { StoragePermission } from './Permission';


const Root = (path) => path.substr(0, path.lastIndexOf('/') + 1);

const cleanPath = (path) =>
{
    if (path.startsWith('file://'))
        path = path.replace('file://', '');

    if (path.startsWith('content://'))
        path = path.replace('content://', '');

    return path;
}

const MakeDir = async (path) =>
{
    const root = Root(path);
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


/* --- File System ---  */
export const Exists = async (path) =>
{
    path = cleanPath(path);

    try { return await RNFetchBlob.fs.exists(path); }
    catch (e) { return false; }
}

export const Scan = async (path) =>
{
    path = cleanPath(path);

    try { return await RNFetchBlob.fs.ls(path); }
    catch (e) { return null; }
}

export const Read = async (path, format) =>
{
    path = cleanPath(path);

    if (!await Exists(path)) return;

    return await RNFetchBlob.fs
        .readFile(path, format || 'utf8');
}

export const Write = async (path, data, format) =>
{
    path = cleanPath(path);

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
    path = cleanPath(path);

    if (!await Exists(path))
        return;

    await RNFetchBlob.fs.unlink(path);
}

export const Rename = async (from, to) =>
{
    from = cleanPath(from);
    to = cleanPath(to);

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

/* --- User Select ---  */
export const Pick = async (type, format) =>
{
    try
    {
        let file = await DocumentPicker.pick(type ? { type: type } : undefined);
        return await RNFS.readFile(file.uri, format || 'utf8');
    }
    catch (e)
    {
        if (DocumentPicker.isCancel(e))
            return null;
        throw e;
    }
}

export const Create = async (type, data, format) =>
{
    try
    {
        const storagePerm = await StoragePermission();
        if (!storagePerm)
            return null;

        const file = await DocumentPicker.create(type ? { type: type } : undefined);
        await RNFS.writeFile(file.uri, data, format || 'utf8');

        return file.uri;
    }
    catch (e)
    {
        if (DocumentPicker.isCancel(e))
            return null;
        throw e;
    }
}

/* --- Zip ---  */
export const Zip = async (path) =>
{
    const stats = await RNFetchBlob.fs.stat(path);

    const folder = stats.path.substr(0, stats.path.lastIndexOf('/'));
    const file = stats.filename.substring(0, stats.filename.length - 4);

    const target = await Temp() + file + '.zip';
    return 'file://' + await zip(folder, target);
}

export const ZipShare = async (path, title) =>
{
    try
    {
        let zipPath = await Zip(path);

        await Share.open(
            {title: title
            ,url: zipPath
            ,type: 'application/zip'
            });

        return true;
        }
    catch (e)
    {
        console.log(e);
        MessageAlert
            ("Send Error"
            ,"An issue occured sending the file"
            );

        return false;
    }
}

export const ZipCreate = async (path, title) =>
{
    try
    {
        let zipPath = await Zip(path);
        let zipData = await Read(zipPath, 'base64');

        const savePath = await Create('application/zip', zipData, 'base64');
        if (!savePath)
            return false;

        return true;
        }
    catch (e)
    {
        console.log(e);
        MessageAlert
            ("Save Error"
            ,"An issue occured sending the file"
            );

        return false;
    }
}