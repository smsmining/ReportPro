import RNFetchBlob from 'rn-fetch-blob';

import { createFetcher } from './CreateFetcher';
import { ControlKeys } from '../components/ControlItem';
import { jsonHelper } from '../utils/jsonHelper';

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

const getInstancePath = (guid) => RNFetchBlob.fs.dirs.DCIMDir + '/Reports/' + guid + '/instance.json';

const HasInstance = (guid, onSuccess) =>
    RNFetchBlob.fs
        .exists(getInstancePath(guid))
        .then(onSuccess);

const LoadInstance = (guid, onSuccess) =>
    RNFetchBlob.fs
        .readFile(getInstancePath(guid), 'utf8')
        .then(result =>
            onSuccess(
                jsonHelper.parseJsonObject(JSON.parse(result))
            ));

const SaveInstance = (guid, instance, onSuccess) =>
    RNFetchBlob.fs
        .writeFile(getInstancePath(guid), JSON.stringify(instance), 'utf8')
        .then(onSuccess);


const SiteSpinnerControls = [
    { label: 'Aquarious Gold', value: 'Aquarious Gold' },
    { label: 'Kirkolocka', value: 'Kirkolocka' },
    { label: 'Bald Hill', value: 'Bald Hill' },
    { label: 'Matts Dam South', value: 'Matts Dam South' },
    { label: 'GEKO SMS', value: 'GEKO SMS' },
    { label: 'Thunder Box', value: 'Thunder Box' },
    { label: 'Manual Input', value: '', manual: true },
];

const fakeDB =
{
    forms:
        [
            {
                guid: "00000000-0000-0000-0000-000000000001",
                name: 'Workshop Inspection',
                pdfname: 'Workshop Inspection',
                version: '0.0.1',
                tabs: [
                    {
                        id: '1',
                        label: 'Details',
                        icon: 'edit',
                        type: ControlKeys.Tab,
                        controls: [
                            {
                                param: 'details_header',
                                type: ControlKeys.Divider,
                                label: 'Document Details'
                            },
                            {
                                param: 'details_minesite',
                                type: ControlKeys.Spinner,
                                label: 'Site',
                                controls: SiteSpinnerControls,
                                pdf: { 0: [{ x: 160, y: 760, width: 100, height: 15 }] },
                            },
                            {
                                param: 'details_date',
                                type: ControlKeys.Date,
                                label: 'Date',
                                pdf: { 0: [{ x: 320, y: 760, width: 70, height: 15 }] },
                            },
                            {
                                param: 'details_time',
                                type: ControlKeys.TextField,
                                label: 'Time',
                                pdf: { 0: [{ x: 450, y: 760, width: 100, height: 15 }] },
                            },
                            {
                                param: 'details_shift',
                                type: ControlKeys.Spinner,
                                label: 'Shift',
                                value: 'Day Shift',
                                controls: [
                                    { label: 'Day', value: 'Day Shift', pdf: { x: 476 }, renderValue: true },
                                    { label: 'Night', value: 'Night Shift', pdf: { x: 521 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 744 }] },
                                radio: true,
                            },
                            {
                                param: 'details_weather',
                                type: ControlKeys.TextField,
                                label: 'Weather',
                                pdf: { 0: [{ x: 160, y: 742, width: 230, height: 15 }] },
                            },
                        ],
                    },
                    {
                        id: '2',
                        label: 'Checklist',
                        icon: 'check-square-o',
                        type: ControlKeys.Tab,
                        controls: [
                            {
                                param: "checklist_divider",
                                type: ControlKeys.Divider,
                                label: 'Checklist',
                            },
                            {
                                param: 'checklist',
                                type: ControlKeys.Looper,
                                setLength: 24,
                                value:
                                    [{ 'checklist_name': 'Are fire extinguishers accessible and clear to remove?' }
                                        , { 'checklist_name': 'Are fire extinguishers in serviceable condition?' }
                                        , { 'checklist_name': 'Is all signage clean and visible?' }
                                        , { 'checklist_name': 'Are all oxy-acetylene bottles stored in an upright position and secured?' }
                                        , { 'checklist_name': 'Are all oxy-acetylene hoses in good condition?' }
                                        , { 'checklist_name': 'Are flashback arrestors fitted to all oxy and acetylene kits?' }
                                        , { 'checklist_name': 'Is gas storage secure and stored as per racking requirements?' }
                                        , { 'checklist_name': 'Are all workshop tools in a safe and serviceable condition?' }
                                        , { 'checklist_name': 'Are dangerous goods stored in appropriate cupboards?' }
                                        , { 'checklist_name': 'Lighting is operational and suitable?' }
                                        , { 'checklist_name': 'Are spill kits in place with correct quantities of spill response equipment and locked?' }
                                        , { 'checklist_name': 'Are spill response kits free from rubbish e.g. oily rags cardboard material?' }
                                        , { 'checklist_name': 'Are work benches tidy and free of clutter?' }
                                        , { 'checklist_name': 'All storage pods are stored in appropriate bunded areas?' }
                                        , { 'checklist_name': 'Is there any evidence of oil spillage in the work area?' }
                                        , { 'checklist_name': 'Is the workshop floor clean and clear of trip hazards including rubbish?' }
                                        , { 'checklist_name': 'Are emergency eyewash / shower(s) tested and is access unobstructed?' }
                                        , { 'checklist_name': 'Are all hoses wound up and stored correctly?' }
                                        , { 'checklist_name': 'Are the storage containers clean and clear of trip hazards?' }
                                        , { 'checklist_name': 'Are machine guards in place and fitted with an E-Stop e.g. pedestal grinder(s)?' }
                                        , { 'checklist_name': 'Are Safety Data Sheets (SDS) available and in date?' }
                                        , { 'checklist_name': 'Is the overall condition of the workshop areas satisfactory?' }
                                        , { 'checklist_name': 'Is PPE available in all areas needed?' }
                                    ],
                                pdf: { 0: [{ x: 449, y: 263, width: 107, height: 459 }] },
                                grid: { 0: [{ width: 100, height: 20 }] },
                                controls:
                                    [{
                                        param: 'checklist_name',
                                        type: ControlKeys.TextLabel,
                                        label: 'Inspection',
                                    },
                                    {
                                        param: 'checklist_selector',
                                        type: ControlKeys.Spinner,
                                        label: 'safety condition',
                                        controls: [
                                            {label: 'Safe', value: 'Safe', pdf: { x: 14 }, renderValue: true },
                                            {label: 'At Risk', value: 'At Risk', pdf: { x: 49 }, renderValue: true },
                                            {label: 'N/A', value: 'N/A', pdf: { x: 85 }, renderValue: true },
                                        ],
                                        pdf: { 0: [{ y: 6 }] },
                                        radio: true,
                                    },
                                    ]
                            },
                            {
                                param: 'checklist_oiltank_name',
                                type: ControlKeys.TextLabel,
                                label: 'Inspection',
                                value: 'Check Waste Oil Tank Level?',
                            },
                            {
                                param: 'checklist_oiltank_litres',
                                type: ControlKeys.TextField,
                                label: 'Litres',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 248, width: 80, height: 15 }] },
                            },
                            {
                                param: 'checklist_oiltank_selector',
                                type: ControlKeys.Spinner,
                                label: 'safety condition',
                                controls: [
                                    { label: 'Safe', value: 'Safe', pdf: { x: 463 }, renderValue: true },
                                    { label: 'At Risk', value: 'At Risk', pdf: { x: 498 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 534 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 249, width: 100, height: 15 }] },
                                radio: true,
                            },
                        ],
                    },
                    {
                        id: '3',
                        label: 'Signoff',
                        icon: 'user-o',
                        type: ControlKeys.Tab,
                        controls: [
                            {
                                param: 'signoff_header',
                                type: ControlKeys.Divider,
                                label: 'Action Items',
                            },
                            {
                                param: 'signoff_comments',
                                type: ControlKeys.TextArea,
                                label: 'Comments',
                                pdf: { 0: [{ x: 60, y: 185, width: 490, height: 35 }] },
                            },
                            {
                                param: 'signoff_actions_disclaimer',
                                type: ControlKeys.TextLabel,
                                value: 'Identified non-conformances shall be entered in the site action register (Mango)',
                            },
                            {
                                param: 'signoff_actions',
                                type: ControlKeys.TextArea,
                                label: 'Actions',
                                pdf: { 0: [{ x: 60, y: 125, width: 490, height: 25 }] },
                            },
                            {
                                param: 'signoff_inspected',
                                type: ControlKeys.Divider,
                                label: 'Inspected By',
                            },
                            {
                                param: 'signoff_inspected_name',
                                type: ControlKeys.TextField,
                                label: 'Name',
                                pdf: { 0: [{ x: 155, y: 94, width: 160, height: 15 }] },
                            },
                            {
                                param: 'signoff_inspected_sig',
                                type: ControlKeys.ImageSelect,
                                label: 'Signature',
                                pdf: { 0: [{ x: 415, y: 92, width: 100, height: 15 }] },
                            },
                            {
                                param: 'signoff_supervisor',
                                type: ControlKeys.Divider,
                                label: 'Supervisor',
                            },
                            {
                                param: 'signoff_supervisor_name',
                                type: ControlKeys.TextField,
                                label: 'Name',
                                pdf: { 0: [{ x: 155, y: 77, width: 160, height: 15 }] },
                            },
                            {
                                param: 'signoff_supervisor_sig',
                                type: ControlKeys.ImageSelect,
                                label: 'Signature',
                                pdf: { 0: [{ x: 415, y: 75, width: 100, height: 15 }] },
                            },
                        ],
                    },
                ],
            },
            {
                guid: "00000000-0000-0000-0000-000000000002",
                name: 'Safe Act Observation - Mining',
                pdfname: 'SMS-SAF-FRM-0013_03 Safe Act Observation - Mining Report',
                version: 'SMS-SAF-FRM-0013_03',
                tabs: [
                    {
                        id: '1',
                        type: ControlKeys.Tab,
                        label: 'Details',
                        icon: 'edit',
                        controls: [
                            {
                                param: 'details_header',
                                type: ControlKeys.Divider,
                                label: 'Report Details',
                            },
                            {
                                param: 'task',
                                type: ControlKeys.TextField,
                                label: 'Task',
                                pdf: { 0: [{ x: 70, y: 765, size: 16 }] },
                            },
                            {
                                param: 'location',
                                type: ControlKeys.Spinner,
                                label: 'Location',
                                controls: SiteSpinnerControls,
                                pdf: { 0: [{ x: 300, y: 765, size: 16 }] },
                            },
                            {
                                param: 'observer',
                                type: ControlKeys.TextField,
                                label: 'Observer',
                                pdf: { 0: [{ x: 505, y: 765, size: 16 }] },
                            },
                            {
                                param: 'date',
                                type: ControlKeys.Date,
                                label: 'Date',
                                pdf: { 0: [{ x: 68, y: 745, size: 13 }] },
                            },
                            {
                                param: 'time',
                                type: ControlKeys.TextField,
                                label: 'Time',
                                pdf: { 0: [{ x: 68, y: 735, size: 14 }] },
                            },
                        ],
                    },
                    {
                        id: '2',
                        type: ControlKeys.Tab,
                        label: 'Checklist',
                        icon: 'check-square-o',
                        controls: [
                            {
                                param: 'risk_assessment_header',
                                type: ControlKeys.Divider,
                                label: 'Risk Assessments',
                            },
                            {
                                param: 'risk_assessment_checklist',
                                type: ControlKeys.Looper,
                                setLength: 2,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 715, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 10 }] },
                                value: [{ 'risk_assessment_action': 'JHA Completed and Being Followed' }
                                    , { 'risk_assessment_action': 'Take 5 Completed and Being Followed' }
                                ],
                                controls: [
                                    {
                                        param: 'risk_assessment_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'risk_assessment_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'risk_assessment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'risk_assessment_sampled',
                                type: ControlKeys.TextField,
                                label: 'Risk Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 697, height: 30, width: 38 }] },
                            },
                            {
                                param: 'risk_assessment_compliant',
                                type: ControlKeys.TextField,
                                label: 'Risk Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 697, height: 30, width: 38 }] },
                            },
                            {
                                param: 'risk_assessment_comments',
                                type: ControlKeys.TextField,
                                label: 'Risk Comments',
                                pdf: { 0: [{ x: 415, y: 697, height: 30, width: 165 }] },
                            },
                            {
                                param: 'risk_assessment_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'compliance_to_procedures_header',
                                type: ControlKeys.Divider,
                                label: 'Compliance to Procedures',
                            },
                            {
                                param: 'compliance_to_procedures_checklist',
                                type: ControlKeys.Looper,
                                setLength: 2,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 675, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 10 }] },
                                value: [{ 'compliance_to_procedures_action': 'Work Area Suitable / Inspected' }
                                    , { 'compliance_to_procedures_action': 'Hazards Identified' }
                                ],
                                controls: [
                                    {
                                        param: 'compliance_to_procedures_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'compliance_to_procedures_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'compliance_to_procedures_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'compliance_to_procedures_sampled',
                                type: ControlKeys.TextField,
                                label: 'Compliance Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 644, height: 46, width: 38 }] },
                            },
                            {
                                param: 'compliance_to_procedures_compliant',
                                type: ControlKeys.TextField,
                                label: 'Compliance Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 644, height: 46, width: 38 }] },
                            },
                            {
                                param: 'compliance_to_procedures_comments',
                                type: ControlKeys.TextField,
                                label: 'Compliance Comments',
                                pdf: { 0: [{ x: 415, y: 644, height: 46, width: 165 }] },
                            },
                            {
                                param: 'compliance_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'Operator_divider',
                                type: ControlKeys.Divider,
                                label: 'Operator',
                            },
                            {
                                param: 'operator_checklist',
                                type: ControlKeys.Looper,
                                setLength: 8,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 625, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                                value: [
                                    { 'operator_action': 'Employees VOC Trained' }
                                    , { 'operator_action': 'Seat Belt Operational' }
                                    , { 'operator_action': 'Load Sheet Completed Correctly' }
                                    , { 'operator_action': 'Activity log sheet completed' }
                                    , { 'operator_action': 'General operating skills' }
                                    , { 'operator_action': 'Housekeeping in cab' }
                                    , { 'operator_action': 'Obey traffic signage' }
                                    , { 'operator_action': 'Correct/Positive Radio Communication' }
                                ],
                                controls: [
                                    {
                                        param: 'operator_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'operator_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'operator_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'operator_sampled',
                                type: ControlKeys.TextField,
                                label: 'Operator Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 535, height: 102, width: 38 }] },
                            },
                            {
                                param: 'operator_compliant',
                                type: ControlKeys.TextField,
                                label: 'Operator Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 535, height: 102, width: 38 }] },
                            },
                            {
                                param: 'operator_comments',
                                type: ControlKeys.TextField,
                                label: 'Operator Comments',
                                pdf: { 0: [{ x: 415, y: 535, height: 102, width: 165 }] },
                            },
                            {
                                param: 'operator_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'traffic_management_header',
                                type: ControlKeys.Divider,
                                label: 'Traffic Management',
                            },
                            {
                                param: 'traffic_management_checklist',
                                type: ControlKeys.Looper,
                                setLength: 6,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 515, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                                value: [
                                    { 'traffic_management_action': 'Install and Cleaning Delineation' }
                                    , { 'traffic_management_action': 'Install and Cleaning Traffic Signs' }
                                    , { 'traffic_management_action': 'Correct Posture' }
                                    , { 'traffic_management_action': 'Correct Lifting Technique' }
                                    , { 'traffic_management_action': 'Intersection Compliance' }
                                    , { 'traffic_management_action': 'Follow 50/20 Rule' }
                                ],
                                controls: [
                                    {
                                        param: 'traffic_management_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'traffic_management_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'traffic_management_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'traffic_management_sampled',
                                type: ControlKeys.TextField,
                                label: 'Traffic Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 443, height: 84, width: 38 }] },
                            },
                            {
                                param: 'traffic_management_compliant',
                                type: ControlKeys.TextField,
                                label: 'Traffic Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 443, height: 84, width: 38 }] },
                            },
                            {
                                param: 'traffic_management_comments',
                                type: ControlKeys.TextField,
                                label: 'Traffic Comments',
                                pdf: { 0: [{ x: 415, y: 443, height: 84, width: 165 }] },
                            },
                            {
                                param: 'traffic_management_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'mobile_equipment_divider',
                                type: ControlKeys.Divider,
                                label: 'Mobile Equipment (FRPP)',
                            },
                            {
                                param: 'mobile_equipment_checklist',
                                type: ControlKeys.Looper,
                                setLength: 7,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 420, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                                value: [
                                    { 'mobile_equipment_action': 'Equipment Prestart Completed' }
                                    , { 'mobile_equipment_action': 'Seat Belts Worn' }
                                    , { 'mobile_equipment_action': 'Barricades in Place (if applicable)' }
                                    , { 'mobile_equipment_action': 'Driving to Conditions' }
                                    , { 'mobile_equipment_action': 'Use of Horn signalling' }
                                    , { 'mobile_equipment_action': 'Correctly Parked/Grounded' }
                                    , { 'mobile_equipment_action': 'Spotter in Place' }
                                ],
                                controls: [
                                    {
                                        param: 'mobile_equipment_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'mobile_equipment_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'mobile_equipment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'mobile_equipment_sampled',
                                type: ControlKeys.TextField,
                                label: 'Mobile Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 347, height: 85, width: 38 }] },
                            },
                            {
                                param: 'mobile_equipment_compliant',
                                type: ControlKeys.TextField,
                                label: 'Mobile Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 347, height: 85, width: 38 }] },
                            },
                            {
                                param: 'mobile_equipment_comments',
                                type: ControlKeys.TextField,
                                label: 'Mobile Comments',
                                pdf: { 0: [{ x: 415, y: 347, height: 85, width: 165 }] },
                            },
                            {
                                param: 'mobile_equipment_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'prestart_equipment_divider',
                                type: ControlKeys.Divider,
                                label: 'Prestart Equipment',
                            },
                            {
                                param: 'prestart_equipment_checklist',
                                type: ControlKeys.Looper,
                                setLength: 3,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 320, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 8 }] },
                                value: [
                                    { 'prestart_equipment_action': 'Positive Isolation' }
                                    , { 'prestart_equipment_action': 'SOP Followed' }
                                    , { 'prestart_equipment_action': 'Equipment Wheels Chocked or Parked in Go Line' }
                                ],
                                controls: [
                                    {
                                        param: 'prestart_equipment_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'prestart_equipment_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'prestart_equipment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'prestart_equipment_sampled',
                                type: ControlKeys.TextField,
                                label: 'Prestart Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 278, height: 54, width: 38 }] },
                            },
                            {
                                param: 'prestart_equipment_compliant',
                                type: ControlKeys.TextField,
                                label: 'Prestart Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 278, height: 54, width: 38 }] },
                            },
                            {
                                param: 'prestart_equipment_comments',
                                type: ControlKeys.TextField,
                                label: 'Prestart Comments',
                                pdf: { 0: [{ x: 415, y: 278, height: 54, width: 165 }] },
                            },
                            {
                                param: 'prestart_equipment_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'PPE_divider',
                                type: ControlKeys.Divider,
                                label: 'PPE',
                            },
                            {
                                param: 'PPE_checklist',
                                type: ControlKeys.Looper,
                                setLength: 5,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 257, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                                value: [
                                    { 'PPE_action': 'Eye Protection' }
                                    , { 'PPE_action': 'Hearing Protection' }
                                    , { 'PPE_action': 'Hand Protection' }
                                    , { 'PPE_action': 'Hard Hats' }
                                    , { 'PPE_action': 'Steel Cap Boots (laced and secured to the top)' }
                                ],
                                controls: [
                                    {
                                        param: 'PPE_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'ppe_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'PPE_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'PPE_sampled',
                                type: ControlKeys.TextField,
                                label: 'PPE Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 195, height: 74, width: 38 }] },
                            },
                            {
                                param: 'PPE_compliant',
                                type: ControlKeys.TextField,
                                label: 'PPE Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 195, height: 74, width: 38 }] },
                            },
                            {
                                param: 'PPE_comments',
                                type: ControlKeys.TextField,
                                label: 'PPE Comments',
                                pdf: { 0: [{ x: 415, y: 195, height: 74, width: 165 }] },
                            },
                            {
                                param: 'ppe_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'environmental_divider',
                                type: ControlKeys.Divider,
                                label: 'Environmental',
                            },
                            {
                                param: 'environmental_checklist',
                                type: ControlKeys.Looper,
                                setLength: 3,
                                pdf: { 0: [{ x: 28, y: 0, width: 555, height: 170, vertical: true }] },
                                grid: { 0: [{ width: 530, height: 5, margin: 8 }] },
                                value: [
                                    { 'environmental_action': 'Oil Leaks Spillage' }
                                    , { 'environmental_action': 'Dust' }
                                    , { 'environmental_action': 'Required Permit in Place' }
                                ],
                                controls: [
                                    {
                                        param: 'environmental_divider',
                                        type: ControlKeys.Divider,
                                    },
                                    {
                                        param: 'environmental_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'environmental_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 0, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'environmental_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'environmental_sampled',
                                type: ControlKeys.TextField,
                                label: 'Environmental Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 142, height: 40, width: 38 }] },
                            },
                            {
                                param: 'environmental_compliant',
                                type: ControlKeys.TextField,
                                label: 'Environmental Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 364, y: 142, height: 40, width: 38 }] },
                            },
                            {
                                param: 'environmental_comments',
                                type: ControlKeys.TextField,
                                label: 'Environmental Comments',
                                pdf: { 0: [{ x: 415, y: 142, height: 40, width: 165 }] },
                            },
                            {
                                param: 'environmental_spacer',
                                type: ControlKeys.Divider,
                            },
                            {
                                param: 'total_divider',
                                type: ControlKeys.Divider,
                                label: 'Total',
                            },
                            {
                                param: 'total_Compliant_yes',
                                type: ControlKeys.CheckBox,
                                label: 'Compliant',
                                pdf: { 0: [{ x: 320, y: 119, size: 10 }] },
                            },
                            {
                                param: 'total_Compliant_no',
                                type: ControlKeys.CheckBox,
                                label: 'Non-Compliant',
                                pdf: { 0: [{ x: 375, y: 123, size: 10 }] },
                            },
                            {
                                param: 'total_comments',
                                type: ControlKeys.TextField,
                                label: 'Comments',
                                pdf: { 0: [{ x: 422, y: 122, size: 10 }] },
                            },
                        ],
                    },
                    {
                        id: '3',
                        type: ControlKeys.Tab,
                        label: 'Issues',
                        icon: 'camera',
                        controls: [
                            {
                                param: 'attachment_page',
                                type: ControlKeys.Looper,
                                label: '+ Add Page',
                                pdf: { 'A0[{}]': [{ x: 32, y: 125, width: 532, height: 650 }] },
                                grid: { 'A0[{}]': [{ width: 532, height: 650 }] },
                                controls: [
                                    {
                                        param: 'attachment_page_header',
                                        type: ControlKeys.Divider,
                                        label: 'Page {}'
                                    },
                                    {
                                        param: 'attachment_looper',
                                        type: ControlKeys.Looper,
                                        label: '+ Add Attachment',
                                        minLength: 1,
                                        maxLength: 6,
                                        pdf: { 0: [{ x: 0, y: 0, width: 532, height: 650 }] },
                                        grid: { 0: [{ width: 260, height: 208, margin: 6 }] },
                                        controls: [
                                            {
                                                param: 'attachment_header',
                                                type: ControlKeys.Divider,
                                                label: 'Attachment {}'
                                            },
                                            {
                                                param: 'attachment_attachment_image',
                                                type: ControlKeys.ImageSelect,
                                                label: 'Image',
                                                pdf: { 0: [{ x: 0, y: 88, width: 260, height: 120 }] },
                                            },
                                            {
                                                param: 'inspection_attachment_comments',
                                                type: ControlKeys.TextArea,
                                                label: 'Comments',
                                                pdf: { 0: [{ x: 0, y: 0, width: 260, height: 85, size: 12 }] },
                                            },
                                        ]
                                    },
                                    {
                                        param: 'inspection_page_footer',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                guid: "00000000-0000-0000-0000-000000000003",
                name: 'Safe Act Observation - General',
                pdfname: 'SMS-SAF-FRM-0014_02 Safe Act Observation - General',
                version: 'SMS-SAF-FRM-0014_02',
                tabs: [
                    {
                        id: '1',
                        type: ControlKeys.Tab,
                        label: 'Details',
                        icon: 'edit',
                        controls: [
                            {
                                param: 'details_header',
                                type: ControlKeys.Divider,
                                label: 'Report Details',
                            },
                            {
                                param: 'task',
                                type: ControlKeys.TextField,
                                label: 'Task',
                                pdf: { 0: [{ x: 70, y: 765, size: 14 }] },
                            },
                            {
                                param: 'location',
                                type: ControlKeys.Spinner,
                                label: 'Location',
                                controls: SiteSpinnerControls,
                                pdf: { 0: [{ x: 300, y: 765, size: 14 }] },
                            },
                            {
                                param: 'observer',
                                type: ControlKeys.TextField,
                                label: 'Observer',
                                pdf: { 0: [{ x: 505, y: 765, size: 14 }] },
                            },
                            {
                                param: 'date',
                                type: ControlKeys.Date,
                                label: 'Date',
                                pdf: { 0: [{ x: 68, y: 748, size: 8 }] },
                            },
                            {
                                param: 'time',
                                type: ControlKeys.TextField,
                                label: 'Time',
                                pdf: { 0: [{ x: 68, y: 739, size: 8 }] },
                            },
                        ],
                    },
                    {
                        id: '2',
                        type: ControlKeys.Tab,
                        label: 'Checklist',
                        icon: 'check-square-o',
                        controls: [
                            {
                                param: 'risk_assessment_header',
                                type: ControlKeys.Divider,
                                label: 'Risk Assessments',
                            },
                            {
                                param: 'risk_assessment_checklist',
                                type: ControlKeys.Looper,
                                setLength: 2,
                                pdf: { 0: [{ x: 242, y: 705, width: 339, height: 22 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'risk_assessment_action': 'JHA Completed and Being Followed' }
                                       ,{ 'risk_assessment_action': 'Take 5 Completed and Being Followed' }
                                       ],
                                controls: [
                                    {
                                        param: 'risk_assessment_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'risk_assessment_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'risk_assessment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'risk_assessment_sampled',
                                type: ControlKeys.TextField,
                                label: 'Risk Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 708, width: 43, height: 21 }] },
                            },
                            {
                                param: 'risk_assessment_compliant',
                                type: ControlKeys.TextField,
                                label: 'Risk Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 708, width: 43, height: 21 }] },
                            },
                            {
                                param: 'risk_assessment_comments',
                                type: ControlKeys.TextField,
                                label: 'Risk Comments',
                                pdf: { 0: [{ x: 415, y: 708, width: 163, height: 21 }] },
                            },
                            {
                                param: 'risk_assessment_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'compliance_to_procedures_header',
                                type: ControlKeys.Divider,
                                label: 'Compliance to Procedures',
                            },
                            {
                                param: 'compliance_to_procedures_checklist',
                                type: ControlKeys.Looper,
                                setLength: 3,
                                pdf: { 0: [{ x: 242, y: 662.5, width: 339, height: 32.5 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'compliance_to_procedures_action': 'Work Area Suitable / Inspected' }
                                       ,{ 'compliance_to_procedures_action': 'Hazards Identified' }
                                       ,{ 'compliance_to_procedures_action': 'Permits in Place' }
                                       ],
                                controls: [
                                    {
                                        param: 'compliance_to_procedures_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'compliance_to_procedures_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'compliance_to_procedures_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'compliance_to_procedures_sampled',
                                type: ControlKeys.TextField,
                                label: 'Compliance Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 665.5, width: 43, height: 32 }] },
                            },
                            {
                                param: 'compliance_to_procedures_compliant',
                                type: ControlKeys.TextField,
                                label: 'Compliance Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 665.5, width: 43, height: 32 }] },
                            },
                            {
                                param: 'compliance_to_procedures_comments',
                                type: ControlKeys.TextField,
                                label: 'Compliance Comments',
                                pdf: { 0: [{ x: 415, y: 665.5, width: 163, height: 32 }] },
                            },
                            {
                                param: 'compliance_to_procedures_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'working_at_heights_divider',
                                type: ControlKeys.Divider,
                                label: 'Working at Heights (FRPP)',
                            },
                            {
                                param: 'working_at_heights_checklist',
                                type: ControlKeys.Looper,
                                setLength: 5,
                                pdf: { 0: [{ x: 242, y: 598.5, width: 339, height: 53.5 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'working_at_heights_action': 'Employees Trained' }
                                       ,{ 'working_at_heights_action': 'Fall Prevention Barriers in Place' }
                                       ,{ 'working_at_heights_action': 'Certified and Fit for Purpose platforms in use' }
                                       ,{ 'working_at_heights_action': 'Permits in Place' }
                                       ,{ 'working_at_heights_action': 'Fall Restraints / Arrest in use and in date' }
                                       ],
                                controls: [
                                    {
                                        param: 'working_at_heights_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'working_at_heights_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'working_at_heights_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'working_at_heights_sampled',
                                type: ControlKeys.TextField,
                                label: 'W@H Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 601.5, width: 43, height: 53 }] },
                            },
                            {
                                param: 'working_at_heights_compliant',
                                type: ControlKeys.TextField,
                                label: 'W@H Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 601.5, width: 43, height: 53 }] },
                            },
                            {
                                param: 'working_at_heights_comments',
                                type: ControlKeys.TextField,
                                label: 'W@H Comments',
                                pdf: { 0: [{ x: 415, y: 601.5, width: 163, height: 53 }] },
                            },
                            {
                                param: 'working_at_heights_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'confined_space_header',
                                type: ControlKeys.Divider,
                                label: 'Confined Space (FRPP)',
                            },
                            {
                                param: 'confined_space_checklist',
                                type: ControlKeys.Looper,
                                setLength: 3,
                                pdf: { 0: [{ x: 242, y: 557, width: 339, height: 32.5 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'confined_space_action': 'Employees Trained' }
                                       ,{ 'confined_space_action': 'Atmospheric testing' }
                                       ,{ 'confined_space_action': 'Sentry' }
                                       ],
                                controls: [
                                    {
                                        param: 'confined_space_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'confined_space_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'confined_space_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'confined_space_sampled',
                                type: ControlKeys.TextField,
                                label: 'Confined Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 560, width: 43, height: 32 }] },
                            },
                            {
                                param: 'confined_space_compliant',
                                type: ControlKeys.TextField,
                                label: 'Confined Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 560, width: 43, height: 32 }] },
                            },
                            {
                                param: 'confined_space_comments',
                                type: ControlKeys.TextField,
                                label: 'Confined Comments',
                                pdf: { 0: [{ x: 415, y: 560, width: 163, height: 32 }] },
                            },
                            {
                                param: 'confined_space_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'isolation_divider',
                                type: ControlKeys.Divider,
                                label: 'Isolation (FRPP)',
                            },
                            {
                                param: 'isolation_checklist',
                                type: ControlKeys.Looper,
                                setLength: 4,
                                pdf: { 0: [{ x: 242, y: 504.5, width: 339, height: 43 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'isolation_action': 'Positive Isolation' }
                                       ,{ 'isolation_action': 'Tags and Locks Attached' }
                                       ,{ 'isolation_action': 'Stored Energy Released' }
                                       ,{ 'isolation_action': 'Equipment Secured against Movement' }
                                       ],
                                controls: [
                                    {
                                        param: 'isolation_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'isolation_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'isolation_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'isolation_sampled',
                                type: ControlKeys.TextField,
                                label: 'Isolation Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 507.5, width: 43, height: 42 }] },
                            },
                            {
                                param: 'isolation_compliant',
                                type: ControlKeys.TextField,
                                label: 'Isolation Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 507.5, width: 43, height: 42 }] },
                            },
                            {
                                param: 'isolation_comments',
                                type: ControlKeys.TextField,
                                label: 'Isolation Comments',
                                pdf: { 0: [{ x: 415, y: 507.5, width: 163, height: 42 }] },
                            },
                            {
                                param: 'isolation_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'mobile_equipment_divider',
                                type: ControlKeys.Divider,
                                label: 'Mobile Equipment (FRPP)',
                            },
                            {
                                param: 'mobile_equipment_checklist',
                                type: ControlKeys.Looper,
                                setLength: 5,
                                pdf: { 0: [{ x: 242, y: 441, width: 339, height: 53.5 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'mobile_equipment_action': 'VoC completed' }
                                       ,{ 'mobile_equipment_action': 'Seat Belts Worn' }
                                       ,{ 'mobile_equipment_action': 'Barricades in Place (If Applicable)' }
                                       ,{ 'mobile_equipment_action': 'Driving to Conditions' }
                                       ,{ 'mobile_equipment_action': 'Use of Horns' }
                                       ],
                                controls: [
                                    {
                                        param: 'mobile_equipment_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'mobile_equipment_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'mobile_equipment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'mobile_equipment_sampled',
                                type: ControlKeys.TextField,
                                label: 'Mobile Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 444, width: 43, height: 53 }] },
                            },
                            {
                                param: 'mobile_equipment_compliant',
                                type: ControlKeys.TextField,
                                label: 'Mobile Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 444, width: 43, height: 53 }] },
                            },
                            {
                                param: 'mobile_equipment_comments',
                                type: ControlKeys.TextField,
                                label: 'Mobile Comments',
                                pdf: { 0: [{ x: 415, y: 444, width: 163, height: 53 }] },
                            },
                            {
                                param: 'mobile_equipment_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'electrical_equipment_divider',
                                type: ControlKeys.Divider,
                                label: 'Electrical Equipment (FRPP)',
                            },
                            {
                                param: 'electrical_equipment_checklist',
                                type: ControlKeys.Looper,
                                setLength: 2,
                                pdf: { 0: [{ x: 242, y: 410, width: 339, height: 22 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'electrical_equipment_action': 'Correct color test tag' }
                                       ,{ 'electrical_equipment_action': 'Electrical Equipment protected from Damage' }
                                       ],
                                controls: [
                                    {
                                        param: 'electrical_equipment_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'electrical_equipment_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'electrical_equipment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'electrical_equipment_sampled',
                                type: ControlKeys.TextField,
                                label: 'Electrical Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 413, width: 43, height: 21 }] },
                            },
                            {
                                param: 'electrical_equipment_compliant',
                                type: ControlKeys.TextField,
                                label: 'Electrical Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 413, width: 43, height: 21 }] },
                            },
                            {
                                param: 'electrical_equipment_comments',
                                type: ControlKeys.TextField,
                                label: 'Electrical Comments',
                                pdf: { 0: [{ x: 415, y: 413, width: 163, height: 21 }] },
                            },
                            {
                                param: 'electrical_equipment_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'lifting_divider',
                                type: ControlKeys.Divider,
                                label: 'Lifting',
                            },
                            {
                                param: 'lifting_checklist',
                                type: ControlKeys.Looper,
                                setLength: 4,
                                pdf: { 0: [{ x: 242, y: 357, width: 339, height: 43 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'lifting_action': 'Employees Trained' }
                                       ,{ 'lifting_action': 'Lifting Plan in Place' }
                                       ,{ 'lifting_action': 'Area Barricaded' }
                                       ,{ 'lifting_action': 'Lifting Slings - Chains in Date' }
                                       ],
                                controls: [
                                    {
                                        param: 'lifting_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'lifting_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'lifting_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'lifting_sampled',
                                type: ControlKeys.TextField,
                                label: 'Electrical Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 360, width: 43, height: 42 }] },
                            },
                            {
                                param: 'lifting_compliant',
                                type: ControlKeys.TextField,
                                label: 'Electrical Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 360, width: 43, height: 42 }] },
                            },
                            {
                                param: 'lifting_comments',
                                type: ControlKeys.TextField,
                                label: 'Electrical Comments',
                                pdf: { 0: [{ x: 415, y: 360, width: 163, height: 42 }] },
                            },
                            {
                                param: 'lifting_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'manual_handling_divider',
                                type: ControlKeys.Divider,
                                label: 'Manual Handling',
                            },
                            {
                                param: 'manual_handling_checklist',
                                type: ControlKeys.Looper,
                                setLength: 2,
                                pdf: { 0: [{ x: 242, y: 325.3, width: 339, height: 22 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'manual_handling_action': 'Correct Posture' }
                                       ,{ 'manual_handling_action': 'Correct Lifting Techniques' }
                                       ],
                                controls: [
                                    {
                                        param: 'manual_handling_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'manual_handling_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'manual_handling_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'manual_handling_sampled',
                                type: ControlKeys.TextField,
                                label: 'Manual Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 328.3, width: 43, height: 21 }] },
                            },
                            {
                                param: 'manual_handling_compliant',
                                type: ControlKeys.TextField,
                                label: 'Manual Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 328.3, width: 43, height: 21 }] },
                            },
                            {
                                param: 'manual_handling_comments',
                                type: ControlKeys.TextField,
                                label: 'Manual Comments',
                                pdf: { 0: [{ x: 415, y: 328.3, width: 163, height: 21 }] },
                            },
                            {
                                param: 'manual_handling_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'tooling_divider',
                                type: ControlKeys.Divider,
                                label: 'Tooling',
                            },
                            {
                                param: 'tooling_checklist',
                                type: ControlKeys.Looper,
                                setLength: 2,
                                pdf: { 0: [{ x: 242, y: 293.8, width: 339, height: 22 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'tooling_action': 'Correct Tooling for the Job' }
                                       ,{ 'tooling_action': 'Tooling in Good Condition' }
                                       ],
                                controls: [
                                    {
                                        param: 'tooling_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'tooling_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'tooling_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'tooling_sampled',
                                type: ControlKeys.TextField,
                                label: 'Tooling Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 296.8, width: 43, height: 21 }] },
                            },
                            {
                                param: 'tooling_compliant',
                                type: ControlKeys.TextField,
                                label: 'Tooling Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 296.8, width: 43, height: 21 }] },
                            },
                            {
                                param: 'tooling_comments',
                                type: ControlKeys.TextField,
                                label: 'Tooling Comments',
                                pdf: { 0: [{ x: 415, y: 296.8, width: 163, height: 21 }] },
                            },
                            {
                                param: 'tooling_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'housekeeping_divider',
                                type: ControlKeys.Divider,
                                label: 'Housekeeping',
                            },
                            {
                                param: 'housekeeping_checklist',
                                type: ControlKeys.Looper,
                                setLength: 2,
                                pdf: { 0: [{ x: 242, y: 261.8, width: 339, height: 22 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'housekeeping_action': 'Area clean with Approperiate Barricade' }
                                       ,{ 'housekeeping_action': 'Trips / Slips Hazards' }
                                       ],
                                controls: [
                                    {
                                        param: 'housekeeping_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'housekeeping_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'housekeeping_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'housekeeping_sampled',
                                type: ControlKeys.TextField,
                                label: 'Housekeeping Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 264.8, width: 43, height: 21 }] },
                            },
                            {
                                param: 'housekeeping_compliant',
                                type: ControlKeys.TextField,
                                label: 'Housekeeping Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 264.8, width: 43, height: 21 }] },
                            },
                            {
                                param: 'housekeeping_comments',
                                type: ControlKeys.TextField,
                                label: 'Housekeeping Comments',
                                pdf: { 0: [{ x: 415, y: 264.8, width: 163, height: 21 }] },
                            },
                            {
                                param: 'housekeeping_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'ppe_divider',
                                type: ControlKeys.Divider,
                                label: 'PPE',
                            },
                            {
                                param: 'ppe_checklist',
                                type: ControlKeys.Looper,
                                setLength: 5,
                                pdf: { 0: [{ x: 242, y: 198.3, width: 339, height: 53.5 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'ppe_action': 'Glasses / Goggles / Shields worn' }
                                       ,{ 'ppe_action': 'Hearing Protection' }
                                       ,{ 'ppe_action': 'Respiratory Protection' }
                                       ,{ 'ppe_action': 'Hand Protection - Leather / Rubber Gloves' }
                                       ,{ 'ppe_action': 'Apron' }
                                       ],
                                controls: [
                                    {
                                        param: 'ppe_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'ppe_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'ppe_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'ppe_sampled',
                                type: ControlKeys.TextField,
                                label: 'PPE Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 201.3, width: 43, height: 53 }] },
                            },
                            {
                                param: 'ppe_compliant',
                                type: ControlKeys.TextField,
                                label: 'PPE Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 201.3, width: 43, height: 53 }] },
                            },
                            {
                                param: 'ppe_comments',
                                type: ControlKeys.TextField,
                                label: 'PPE Comments',
                                pdf: { 0: [{ x: 415, y: 201.3, width: 163, height: 53 }] },
                            },
                            {
                                param: 'ppe_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'environmental_divider',
                                type: ControlKeys.Divider,
                                label: 'Environmental',
                            },
                            {
                                param: 'environmental_checklist',
                                type: ControlKeys.Looper,
                                setLength: 3,
                                pdf: { 0: [{ x: 242, y: 155.3, width: 339, height: 33.5 }] },
                                grid: { 0: [{ width: 339, height: 10.5 }] },
                                value: [{ 'environmental_action': 'Hydrocarbons contained' }
                                       ,{ 'environmental_action': 'Correct labelling' }
                                       ,{ 'environmental_action': 'Spill trays' }
                                       ],
                                controls: [
                                    {
                                        param: 'environmental_action',
                                        type: ControlKeys.TextLabel,
                                    },
                                    {
                                        param: 'environmental_choice',
                                        type: ControlKeys.Spinner,
                                        pdf: { 0: [{ y: 2, size: 10 }] },
                                        controls: [
                                            { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                            { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                            { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                        ],
                                        radio: true,
                                    },
                                    {
                                        param: 'environmental_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                            {
                                param: 'environmental_sampled',
                                type: ControlKeys.TextField,
                                label: 'Environmental Sampled',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 315, y: 158.3, width: 43, height: 33 }] },
                            },
                            {
                                param: 'environmental_compliant',
                                type: ControlKeys.TextField,
                                label: 'Environmental Compliant',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 365, y: 158.3, width: 43, height: 33 }] },
                            },
                            {
                                param: 'environmental_comments',
                                type: ControlKeys.TextField,
                                label: 'Environmental Comments',
                                pdf: { 0: [{ x: 415, y: 158.3, width: 163, height: 33 }] },
                            },
                            {
                                param: 'environmental_spacer',
                                type: ControlKeys.Divider,
                            },

                            {
                                param: 'total_divider',
                                type: ControlKeys.Divider,
                                label: 'Total',
                            },
                            {
                                param: 'total_Compliant_yes',
                                type: ControlKeys.CheckBox,
                                label: 'Compliant',
                                pdf: { 0: [{ x: 320, y: 138, size: 10 }] },
                            },
                            {
                                param: 'total_Compliant_no',
                                type: ControlKeys.CheckBox,
                                label: 'Non-Compliant',
                                pdf: { 0: [{ x: 375, y: 138, size: 10 }] },
                            },
                            {
                                param: 'total_comments',
                                type: ControlKeys.TextField,
                                label: 'Comments',
                                pdf: { 0: [{ x: 422, y: 138, size: 10 }] },
                            },
                        ],
                    },
                    {
                        id: '3',
                        type: ControlKeys.Tab,
                        label: 'Issues',
                        icon: 'camera',
                        controls: [
                            {
                                param: 'attachment_page',
                                type: ControlKeys.Looper,
                                label: '+ Add Page',
                                pdf: { 'A0[{}]': [{ x: 32, y: 125, width: 532, height: 650 }] },
                                grid: { 'A0[{}]': [{ width: 532, height: 650 }] },
                                controls: [
                                    {
                                        param: 'attachment_page_header',
                                        type: ControlKeys.Divider,
                                        label: 'Page {}'
                                    },
                                    {
                                        param: 'attachment_looper',
                                        type: ControlKeys.Looper,
                                        label: '+ Add Attachment',
                                        minLength: 1,
                                        maxLength: 6,
                                        pdf: { 0: [{ x: 0, y: 0, width: 532, height: 650 }] },
                                        grid: { 0: [{ width: 260, height: 208, margin: 6 }] },
                                        controls: [
                                            {
                                                param: 'attachment_header',
                                                type: ControlKeys.Divider,
                                                label: 'Attachment {}'
                                            },
                                            {
                                                param: 'attachment_attachment_image',
                                                type: ControlKeys.ImageSelect,
                                                label: 'Image',
                                                pdf: { 0: [{ x: 0, y: 88, width: 260, height: 120 }] },
                                            },
                                            {
                                                param: 'inspection_attachment_comments',
                                                type: ControlKeys.TextArea,
                                                label: 'Comments',
                                                pdf: { 0: [{ x: 0, y: 0, width: 260, height: 85, size: 12 }] },
                                            },
                                        ]
                                    },
                                    {
                                        param: 'inspection_page_footer',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                guid: "00000000-0000-0000-0000-000000000004",
                name: 'Inspection Report',
                pdfname: 'Inspection Report',
                version: 'INS_001',
                tabs: [
                    {
                        id: '1',
                        type: ControlKeys.Tab,
                        label: 'Details',
                        icon: 'edit',
                        controls: [
                            {
                                param: 'inspection_header',
                                type: ControlKeys.Divider,
                                label: 'Inspection Details',
                            },
                            {
                                param: 'date',
                                type: ControlKeys.Date,
                                label: 'Date',
                                pdf: { 0: [{ x: 75, y: 677, width: 150, height: 15, size: 14 }] },
                            },
                            {
                                param: 'inspector',
                                type: ControlKeys.TextField,
                                label: 'Inspector',
                                pdf: { 0: [{ x: 355, y: 677, width: 100, height: 15, size: 14 }] },
                            },
                            {
                                param: 'location',
                                type: ControlKeys.Spinner,
                                label: 'Location',
                                controls: SiteSpinnerControls,
                                pdf: { 0: [{ x: 75, y: 640, width: 200, height: 15, size: 14 }] },
                            },
                            {
                                param: 'pin_vin',
                                type: ControlKeys.TextField,
                                label: 'Pin / Vin',
                                pdf: { 0: [{ x: 115, y: 717, width: 150, height: 15, size: 14 }] },
                            },
                            {
                                param: 'rep_no',
                                type: ControlKeys.TextField,
                                label: 'Report Number',
                                pdf: { 0: [{ x: 355, y: 717, width: 150, height: 15, size: 14 }] },
                            },
                            {
                                param: 'customer_header',
                                type: ControlKeys.Divider,
                                label: 'Customer Details',
                            },
                            {
                                param: 'customer_info',
                                type: ControlKeys.TextArea,
                                label: 'Information',
                                pdf: { 0: [{ x: 75, y: 585, width: 285, height: 30, size: 12 }] },
                            },
                            {
                                param: 'customer_phone',
                                type: ControlKeys.TextField,
                                label: 'Phone',
                                pdf: { 0: [{ x: 400, y: 585, width: 150, height: 15, size: 14 }] },
                            },
                        ],
                    },
                    {
                        id: '2',
                        type: ControlKeys.Tab,
                        label: 'Machine',
                        icon: 'edit',
                        controls: [
                            {
                                param: 'machine_header',
                                type: ControlKeys.Divider,
                                label: 'Machine Details',
                            },
                            {
                                param: 'machine_code',
                                type: ControlKeys.TextField,
                                label: 'Code',
                                pdf: { 0: [{ x: 82, y: 535, width: 110, height: 15, size: 14 }]
                                    , 'A0': [{ x: 73, y: 80, width: 110, height: 15, size: 12 }]
                                     },
                            },
                            {
                                param: 'machine_model',
                                type: ControlKeys.TextField,
                                label: 'Model',
                                pdf: { 0: [{ x: 200, y: 535, width: 85, height: 15, size: 14 }]
                                    , 'A0': [{ x: 192, y: 80, width: 110, height: 15, size: 12 }]
                                     },
                            },
                            {
                                param: 'machine_sn',
                                type: ControlKeys.TextField,
                                label: 'Serial No.',
                                pdf: { 0: [{ x: 292, y: 535, width: 140, height: 15, size: 14 }]
                                    , 'A0': [{ x: 309, y: 80, width: 110, height: 15, size: 12 }]
                                     },
                            },
                            {
                                param: 'machine_id',
                                type: ControlKeys.TextField,
                                label: 'ID',
                                pdf: { 0: [{ x: 442, y: 535, width: 120, height: 15, size: 14 }]
                                    , 'A0': [{ x: 436, y: 80, width: 110, height: 15, size: 12 }]
                                     },
                            },
                            {
                                param: 'machine_time_inspection',
                                type: ControlKeys.TextField,
                                label: 'Inspection Time Limit',
                                keyboard: 'decimal-pad',
                                pdf: { 0: [{ x: 75, y: 498, width: 110, height: 13, size: 12 }] },
                            },
                            {
                                param: 'machine_hours_operated',
                                type: ControlKeys.TextField,
                                label: 'Operated Hours',
                                keyboard: 'decimal-pad',
                                pdf: { 0: [{ x: 75, y: 465, width: 110, height: 13, size: 12 }] },
                            },
                            {
                                param: 'machine_hours_latest',
                                type: ControlKeys.TextField,
                                label: 'Latest Hour',
                                keyboard: 'decimal-pad',
                                pdf: {'A0': [{ x: 125, y: 47, width: 110, height: 15, size: 12 }] },
                            },
                            {
                                param: 'machine_time_delivery',
                                type: ControlKeys.TextField,
                                label: 'Time Since Delivery',
                                pdf: { 0: [{ x: 355, y: 465, width: 110, height: 13, size: 12 }]
                                     ,'A0': [{ x: 345, y: 47, width: 110, height: 15, size: 12 }]
                                     },
                            },
                            {
                                param: 'machine_repair',
                                type: ControlKeys.TextField,
                                label: 'Emergency Repair',
                                pdf: { 0: [{ x: 75, y: 420, width: 110, height: 13, size: 12 }] },
                            },
                            {
                                param: 'machine_condition',
                                type: ControlKeys.TextField,
                                label: 'Condition',
                                pdf: { 0: [{ x: 355, y: 420, width: 110, height: 13, size: 12 }] },
                            },
                            {
                                param: 'machine_result',
                                type: ControlKeys.TextArea,
                                label: 'Inspection Result',
                                pdf: { 0: [{ x: 43, y: 290, width: 520, height: 90, size: 12 }] },
                            },
                            {
                                param: 'machine_image',
                                type: ControlKeys.ImageSelect,
                                label: 'Image',
                                pdf: { 0: [{ x: 157, y: 50, width: 300, height: 175 }] },
                            },
                        ],
                    },
                    {
                        id: '3',
                        type: ControlKeys.Tab,
                        label: 'Inspection',
                        icon: 'camera',
                        controls: [
                            {
                                param: 'inspection_page',
                                type: ControlKeys.Looper,
                                label: '+ Add Page',
                                minLength: 1,
                                pdf: { 'A0[{}]': [{ x: 32, y: 125, width: 532, height: 650 }] },
                                grid: { 'A0[{}]': [{ width: 532, height: 650 }] },
                                controls: [
                                    {
                                        param: 'inspection_page_header',
                                        type: ControlKeys.Divider,
                                        label: 'Page {}'
                                    },
                                    {
                                        param: 'inspection_attachment',
                                        type: ControlKeys.Looper,
                                        label: '+ Add Attachment',
                                        minLength: 1,
                                        maxLength: 6,
                                        pdf: { 0: [{ x: 0, y: 0, width: 532, height: 650, vertical: true }] },
                                        grid: { 0: [{ width: 260, height: 208, margin: 6 }] },
                                        controls: [
                                            {
                                                param: 'inspection_attachment_header',
                                                type: ControlKeys.Divider,
                                                label: 'Attachment {}'
                                            },
                                            {
                                                param: 'inspection_attachment_name',
                                                type: ControlKeys.TextField,
                                                label: 'Name',
                                                pdf: { 0: [{ x: 100, y: 75, width: 160, height: 13, size: 12 }] },
                                            },
                                            {
                                                param: 'inspection_attachment_severity',
                                                type: ControlKeys.Spinner,
                                                label: 'Severity',
                                                pdf: { 0: [{ x: 0, y: 75, width: 260, height: 13, size: 12 }] },
                                                controls: [
                                                    {label: "Normal", value: "Normal:", pdf: { backgroundColor: "#99FF33" }},
                                                    {label: "Watch Closely", value: "Watch Closely:", pdf: { backgroundColor: "#FF9933" }},
                                                    {label: "Attention", value: "Attention:", pdf: { backgroundColor: "#FF3333" }},
                                                    {label: "Failure", value: "Failure:", pdf: { backgroundColor: "#FF3333" }},
                                                    ],
                                                radio: true,
                                            },
                                            {
                                                param: 'inspection_attachment_image',
                                                type: ControlKeys.ImageSelect,
                                                label: 'Image',
                                                pdf: { 0: [{ x: 0, y: 88, width: 260, height: 120 }] },
                                            },
                                            {
                                                param: 'inspection_attachment_comments',
                                                type: ControlKeys.TextArea,
                                                label: 'Comments',
                                                pdf: { 0: [{ x: 0, y: 0, width: 260, height: 75, size: 12 }] },
                                            },
                                        ]
                                    },
                                    {
                                        param: 'inspection_page_footer',
                                        type: ControlKeys.Divider,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
};

export default
    {List
    ,Get

    ,HasInstance
    ,LoadInstance
    ,SaveInstance
    };