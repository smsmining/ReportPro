import { ControlKeys } from "../../components/ControlItem";

export { ControlKeys } from "../../components/ControlItem";
export { Check, Alerts } from "../../components/RulesEngine";
export { Models } from "../models";
export const SiteSpinner =
{
    type: ControlKeys.Spinner,
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