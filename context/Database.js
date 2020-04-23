import { Read, Write, Internal } from '../utils/Storage';
import { jsonHelper } from '../utils/jsonHelper';

const DATABASE_FILENAME = Internal + 'database.json';

let database = {};

database.Read = async () =>
{
    let data = await Read(DATABASE_FILENAME);
    return data && jsonHelper.parseJson(data);
}

database.Write = async (data) => Write(DATABASE_FILENAME, JSON.stringify(data));

export default Database = database;