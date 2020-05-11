import { jsonHelper } from '../utils/jsonHelper';
import { Read, Write, Internal, Scan, Remove, Rename, Zip } from '../utils/Storage';
import AppFlags from '../AppFlags';

export const VERSION = '/v2/';

const InstanceDir = (ins) => Internal + 'Instance/' + ins.guid + '/' + (ins.id ? ins.id.toString() : '0') + VERSION;
const INSTANCE_FILENAME = 'instance.json';
const VALUES_DIR = 'values/'

let instance = {};

instance.Exists = async (ins) =>
{
    const scanDir = Internal + 'Instance/' + ins.guid;

    const scan = await Scan(scanDir);
    if (!scan || !scan.length)
        return false;

    let id = 0;
    let others = [];
    for (let i = 0; i < scan.length; i++)
    {
        let pathid = parseInt(scan[i], 10);

        if (isNaN(pathid) || !pathid)
            continue;

        if (pathid < id)
        {
            others.push(pathid);
            continue;
        }

        if (id)
            others.push(id);

        id = pathid;
    }

    if (AppFlags.Instance.removeOldInstances && others.length)
        for (let i = 0; i < others.length; i++)
            Remove(scanDir + others[i]);

    if (id === 0)
        return false;
    return id;
}

instance.Read = async (ins) =>
{
    let data = await Read(InstanceDir(ins) + INSTANCE_FILENAME);
    return jsonHelper.parseJson(data);
}

instance.Write = async (ins, instance) =>
{
    if ('from' in ins)
        await Rename(InstanceDir({ guid: ins.guid, id: ins.from }), InstanceDir(ins));

    await Write(InstanceDir(ins) + INSTANCE_FILENAME, JSON.stringify(instance));
}

instance.Clear = async (ins) => Remove(InstanceDir(ins));

instance.WriteValue = async (ins, value, filename, format) => 
{
    const path = InstanceDir(ins) + VALUES_DIR + filename;
    return await Write(path, value, format) && path;
}

instance.ValuesExist = async (ins) =>
{
    const path = InstanceDir(ins) + VALUES_DIR;
    const scan = await Scan(path);
    return scan && path;
}

export default Instance = instance;