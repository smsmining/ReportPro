import { ControlKeys } from "../../components/ControlItem";
import { SiteSpinner } from "./siteSpinner";

const bucket_measurements = "data:image/png;base64,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"

export default SMS_MN_INS_0005_01 =
{
    guid: "00000000-0000-0000-0000-000000000008",
    name: 'Mech & Safety Inspection Bulldozer',
    pdfname: 'SMS-MN-INS-0005_01 Mechanical and Safety Inspection - Bulldozer',
    version: 'SMS-MN-INS-0005_01',
    tabs: [
        {
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
                    param: 'inspection_date',
                    type: ControlKeys.Date,
                    label: 'Date',
                    pdf: { 0: [{ x: 70, y: 415, size: 15 }] },
                    required: true,
                },
                {
                    param: 'inspection_location',
                    type: ControlKeys.TextField,
                    label: 'Location',
                    pdf: { 0: [{ x: 225, y: 415, size: 15 }] },
                    required: true,
                },
                {
                    param: 'inspection_inspector',
                    type: ControlKeys.TextField,
                    label: 'Inspector',
                    pdf: { 0: [{ x: 400, y: 415, size: 15 }] },
                    required: true,
                },

                {
                    param: 'customer_header',
                    type: ControlKeys.Divider,
                    label: 'Customer Details',
                },
                {
                    param: 'customer_name',
                    type: ControlKeys.TextField,
                    label: 'Name',
                    pdf: { 0: [{ x: 70, y: 330, size: 15 }] },
                    required: true,
                },
                {
                    ...SiteSpinner,
                    param: 'customer_site',
                    label: 'Site',
                    pdf: { 0: [{ x: 225, y: 330, size: 15 }] },
                    required: true,
                },

                {
                    param: 'machine_header',
                    type: ControlKeys.Divider,
                    label: 'Machine Details',
                },
                {
                    param: 'machine_id',
                    type: ControlKeys.TextField,
                    label: 'Machine ID',
                    pdf: { 0: [{ x: 70, y: 235, size: 15 }] },
                    required: true,
                },
                {
                    param: 'machine_make',
                    type: ControlKeys.TextField,
                    label: 'Make',
                    pdf: { 0: [{ x: 225, y: 235, size: 15 }] },
                    required: true,
                },
                {
                    param: 'machine_model',
                    type: ControlKeys.TextField,
                    label: 'Model',
                    pdf: { 0: [{ x: 400, y: 235, size: 15 }] },
                    required: true,
                },
                {
                    param: 'machine_sn',
                    type: ControlKeys.TextField,
                    label: 'Serial No.',
                    pdf: { 0: [{ x: 70, y: 180, size: 15 }] },
                    required: true,
                },
                {
                    param: 'machine_rego',
                    type: ControlKeys.TextField,
                    label: 'Rego No.',
                    pdf: { 0: [{ x: 225, y: 180, size: 15 }] },
                    required: true,
                },
                {
                    param: 'machine_smu',
                    type: ControlKeys.TextField,
                    label: 'SMU Reading',
                    pdf: { 0: [{ x: 400, y: 180, size: 15 }] },
                    required: true,
                },
            ],
        },
        {
            type: ControlKeys.Tab,
            label: 'Check',
            icon: 'check-square-o',
            controls: [{
                param: 'cab_collapse',
                type: ControlKeys.Collapse,
                label: 'CAB',
                controls:
                    [{
                        param: 'cab_checklist_a',
                        type: ControlKeys.Looper,
                        setLength: 8,
                        value: [{ 'name': 'Doors / Locks' }
                            , { 'name': 'Windows' }
                            , { 'name': 'Mirrors' }
                            , { 'name': 'Operator Seat' }
                            , { 'name': 'Seat Belts' }
                            , { 'name': 'A/C Filters' }
                            , { 'name': 'A/C Operation, Temp' }
                            , { 'name': 'UHF / Digital Radio - Radio Power Supply Hardwired' }
                        ],
                        pdf: { 1: [{ x: 181, y: 605, width: 387, height: 125 }] },
                        grid: { 1: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'cab_checklist_b',
                        type: ControlKeys.Looper,
                        setLength: 11,
                        value: [{ 'name': 'AM/FM Radio' }
                            , { 'name': 'Reverse camera & screen' }
                            , { 'name': 'Wiper and Washers' }
                            , { 'name': 'General Cab Condition ' }
                            , { 'name': 'Operator Manual' }
                            , { 'name': 'Service Sticker' }
                            , { 'name': 'Cab Detailed / Cleaned' }
                            , { 'name': 'Heater Tested - Hot' }
                            , { 'name': 'Hour Meter' }
                            , { 'name': 'Horn Operation' }
                            , { 'name': 'Gauges' }
                        ],
                        pdf: { 1: [{ x: 181, y: 451, width: 387, height: 154 }] },
                        grid: { 1: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'engine_collapse',
                type: ControlKeys.Collapse,
                label: 'Engine',
                controls:
                    [{
                        param: 'engine_checklist',
                        type: ControlKeys.Looper,
                        setLength: 25,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Oil Leaks' }
                            , { 'name': 'Oil Filter' }
                            , { 'name': 'Air Filters / Pipes' }
                            , { 'name': 'Fuel Filter, Pipes & Hoses' }
                            , { 'name': 'Fuel Level' }
                            , { 'name': 'Coolant Level' }
                            , { 'name': 'Coolant Leaks' }
                            , { 'name': 'Inhibitor Condition' }
                            , { 'name': 'Fan, Water Pump & A/C belts' }
                            , { 'name': 'Alternator & Bracket' }
                            , { 'name': 'Starter Motor' }
                            , { 'name': 'Turbo' }
                            , { 'name': 'Air Compressor' }
                            , { 'name': 'A/Con compressor & Mount' }
                            , { 'name': 'Engine mounts' }
                            , { 'name': 'Radiator & mounts' }
                            , { 'name': 'Radiator pipes & hoses' }
                            , { 'name': 'Exhaust system' }
                            , { 'name': 'Charge air cooler & pipes' }
                            , { 'name': 'EVB operation' }
                            , { 'name': 'Fan Guards' }
                            , { 'name': 'Safety Decals' }
                            , { 'name': 'Paint' }
                            , { 'name': 'Heater Taps On - No Leaks' }
                        ],
                        pdf: { 1: [{ x: 181, y: 87, width: 387, height: 350 }] },
                        grid: { 1: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'hydraulics_collapse',
                type: ControlKeys.Collapse,
                label: 'Hydraulics',
                controls:
                    [{
                        param: 'hydraulics_checklist_a',
                        type: ControlKeys.Looper,
                        setLength: 10,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Hyd. Tank condition' }
                            , { 'name': 'Hyd. Pump operation' }
                            , { 'name': 'Control Valves / Leaks' }
                            , { 'name': 'Blade Lift Cylinders' }
                            , { 'name': 'Blade Tilt Cylinders' }
                            , { 'name': 'Ripper Lift Cylinders' }
                            , { 'name': 'Ripper Tilt Cylinders' }
                            , { 'name': 'Ripper Pin Pull Cylinder' }
                            , { 'name': 'PTO Shaft & Coupling, Safety guards' }
                            ],
                        pdf: { 2: [{ x: 186, y: 604, width: 387, height: 140 }] },
                        grid: { 2: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'hydraulics_checklist_b',
                        type: ControlKeys.Looper,
                        setLength: 2,
                        value: [{ 'name': 'Hyd / trans cooler / mounts' }
                            , { 'name': 'Hose Condition / Clamps / P clamps' }
                            ],
                        pdf: { 2: [{ x: 186, y: 562, width: 387, height: 28 }] },
                        grid: { 2: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'transmission_collapse',
                type: ControlKeys.Collapse,
                label: 'Transmission',
                controls:
                    [{
                        param: 'transmission_checklist',
                        type: ControlKeys.Looper,
                        setLength: 6,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Oil leaks' }
                            , { 'name': 'Prop Shaft & Uni\'s' }
                            , { 'name': 'Operation' }
                            , { 'name': 'Electrical connections' }
                            , { 'name': 'Shift levers / Pad' }
                        ],
                        pdf: { 2: [{ x: 186, y: 450, width: 387, height: 84 }] },
                        grid: { 2: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'brakes_collapse',
                type: ControlKeys.Collapse,
                label: 'Brakes',
                controls:
                    [{
                        param: 'brakes_checklist',
                        type: ControlKeys.Looper,
                        setLength: 1,
                        value: [{ 'name': 'Brake test & record' }
                        ],
                        pdf: { 2: [{ x: 186, y: 422, width: 387, height: 14 }] },
                        grid: { 2: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'body_collapse',
                type: ControlKeys.Collapse,
                label: 'Body Condition',
                controls:
                    [{
                        param: 'body_checklist',
                        type: ControlKeys.Looper,
                        setLength: 6,
                        value: [{ 'name': 'Front Machine Panels' }
                            , { 'name': 'Rear Machine Panels' }
                            , { 'name': 'Side panels' }
                            , { 'name': 'Paint Condition' }
                            , { 'name': 'Asset ID Fitted - Front, Side, Rear' }
                            , { 'name': 'Assembly / Fitment Parts Supplied' }
                        ],
                        pdf: { 2: [{ x: 186, y: 324, width: 387, height: 84 }] },
                        grid: { 2: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'frame_collapse',
                type: ControlKeys.Collapse,
                label: 'Frame / Artic',
                controls:
                    [{
                        param: 'frame_checklist',
                        type: ControlKeys.Looper,
                        setLength: 12,
                        value: [{ 'name': 'Fire Extinguisher Date' }
                            , { 'name': '2nd Fire Extinguisher Date' }
                            , { 'name': 'Fire Suppression System / Date' }
                            , { 'name': 'Fire Suppression Bottle / Date' }
                            , { 'name': 'Auto Greaser / Level / Lines' }
                            , { 'name': 'Equalizer Bar' }
                            , { 'name': 'Blade Trunnions' }
                            , { 'name': 'Blade Skin' }
                            , { 'name': 'Blade Lift Caps movement' }
                            , { 'name': 'Blade tilt movement' }
                            , { 'name': 'Blade Pivot movement' }
                            , { 'name': 'Ripper movement' }
                        ],
                        pdf: { 2: [{ x: 186, y: 142, width: 387, height: 168 }] },
                        grid: { 2: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'electrics_collapse',
                type: ControlKeys.Collapse,
                label: 'Electrics',
                controls:
                    [{
                        param: 'electrics_checklist_name_batt',
                        type: ControlKeys.TextLabel,
                        value: 'Batteries and Clamps\nRubber over battery\nAcid level\Cables'
                    },
                    {
                        param: 'electrics_checklist_selector_batt',
                        type: ControlKeys.Spinner,
                        controls: [
                            { label: 'Pass', value: 'Pass', pdf: { x: 203 }, renderValue: true },
                            { label: 'Fail', value: 'Fail', pdf: { x: 237 }, renderValue: true },
                            { label: 'N/A', value: 'N/A', pdf: { x: 270 }, renderValue: true },
                        ],
                        pdf: { 3: [{ y: 730 }] },
                        radio: true,
                        required: true,
                    },
                    {
                        param: 'electrics_checklist_comments_batt',
                        type: ControlKeys.TextArea,
                        HeightRows: 2,
                        label: 'Comments',
                        pdf: { 3: [{ x: 293, y: 730, width: 284 }] },
                    },
                    {
                        param: 'electrics_checklist_spacer_batt',
                        type: ControlKeys.Divider,
                    },
                    {
                        param: 'electrics_checklist',
                        type: ControlKeys.Looper,
                        setLength: 7,
                        value: [{ 'name': 'Work lights' }
                            , { 'name': 'Reverse alarm' }
                            , { 'name': 'Reverse Lights' }
                            , { 'name': 'Beacon' }
                            , { 'name': 'Horn' }
                            , { 'name': 'Gauges/Warning Lights / Alarms' }
                            , { 'name': 'Relays / Fuses / Breakers' }
                        ],
                        pdf: { 3: [{ x: 190, y: 604, width: 387, height: 98 }] },
                        grid: { 3: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'undercarriage_collapse',
                type: ControlKeys.Collapse,
                label: 'Undercarriage',
                controls:
                    [{
                        param: 'undercarriage_checklist',
                        type: ControlKeys.Looper,
                        setLength: 9,
                        value: [{ 'name': 'Track Frames' }
                            , { 'name': 'Track Chains' }
                            , { 'name': 'Track Roller Guards' }
                            , { 'name': 'Sprockets' }
                            , { 'name': 'Idlers' }
                            , { 'name': 'Bottom Rollers' }
                            , { 'name': 'Top Rollers' }
                            , { 'name': 'Grousers' }
                            , { 'name': 'Track Guides' }
                        ],
                        pdf: { 3: [{ x: 190, y: 464, width: 387, height: 126 }] },
                        grid: { 3: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0, width: 284 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'undercarriage_measurements_header',
                        type: ControlKeys.Divider,
                        label: 'Undercarriage Measurements', 
                    },
                    {
                        param: 'undercarriage_measurements_checklist',
                        type: ControlKeys.Looper,
                        setLength: 15,
                        value: [{ 'name': 'Links Height' }
                            , { 'name': 'Bushings - External' }
                            , { 'name': 'Track Shoes' }
                            , { 'name': 'Idlers - Front' }
                            , { 'name': 'Idlers - Rear' }
                            , { 'name': 'Carrier Rollers' }
                            , { 'name': 'Track Rollers - Single Flange - P1' }
                            , { 'name': 'Track Rollers - Single Flange - P2' }
                            , { 'name': 'Track Rollers - Double Flange - P3' }
                            , { 'name': 'Track Rollers - Double Flange - P4' }
                            , { 'name': 'Track Rollers - Double Flange - P5' }
                            , { 'name': 'Track Rollers - Double Flange - P6' }
                            , { 'name': 'Track Rollers - Single Flange - P7' }
                            , { 'name': 'Track Rollers - Single Flange - P8' }
                            ],
                        pdf: { 7: [{ x: 305, y: 345, width: 300, height: 349.5 }] },
                        grid: { 7: [{ width: 300, height: 23.3 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'type',
                                type: ControlKeys.Spinner,
                                label: 'Measurement',
                                controls: [
                                    { label: 'Ultrasonic', value: 'Ultrasonic' },
                                    { label: 'Manual', value: 'Manual' },
                                ],
                                pdf: { 0: [{ x: 0, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'left',
                                type: ControlKeys.TextField,
                                label: 'Left',
                                pdf: { 0: [{ x: 105, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'right',
                                type: ControlKeys.TextField,
                                label: 'Right',
                                pdf: { 0: [{ x: 175, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'undercarriage_measurements_checklist_a',
                        type: ControlKeys.Looper,
                        setLength: 15,
                        value: [{ 'name': 'Sprockets', type: 'Manual' }
                                ],
                        pdf: { 7: [{ x: 305, y: 345, width: 300, height: 23.3 }] },
                        grid: { 7: [{ width: 300, height: 23.3 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'type',
                                type: ControlKeys.TextLabel,
                                label: 'Measurement',
                                pdf: { 0: [{ x: 0, y: 0 }] },
                            },
                            {
                                param: 'left',
                                type: ControlKeys.TextField,
                                label: 'Left',
                                pdf: { 0: [{ x: 105, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'right',
                                type: ControlKeys.TextField,
                                label: 'Right',
                                pdf: { 0: [{ x: 175, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'get_collapse',
                type: ControlKeys.Collapse,
                label: 'G.E.T.',
                controls:
                    [{
                        param: 'get_checklist_1',
                        type: ControlKeys.Looper,
                        setLength: 2,
                        value: [ { 'name': 'Blade Condition' }
                                ,{ 'name': 'Cutting edge' }
                                ],
                        pdf: { 3: [{ x: 190, y: 424, width: 387, height: 28 }] },
                        grid: { 3: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103, y: 0 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'get_checklist_2',
                        type: ControlKeys.Looper,
                        setLength: 2,
                        value: [ { 'name': 'Scarifies' }
                                ,{ 'name': 'Rippers' }
                                ],
                        pdf: { 3: [{ x: 190 - 50, y: 396, width: 387 + 50, height: 28 }] },
                        grid: { 3: [{ width: 387, height: 13, margin: 0.9 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'quantity',
                                type: ControlKeys.TextField,
                                label: 'Quantity',
                                pdf: { 0: [{ x: 20, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 13 + 50 }, renderValue: true },
                                    { label: 'Fail', value: 'Fail', pdf: { x: 47 + 50 }, renderValue: true },
                                    { label: 'N/A', value: 'N/A', pdf: { x: 80 + 50 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 103 + 50, y: 0 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'get_condition_header',
                        type: ControlKeys.Divider,
                        label: 'G.E.T. Condition'
                    },
                    {
                        param: 'get_condition_checklist',
                        type: ControlKeys.Looper,
                        setLength: 3,
                        value: [ { 'name': 'Cutting Edge' }
                                ,{ 'name': 'Corner Tips' }
                                ,{ 'name': 'Ripper Tip' }
                                ],
                        pdf: { 6: [{ x: 233, y: 191, width: 387, height: 45 }] },
                        grid: { 6: [{ width: 387, height: 14 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'New', value: 'New', pdf: { x: 0 }, renderValue: true },
                                    { label: '< 50% Worn', value: '< 50% Worn', pdf: { x: 120 }, renderValue: true },
                                    { label: '> 50% Worn', value: '> 50% Worn', pdf: { x: 240 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'fitout_collapse',
                type: ControlKeys.Collapse,
                label: 'Site Spec Fit Out',
                controls:
                    [{
                        param: 'fitout_checklist_a',
                        type: ControlKeys.Looper,
                        setLength: 12,
                        value: [{ 'name': 'Fan Belt Guards' }
                            , { 'name': 'Air Con Belt Guards' }
                            , { 'name': 'Manual Release Radiator Cap' }
                            , { 'name': 'Rubber Covering Batteries' }
                            , { 'name': 'Access Step Condition' }
                            , { 'name': 'Hand Rail Condition' }
                            , { 'name': 'Reflective Tape Stickers' }
                            , { 'name': 'Safety lock out Stickers' }
                            , { 'name': 'Isolator Stickers' }
                            , { 'name': '3 Point Contact Stickers' }
                            , { 'name': 'Quick Hitch Safety Pin' }
                            , { 'name': 'Fire Suppression Shut Down Working' }
                        ],
                        pdf: { 4: [{ x: 183, y: 562, width: 390, height: 168 }] },
                        grid: { 4: [{ width: 390, height: 14 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'pass',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 16 }, renderValue: true },
                                    { label: 'N/Fitted', value: 'N/Fitted', pdf: { x: 70 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 100, y: 0 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'fitout_checklist_b',
                        type: ControlKeys.Looper,
                        setLength: 13,
                        value: [{ 'name': 'Battery Isolator Working' }
                            , { 'name': 'Starter Isolator Working' }
                            , { 'name': 'Emergency Stops x 2 Working' }
                            , { 'name': 'Hydraulic Lock Out Working' }
                            , { 'name': 'Weed & Seed' }
                            , { 'name': 'Window tint' }
                            , { 'name': 'Flashing light' }
                            , { 'name': 'Low coolant alarm' }
                            , { 'name': 'Evac service points' }
                            , { 'name': 'UHF radio' }
                            , { 'name': 'Cab Pressurizer' }
                            , { 'name': 'Am/Fm Radio' }
                            , { 'name': 'Mine spec VHF' }
                        ],
                        pdf: { 4: [{ x: 183, y: 366, width: 390, height: 182 }] },
                        grid: { 4: [{ width: 390, height: 14 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'pass',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 16 }, renderValue: true },
                                    { label: 'N/Fitted', value: 'N/Fitted', pdf: { x: 70 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 100, y: 0 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },

                    {
                        param: 'extras_checklist_header',
                        type: ControlKeys.Divider,
                        label: 'Extras',
                    },
                    {
                        param: 'extras_checklist',
                        type: ControlKeys.Looper,
                        maxLength: 9,
                        label: '+ Add',
                        pdf: { 4: [{ x: 33, y: 230, width: 540, height: 126 }] },
                        grid: { 4: [{ width: 540, height: 14 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextField,
                                label: 'Name',
                                pdf: { 0: [{ x: 0, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'pass',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 166 }, renderValue: true },
                                    { label: 'N/Fitted', value: 'N/Fitted', pdf: { x: 220 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 250, y: 0 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            {
                param: 'hygiene_collapse',
                type: ControlKeys.Collapse,
                label: 'Hygiene',
                controls:
                    [{
                        param: 'hygiene_checklist',
                        type: ControlKeys.Looper,
                        setLength: 9,
                        value: [{ 'name': 'Internal Areas (cabin)' }
                            , { 'name': 'External Areas - Panel/Trays etc.' }
                            , { 'name': 'Radiators and Filters' }
                            , { 'name': 'Dust Bowls and Cyclones' }
                            , { 'name': 'Sump/Engine guard' }
                            , { 'name': 'Buckets / Blades / Tyres etc.' }
                            , { 'name': 'Running Gear / Bash Plates' }
                            , { 'name': 'Tyres / Wheel Arches / Tracks' }
                            , { 'name': 'Undercarriage / Other areas' }
                        ],
                        pdf: { 5: [{ x: 298, y: 516, width: 258, height: 126 }] },
                        grid: { 5: [{ width: 258, height: 14 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'pass',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Yes', value: 'Yes', pdf: { x: 18 }, renderValue: true },
                                    { label: 'No', value: 'N0', pdf: { x: 65 }, renderValue: true },
                                ],
                                pdf: { 0: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 0: [{ x: 97, y: 0 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'hygiene_checklist_name_wash',
                        type: ControlKeys.TextLabel,
                        value: 'Vehicle wash-down completed',
                    },
                    {
                        param: 'hygiene_checklist_pass_wash',
                        type: ControlKeys.Spinner,
                        controls: [
                            { label: 'Yes', value: 'Yes', pdf: { x: 298 + 18 }, renderValue: true },
                            { label: 'No', value: 'N0', pdf: { x: 298 + 65 }, renderValue: true },
                        ],
                        pdf: { 5: [{ y: 461 }] },
                        radio: true,
                        required: true,
                    },
                    {
                        param: 'hygiene_checklist_comments_wash',
                        type: ControlKeys.TextArea,
                        HeightRows: 2,
                        label: 'Comments',
                        pdf: { 5: [{ x: 298 + 97, y: 461 }] },
                    },
                    ],
            },
            {
                param: 'blade_collapse',
                type: ControlKeys.Collapse,
                label: 'Blade Measurements',
                controls:
                    [{
                        param: 'blade_measurements',
                        type: ControlKeys.ImageStatic,
                        value: bucket_measurements, 
                        size: { w: 925, h: 366 }
                    },
                    {
                        param: 'blade_measurements_spacer',
                        type: ControlKeys.Divider,
                    },
                    {
                        param: 'blade_checklist',
                        type: ControlKeys.Looper,
                        setLength: 3,
                        value: [{ 'name': 'Right Wing' }
                            , { 'name': 'Blade Skin' }
                            , { 'name': 'Left Wing' }
                        ],
                        pdf: { 6: [{ x: 242, y: 354, width: 258, height: 66 }] },
                        grid: { 6: [{ width: 258, height: 22}] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'thickness',
                                type: ControlKeys.TextField,
                                label: 'New Thickness (mm)',
                                pdf: { 0: [{ x: 0, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'worn',
                                type: ControlKeys.TextField,
                                label: 'Most Worn Measurement (mm)',
                                pdf: { 0: [{ x: 103, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    ],
            },
            ],
        },
        {
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
                                    required: true,
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
        {
            type: ControlKeys.Tab,
            label: 'Sign Off',
            icon: 'user-o',
            controls: [
                {
                    param: 'signoff_header',
                    type: ControlKeys.Divider,
                    label: 'Inspections Carried Out By',
                },
                {
                    param: 'signoff_name',
                    type: ControlKeys.TextField,
                    label: 'Name',
                    pdf: { 7: [{ x: 75, y: 110, size: 15 }] },
                    required: true,
                },
                {
                    param: 'signoff_sig',
                    type: ControlKeys.Signature,
                    label: 'Signature',
                    pdf: { 7: [{ x: 385, y: 68, width: 150, height: 55 }] },
                    required: true,
                },
            ],
        },
    ],
}