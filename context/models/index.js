import MachineModel from './MachineModel';
import SiteModel from './SiteModel';

export const Templates =
    {Machine: MachineModel
    ,Site: SiteModel
    }

export const Models = Object.keys(Templates).reduce((result, key) => { result[key] = key; return result; }, {});