import { StoragePermission } from '../utils/Permission';
import { Read, Write, Internal } from '../utils/Storage';

const AccessPath = Internal + 'access.token';
const accessKeys =
        {'2019': "edf33509"
        ,'2020': "04f78750"
        }

const GetNowToken = () => accessKeys[new Date().getFullYear()];


let access = {};

access.IsUnlocked = async () =>
{
    let hasPermission = await StoragePermission();
    if (!hasPermission)
        return false;

    let token = await Read(AccessPath);

    return token === GetNowToken();
}
   
access.Unlock = async (token) =>
{
    let hasPermission = await StoragePermission();
    if (!hasPermission
    ||  token !== GetNowToken()
        )
        return false;
    
    return await Write(AccessPath, token);
}

export default Access = access;