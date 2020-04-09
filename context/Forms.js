import { createFetcher } from './CreateFetcher';
import { jsonHelper } from '../utils/jsonHelper';
import { Exists, Read, Write, Internal } from '../utils/Storage';

import Forms from './forms';

 const List = (onSuccess) =>
{
    return createFetcher( async () =>
            fakeDB
                .forms
                .map(form => ({ guid: form.guid, name: form.name, version: form.version }))
            )
            .read()
            .then((data) => onSuccess(data));
};

const Get = (guid, onSuccess) =>
{
    const request = createFetcher( async () =>
            fakeDB
                .forms
                .find(form => form.guid === guid)
            )
            .read();

    if (onSuccess)
        return request.then((data) => onSuccess(data));
    else
        return request;
};

const HasInstance = (guid, onSuccess) => Exists(Internal + guid + '.json').then(onSuccess);
const LoadInstance = (guid, onSuccess) => Read(Internal + guid + '.json').then(result => onSuccess(jsonHelper.parseJsonObject(JSON.parse(result))));
const SaveInstance = (guid, instance, onSuccess) => Write(Internal + guid + '.json', JSON.stringify(instance)).then(onSuccess);

const fakeDB = { forms: Forms };

export default
    {List
    ,Get

    ,HasInstance
    ,LoadInstance
    ,SaveInstance
    };