import { ControlKeys } from "../../components/ControlItem";

export default SiteModel = [
    {
        param: 'site',
        type: ControlKeys.Spinner,
        label: 'Site',
        controls: [
            { label: 'Aquarius Gold', value: 'Aquarius Gold' },
            { label: 'Kirkalocka', value: 'Kirkalocka' },
            { label: 'Bald Hill', value: 'Bald Hill' },
            { label: 'Matts Dam South', value: 'Matts Dam South' },
            { label: 'GEKO', value: 'GEKO' },
            { label: 'Thunder Box', value: 'Thunder Box' },
            { label: 'Manual Input', value: '', manual: true },
        ]
    }
];