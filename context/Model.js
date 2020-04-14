import { Templates } from './models';
import { jsonHelper } from '../utils/jsonHelper';

export default Model = (control) =>
{
    if (!Templates[control.model])
        throw 'No model defenition for ' + control.model;

    let result = jsonHelper.Clone(Templates[control.model]);
    if (control.controls)
        for (let [, child] of Object.entries(control.controls))
        {
            const index = result.findIndex(c => c.param === child.param);
            if (index === -1)
                continue;

            result[index] = { ...result[index], ...child };
        }

    return { ...control, controls: result };
}