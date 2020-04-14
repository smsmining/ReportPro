export const jsonHelper =
    {parseJson
    ,parseJsonObject
    ,Clone
    };

const _jsonUTCDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{2,}Z?)?((\+|-)\d{2}:\d{2})?$/;
const _keyArrayFormat = /^\w+(\[\d+\])+$/;

function parseJsonObject(object)
{
    if (object === null)
        return object;

    for (const key in object)
    {
        const value = object[key];

        if (_keyArrayFormat.test(key))
        {
            const parts = key.split("[");

            object[parts[0]] = [];
            let target = object[parts[0]];
            for (let i = 1; i < parts.length - 1; i++)
            {
                const part = parseInt(parts[i]);

                target[part] = [];
                target = target[part];
            }

            const lastPart = parseInt(parts[parts.length - 1]);
            target[lastPart] = parseJsonObject(value);

            delete object[key];

            continue;
        }

        if (typeof value === 'object' && value !== null)
            parseJsonObject(value);
        else if (value === "true")
            object[key] = true;
        else if (value === "false")
            object[key] = false;
        else if (_jsonUTCDateFormat.test(value))
            object[key] = new Date(value);
    }

    return object;
}

function parseJson(string)
{
    return parseJsonObject(JSON.parse(string));
}

function Clone(object)
{
    return parseJsonObject(JSON.parse(JSON.stringify(object)));
}