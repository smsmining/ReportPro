import { StoragePermission } from '../utils/Permission';
import { Read, Write, Internal } from '../utils/Storage';

const AccessPath = Internal + 'access.token';

const IsUnlocked = async () =>
{
    let hasPermission = await StoragePermission();
    if (!hasPermission)
        return false;

    let token = await Read(AccessPath);

    return token === GetNowToken();
}
   
const Unlock = async (token) =>
{
    let hasPermission = await StoragePermission();
    if (!hasPermission
    ||  token !== GetNowToken()
        )
        return false;
    
    return await Write(AccessPath, token);
}


const fakeDB =
{
    accessKeys:
        {'2019': "edf33509"
        ,'2020': "04f78750"
        }
};
const GetNowToken = () => fakeDB.accessKeys[new Date().getFullYear()];

export default
    {IsUnlocked
    ,Unlock
    };
