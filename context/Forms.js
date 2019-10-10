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
                                type: ControlKeys.TextField,
                                label: 'Site',
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
                                    { label: 'Day', value: 'Day Shift' },
                                    { label: 'Night', value: 'Night Shift' },
                                ],
                                pdf: { 0: [{ x: 450, y: 742, width: 100, height: 15 }] },
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
                                        param: 'checklist_safe',
                                        type: ControlKeys.CheckBox,
                                        label: 'Safe',
                                        pdf: { 0: [{ x: 14, y: 6 }] },
                                    },
                                    {
                                        param: 'checklist_atrisk',
                                        type: ControlKeys.CheckBox,
                                        label: 'At Risk',
                                        pdf: { 0: [{ x: 49, y: 6 }] },
                                    },
                                    {
                                        param: 'checklist_na',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 85, y: 6 }] },
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
                                param: 'checklist_oiltank_safe',
                                type: ControlKeys.CheckBox,
                                label: 'Safe',
                                pdf: { 0: [{ x: 449 + 14, y: 249, width: 10, height: 15 }] },
                            },
                            {
                                param: 'checklist_oiltank_atrisk',
                                type: ControlKeys.CheckBox,
                                label: 'At Risk',
                                pdf: { 0: [{ x: 449 + 49, y: 249, width: 10, height: 15 }] },
                            },
                            {
                                param: 'checklist_oiltank_na',
                                type: ControlKeys.CheckBox,
                                label: 'N/A',
                                pdf: { 0: [{ x: 449 + 85, y: 249, width: 10, height: 15 }] },
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
                name: 'Safe Act Observation-Mining',
                pdfname: 'SMS-SAF-FRM-0013_03 Safe Act Observation - Mining Report',
                version: '0.0.1',
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
                                type: ControlKeys.TextField,
                                label: 'Location',
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
                                        param: 'risk_assessment_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'risk_assessment_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'risk_assessment_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'risk_assessment_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'risk_assessment_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'risk_assessment_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'risk_assessment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
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
                                        param: 'compliance_to_procedures_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'compliance_to_procedures_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'compliance_to_procedures_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'compliance_to_procedures_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'compliance_to_procedures_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'compliance_to_procedures_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'compliance_to_procedures_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
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
                                        param: 'operator_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'operator_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'operator_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'operator_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'operator_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'operator_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'operator_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
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
                                        param: 'traffic_management_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'traffic_management_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'traffic_management_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'traffic_management_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'traffic_management_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'traffic_management_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'traffic_management_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
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
                                        param: 'mobile_equipment_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'mobile_equipment_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'mobile_equipment_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'mobile_equipment_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'mobile_equipment_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'mobile_equipment_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'mobile_equipment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
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
                                        param: 'prestart_equipment_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'prestart_equipment_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'prestart_equipment_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'prestart_equipment_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'prestart_equipment_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'prestart_equipment_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'prestart_equipment_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
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
                                        param: 'PPE_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'PPE_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'PPE_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'PPE_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'PPE_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'PPE_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'PPE_divider',
                                        type: ControlKeys.Divider,
                                    },
                                ],
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
                                        param: 'environmental_yes',
                                        type: ControlKeys.CheckBox,
                                        label: 'Yes',
                                        pdf: { 0: [{ x: 210, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'environmental_no',
                                        type: ControlKeys.CheckBox,
                                        label: 'No',
                                        pdf: { 0: [{ x: 238, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'environmental_n/a',
                                        type: ControlKeys.CheckBox,
                                        label: 'N/A',
                                        pdf: { 0: [{ x: 266, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'environmental_sampled',
                                        type: ControlKeys.TextField,
                                        label: 'Number Sampled',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 294, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'environmental_compliant',
                                        type: ControlKeys.TextField,
                                        label: 'Number Compliant',
                                        keyboardType: 'phone-pad',
                                        pdf: { 0: [{ x: 340, y: 0, size: 10 }] },
                                    },
                                    {
                                        param: 'environmental_comments',
                                        type: ControlKeys.TextField,
                                        label: 'Comments',
                                        pdf: { 0: [{ x: 392, y: 0, size: 10 }] },
                                    },
                                ],
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