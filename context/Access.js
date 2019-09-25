import RNFetchBlob from 'rn-fetch-blob';

const getAccessPath = () => RNFetchBlob.fs.dirs.DCIMDir + '/Reports/access.token';

const IsUnlocked = async (onSuccess) =>
{
    let exists = await RNFetchBlob.fs
                        .exists(getAccessPath());

    if (!exists) onSuccess(false);

    let token = await RNFetchBlob.fs
                        .readFile(getAccessPath(), 'utf8');

    return onSuccess(token === GetNowToken());
}
   
const Unlock = (token, onSuccess) =>
{
    if (token != GetNowToken())
        return onSuccess(false);

    RNFetchBlob.fs
        .writeFile(getAccessPath(), token, 'utf8')
        .then(() => onSuccess(true));
}

const GetNowToken = () =>
{
    const now = new Date();
    return (fakeDB.accessKeys[now.getFullYear()] || [])[now.getMonth()];
}


const fakeDB =
{
    accessKeys:
    {'2019':
        ["dea43f02"
        ,"e80c0c0d"
        ,"f4a05553"
        ,"c0102ff4"
        ,"c1c102a7"
        ,"c457f220"
        ,"36e77f53"
        ,"de4d5884"
        ,"3917f203"
        ,"edf33509"
        ,"aff38d68"
        ,"c159830e"
        ]
    ,'2020':
        ["04f78750"
        ,"2215ae3c"
        ,"b85f7988"
        ,"318a05f9"
        ,"06c9f4f4"
        ,"edf71f68"
        ,"29a2fcf9"
        ,"1bcf223b"
        ,"e36a05fa"
        ,"c14505d5"
        ,"c368ab27"
        ,"c0f64302"
        ],
    }
};

export default
    {IsUnlocked
    ,Unlock
    };