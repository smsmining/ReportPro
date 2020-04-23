import { jsonHelper } from '../utils/jsonHelper';
import { Exists, Read, Write, Internal } from '../utils/Storage';

export const VERSION = '.v2';

const InstanceDir = (guid) => Internal + guid + VERSION;

let instance = {};

instance.Exists = async (guid) => await Exists(Internal + guid + VERSION + '.json');
instance.Read = async (guid) =>
{
    let data = await Read(Internal + guid + VERSION + '.json');
    return jsonHelper.parseJson(data);
}

instance.Write = async (guid, instance) => await Write(Internal + guid + VERSION + '.json', JSON.stringify(instance));

instance.WriteValue = async (guid, value, filename, format) => 
{
    const path = Internal + guid + '.' + filename;
    return await Write(path, value, format) && path;
}

export default Instance = instance;