export const jsonHelper =
    {parseJsonObject
    };

const _jsonUTCDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{2,}Z?)?((\+|-)\d{2}:\d{2})?$/;

function parseJsonObject(object)
{
    if (object === null)
        return object;

    for (const key in object)
    {
        const value = object[key];

        if (typeof value === 'object' && value !== null)
            this.parseJsonObject(value);
        else if (value === "true")
            object[key] = true;
        else if (value === "false")
            object[key] = false;
        else if (_jsonUTCDateFormat.test(value))
            object[key] = new Date(value);
    }

    return object;
}