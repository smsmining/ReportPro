import { ControlKeys } from "../../components/ControlItem";

export default MachineModel = [
    {
        param: 'machine_header',
        type: ControlKeys.Divider,
        label: 'Machine Details',
    },
    {
        param: 'machine_id',
        type: ControlKeys.Spinner,
        label: 'Machine ID',
        controls: [{ label: 'Manual Input', value: '', manual: true }],
        db: { table: 'machines' },
        required: true
    },
    {
        param: 'machine_make',
        type: ControlKeys.TextField,
        label: 'Make',
    },
    {
        param: 'machine_model',
        type: ControlKeys.TextField,
        label: 'Model',
    },
    {
        param: 'machine_sn',
        type: ControlKeys.TextField,
        label: 'Serial No.',
    },
    {
        param: 'machine_rego',
        type: ControlKeys.TextField,
        label: 'Rego No.',
    },
    {
        param: 'machine_smu',
        type: ControlKeys.TextField,
        label: 'SMU Reading',
    },
];