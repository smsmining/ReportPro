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
                guid: "00000000-0000-0000-0000-000000000000",
                name: 'Inspection',
                pdfname: 'Inspection Report',
                version: '0.0.1',
                tabs: [
                    {
                        id: '1',
                        type: ControlKeys.Tab,
                        label: 'custom',
                        icon: 'event-note',
                        controls: [
                            {
                                id: '1',
                                type: ControlKeys.Divider,
                                label: 'Inspection Information',
                            },
                            {
                                id: '2',
                                type: ControlKeys.TextField,
                                label: 'PIN/VIN No',
                                param: 'PIN/VIN No',
                                pdf: { 0: [{ x: 120, y: 720, fontSize: 15 }] },
                            },
                            {
                                id: '3',
                                type: ControlKeys.TextField,
                                label: 'Report No',
                                param: 'Report No',
                                keyboardType: 'numeric',
                                pdf: { 0: [{ x: 360, y: 720, fontSize: 15 }] },
                            },
                            {
                                id: '4',
                                type: ControlKeys.Date,
                                label: 'Inspection date',
                                param: 'Inspection date',
                                pdf: { 0: [{ x: 86, y: 680, fontSize: 15 }] },
                            },
                            {
                                id: '5',
                                type: ControlKeys.TextField,
                                label: 'Inspected by',
                                param: 'Inspected by',
                                pdf: { 0: [{ x: 393, y: 680, fontSize: 15 }] },
                            },
                            {
                                id: '6',
                                type: ControlKeys.TextField,
                                label: 'Inspection place',
                                param: 'Inspection place',
                                pdf: { 0: [{ x: 86, y: 644, fontSize: 15 }] },
                            },
                            {
                                id: '7',
                                type: ControlKeys.Divider,
                                label: 'Customer Information',
                                param: 'Customer Divider',
                            },
                            {
                                id: '8',
                                type: ControlKeys.TextField,
                                label: 'Customer Name',
                                param: 'Customer Name',
                                pdf: { 0: [{ x: 86, y: 605, fontSize: 15 }] },
                            },
                            {
                                id: '9',
                                type: ControlKeys.TextField,
                                label: 'Customer Address',
                                param: 'Customer Address',
                                keyboardType: 'default',
                                pdf: { 0: [{ x: 86, y: 588, fontSize: 15 }] },
                            },
                            {
                                id: '10',
                                type: ControlKeys.TextField,
                                label: 'Customer Phone',
                                param: 'Customer Phone',
                                keyboardType: 'phone-pad',
                                pdf: { 0: [{ x: 393, y: 588, fontSize: 15 }] },
                            },
                            {
                                id: '11',
                                type: ControlKeys.Divider,
                                label: 'Machine Information',
                            },
                            {
                                id: '12',
                                type: ControlKeys.TextField,
                                label: 'Model Code',
                                param: 'Model Code',
                                keyboardType: 'default',
                                pdf: {
                                    0: [{ x: 86, y: 538, fontSize: 15 }],
                                    1: [{ x: 124, y: 710, fontSize: 15 }]
                                },
                            },
                            {
                                id: '13',
                                type: ControlKeys.TextField,
                                label: 'Model Name',
                                param: 'Model Name',
                                pdf: {
                                    0: [{ x: 188, y: 538, fontSize: 15 }],
                                    1: [{ x: 225, y: 710, fontSize: 15 }]
                                },
                            },
                            {
                                id: '14',
                                type: ControlKeys.TextField,
                                label: 'S/N',
                                param: 'S/N',
                                keyboardType: 'numeric',
                                pdf: {
                                    0: [{ x: 313, y: 538, fontSize: 15 }],
                                    1: [{ x: 350, y: 710, fontSize: 15 }]
                                },
                            },
                            {
                                id: '15',
                                type: ControlKeys.TextField,
                                label: 'Machine ID',
                                param: 'Machine ID',
                                pdf: {
                                    0: [{ x: 393, y: 538, fontSize: 15 }],
                                    1: [{ x: 430, y: 710, fontSize: 15 }]
                                },
                            },
                            {
                                id: '16',
                                type: ControlKeys.Divider,
                                label: 'General Information',
                            },
                            {
                                id: '17',
                                type: ControlKeys.Date,
                                label: 'Annual inspection time limit',
                                param: 'time limit',
                            },
                            {
                                id: '18',
                                type: ControlKeys.TextField,
                                label: 'Operated Hours',
                                param: 'Operated Hours',
                                keyboardType: 'numeric',
                                pdf: { 0: [{ x: 86, y: 460, fontSize: 22 }] },
                            },
                            {
                                id: '19',
                                type: ControlKeys.TextField,
                                label: 'Time since Delivery',
                                param: 'Time since Delivery',
                                pdf: {
                                    0: [{ x: 333, y: 460, fontSize: 22 }],
                                    1: [{ x: 394, y: 674, fontSize: 22 }],
                                },
                            },
                            {
                                id: '20',
                                type: ControlKeys.TextField,
                                label: 'Emergency repair',
                                param: 'Emergency repair',
                                pdf: { 0: [{ x: 86, y: 415, fontSize: 22 }] },
                            },

                            {
                                id: '21',
                                type: ControlKeys.TextField,
                                label: 'Condition',
                                param: 'Condition',
                                pdf: { 0: [{ x: 333, y: 415, fontSize: 22 }] },
                            },
                            {
                                id: '22',
                                type: ControlKeys.TextArea,
                                label: 'Overall inspection result',
                                param: 'Overall inspection result',
                                placeholder: 'Comment',
                                pdf: { 0: [{ x: 45, y: 370, fontSize: 15 }] },
                            },
                            {
                                id: '23',
                                type: ControlKeys.TextField,
                                label: 'Latest hr',
                                param: 'Latest hr',
                                pdf: { 1: [{ x: 190, y: 674, fontSize: 22 }] },
                            },
                            {
                                id: '24',
                                type: ControlKeys.ImageSelect,
                                label: 'Digger Image',
                                param: 'Digger Image',
                                pdf: {
                                    0: [{ x: 205, y: 180, width: 200, height: 100 }],
                                    1: [{ x: 129, y: 540, width: 200, height: 100 }]
                                },
                            },
                            {
                                id: '99',
                                type: ControlKeys.Looper,
                                label: 'Add Attachment',
                                param: 'Attachment',
                                minLength: 1,
                                maxLength: 10,
                                pdf: { 1: [{ x: 0, y: 0, width: 500, height: 500 }] },
                                grid: { 1: [{ width: 100, height: 250, margin: 10 }] },
                                controls: [
                                    {   id: '991',
                                        type: ControlKeys.Divider,
                                        label: 'Attachment {}',
                                        param: 'Attachment_Divider',
                                    },
                                    {
                                        id: '992',
                                        type: ControlKeys.TextField,
                                        label: 'Type',
                                        param: 'Attachment_Type',
                                        value: "Example {}",
                                        pdf: { 0: [{ x: 10, y: 100, width: 90, height: 50, fontSize: 10, backgroundColor: "#009900" }] },
                                    },
                                    {
                                        id: '993',
                                        type: ControlKeys.Spinner,
                                        label: 'Severity',
                                        param: 'Attachment_Severity',
                                        value: 'Normal',
                                        controls: [
                                            { label: 'Normal', value: 'Normal', pdf: { backgroundColor: "#009900"}},
                                            { label: 'Watch Closely', value: 'Watch Closely', pdf: { backgroundColor: "#ff8533" }},
                                            { label: 'Attention', value: 'Attention', pdf: { backgroundColor: "#ff3838" }},
                                            { label: 'Failure', value: 'Failure', pdf: { backgroundColor: "#ff3838" }},
                                        ],
                                        pdf: { 0: [{ x: 20, y: 200, width: 80, height: 50, fontSize: 10 }] },
                                    },
                                    {
                                        id: '994',
                                        type: ControlKeys.ImageSelect,
                                        label: 'Image',
                                        param: 'Image',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '2',
                        type: ControlKeys.Tab,
                        label: 'machine',
                        icon: 'event-note',
                        controls: [
                            {
                                id: '1',
                                type: ControlKeys.ImageSelect,
                                label: 'logo',
                                param: 'logo',
                                value: '',
                            },
                            {
                                id: '2',
                                type: ControlKeys.TextField,
                                label: 'form1_tab2_con2',
                                param: 'form1_tab2_con2',
                                value: '',
                            },
                            {
                                id: '3',
                                type: ControlKeys.TextField,
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                controls: [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                            {
                                id: '4',
                                type: ControlKeys.Spinner,
                                label: 'Company',
                                param: 'Company',
                                controls: [
                                    {label: 'company_1', value:'key1'},
                                    {label: 'company_2', value:'key2'},
                                    {label: 'company_3', value:'key3'},
                                    ],
                                value: '',
                            },
                            {
                                id: '5',
                                type: ControlKeys.TextField,
                                label: 'Phone',
                                param: 'Phone',
                                value: '',
                                maxLength:'',
                                keyboardType:'phone-pad',
                            },
                            {
                                id: '6',
                                type: ControlKeys.ImageStatic,
                                label: 'image title_1',
                                param: 'image title_1',
                                value: require('../resources/00000000-0000-0000-0000-000000000000/form0_1.png'),
                            },
                            {
                                id: '7',
                                type: ControlKeys.TextLabel,
                                label: 'message title',
                                param: '',
                                value: 'this is a read only message',
                            },
                            {
                                id: '8',
                                type: ControlKeys.ImageStatic,
                                label: 'image title_2',
                                param: 'image title_2',
                                value: require('../resources/00000000-0000-0000-0000-000000000000/form0_2.png'),
                            },
                        ],
                    },
                    {
                        id: '3',
                        type: ControlKeys.Tab,
                        label: 'sign',
                        icon: 'event-note',
                        controls: [
                            {
                                id: '1',
                                type: ControlKeys.ImageSelect,
                                label: 'logo',
                                param: 'logo',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                id: '2',
                                type: ControlKeys.TextField,
                                label: 'form1_tab3_con2',
                                param: 'form1_tab3_con2',
                                value: '',
                            },
                            {
                                id: '3',
                                type: 'drillDown',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                guid: "00000000-0000-0000-0000-000000000001",
                name: 'Workshop Inspection',
                pdfname: 'Workshop Inspection',
                version: '0.0.1',
                tabs: [
                    {
                        id: '1',
                        label: 'Details',
                        icon: 'create',
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
                        icon: 'assignment',
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
                                    ,{ 'checklist_name': 'Are fire extinguishers in serviceable condition?' }
                                    ,{ 'checklist_name': 'Is all signage clean and visible?' }
                                    ,{ 'checklist_name': 'Are all oxy-acetylene bottles stored in an upright position and secured?' }
                                    ,{ 'checklist_name': 'Are all oxy-acetylene hoses in good condition?' }
                                    ,{ 'checklist_name': 'Are flashback arrestors fitted to all oxy and acetylene kits?' }
                                    ,{ 'checklist_name': 'Is gas storage secure and stored as per racking requirements?' }
                                    ,{ 'checklist_name': 'Are all workshop tools in a safe and serviceable condition?' }
                                    ,{ 'checklist_name': 'Are dangerous goods stored in appropriate cupboards?' }
                                    ,{ 'checklist_name': 'Lighting is operational and suitable?' }
                                    ,{ 'checklist_name': 'Are spill kits in place with correct quantities of spill response equipment and locked?' }
                                    ,{ 'checklist_name': 'Are spill response kits free from rubbish e.g. oily rags cardboard material?' }
                                    ,{ 'checklist_name': 'Are work benches tidy and free of clutter?' }
                                    ,{ 'checklist_name': 'All storage pods are stored in appropriate bunded areas?' }
                                    ,{ 'checklist_name': 'Is there any evidence of oil spillage in the work area?' }
                                    ,{ 'checklist_name': 'Is the workshop floor clean and clear of trip hazards including rubbish?' }
                                    ,{ 'checklist_name': 'Are emergency eyewash / shower(s) tested and is access unobstructed?' }
                                    ,{ 'checklist_name': 'Are all hoses wound up and stored correctly?' }
                                    ,{ 'checklist_name': 'Are the storage containers clean and clear of trip hazards?' }
                                    ,{ 'checklist_name': 'Are machine guards in place and fitted with an E-Stop e.g. pedestal grinder(s)?' }
                                    ,{ 'checklist_name': 'Are Safety Data Sheets (SDS) available and in date?' }
                                    ,{ 'checklist_name': 'Is the overall condition of the workshop areas satisfactory?' }
                                    ,{ 'checklist_name': 'Is PPE available in all areas needed?' }
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
                        icon: 'perm-identity',
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
                name: 'hire-off',
                version: '0.0.1',
                tabs: [
                    {
                        id: '1',
                        label: 'custom',
                        icon: 'settings',
                        controls: [
                            {
                                id: '1',
                                type: ControlKeys.ImageSelect,
                                label: 'logo',
                                param: 'logo',
                                value: '',
                            },
                            {
                                id: '2',
                                type: 'textInput',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                            },
                        ],
                    },
                    {
                        id: '2',
                        label: 'machine',
                        icon: 'settings',
                        controls: [
                            {
                                id: '1',
                                type: ControlKeys.ImageSelect,
                                label: 'logo',
                                param: 'Example',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                id: '2',
                                type: ControlKeys.TextField,
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '3',
                        label: 'sign',
                        icon: 'settings',
                        controls: [
                            {
                                type: ControlKeys.ImageSelect,
                                label: 'logo',
                                param: 'Example',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                type: ControlKeys.TextField,
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
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