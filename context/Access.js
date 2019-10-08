import RNFetchBlob from 'rn-fetch-blob';
import { RequestStoragePermissions } from '../utils/Permission';

const getAccessPath = () => RNFetchBlob.fs.dirs.DCIMDir + '/Reports/access.token';

const IsUnlocked = async (onSuccess) =>
{
    let hasPermission = await RequestStoragePermissions();
    if (!hasPermission)
        return onSuccess(false);

    let exists = await RNFetchBlob.fs
                        .exists(getAccessPath());

    if (!exists) onSuccess(false);

    let token = await RNFetchBlob.fs
                        .readFile(getAccessPath(), 'utf8');

    return onSuccess(token === GetNowToken());
}
   
const Unlock = async (token, onSuccess) =>
{
    let hasPermission = await RequestStoragePermissions();
    if (!hasPermission)
        return onSuccess(false);

    if (token != GetNowToken())
        return onSuccess(false);

    RNFetchBlob.fs
        .writeFile(getAccessPath(), token, 'utf8')
        .then(() => onSuccess(true));
}

const GetNowToken = () =>
{
    return fakeDB.accessKeys[new Date().getFullYear()];
}


const fakeDB =
{
    accessKeys:
    {'2019': "edf33509"
    ,'2020': "04f78750"
    }
};

export default
    {IsUnlocked
    ,Unlock
    };