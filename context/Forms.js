import Data from './forms';

let forms = {};

forms.List = async () => Data.map(form => ({ guid: form.guid, name: form.name, version: form.version }));
forms.Get = async (guid) => Data.find(form => form.guid === guid);

export default Forms = forms;