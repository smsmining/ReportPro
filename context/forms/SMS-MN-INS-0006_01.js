import { ControlKeys, Models } from "./_config";

const bucket_measurements = "data:image/png;base64,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"

export default SMS_MN_INS_0006_01 =
{
    guid: "00000000-0000-0000-0000-000000000009",
    name: 'Mech & Safety Inspection Excavator',
    pdfname: 'SMS-MN-INS-0006_01 Mechanical and Safety Inspection - Excavator',
    version: 'SMS-MN-INS-0006_01',
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
                    param: 'customer_site',
                    type: ControlKeys.Model,
                    model: Models.Site,
                    controls: [{
                        param: 'site',
                        pdf: { 0: [{ x: 225, y: 330, size: 15 }] },
                        required: true,
                    }]
                },
                {
                    param: 'machine',
                    type: ControlKeys.Model,
                    model: Models.Machine,
                    controls: [
                        {
                            param: 'machine_id',
                            pdf: { 0: [{ x: 70, y: 235, size: 15 }] },
                        },
                        {
                            param: 'machine_make',
                            pdf: { 0: [{ x: 225, y: 235, size: 15 }] },
                            required: true,
                        },
                        {
                            param: 'machine_model',
                            pdf: { 0: [{ x: 400, y: 235, size: 15 }] },
                            required: true,
                        },
                        {
                            param: 'machine_sn',
                            pdf: { 0: [{ x: 70, y: 180, size: 15 }] },
                            required: true,
                        },
                        {
                            param: 'machine_rego',
                            pdf: { 0: [{ x: 225, y: 180, size: 15 }] },
                            required: true,
                        },
                        {
                            param: 'machine_smu',
                            pdf: { 0: [{ x: 400, y: 180, size: 15 }] },
                            required: true,
                        },
                    ]
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
                        param: 'cab_checklist',
                        type: ControlKeys.Looper,
                        setLength: 20,
                        value: [{ 'name': 'Doors/Locks' }
                            , { 'name': 'Windows' }
                            , { 'name': 'Mirrors' }
                            , { 'name': 'Operator Seat' }
                            , { 'name': 'Seat Belts' }
                            , { 'name': 'A/C Filters' }
                            , { 'name': 'A/C Operation, Temp' }
                            , { 'name': 'UHF/ Digital Radio - Radio Power Supply Hardwired', '{}': { height: 26 } }
                            , { 'name': 'AM/FM Radio' }
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
                            , { 'name': 'Joysticks' }
                        ],
                        pdf: { 1: [{ x: 181, y: 436, width: 387, height: 293 }] },
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
                                pdf: { 1: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 1: [{ x: 103, y: 0, width: 284 }] },
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
                            , { 'name': 'Air Filters/Pipes' }
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
                        pdf: { 1: [{ x: 181, y: 73, width: 387, height: 350 }] },
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
                                pdf: { 1: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 1: [{ x: 103, y: 0, width: 284 }] },
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
                            , { 'name': 'Boom Cylinders' }
                            , { 'name': 'Stick Cylinder' }
                            , { 'name': 'Bucket Cylinder' }
                            , { 'name': 'PTO Shaft & Coupling, Safety guards', '{}': { height: 26 } }
                            , { 'name': 'Hyd / Trans cooler / mounts' }
                            , { 'name': 'Hose Condition / Clamps / P clamps' }
                        ],
                        pdf: { 2: [{ x: 186, y: 591, width: 387, height: 153 }] },
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
                                pdf: { 2: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 2: [{ x: 103, y: 0, width: 284 }] },
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
                        pdf: { 2: [{ x: 186, y: 479, width: 387, height: 84 }] },
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
                                pdf: { 2: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 2: [{ x: 103, y: 0, width: 284 }] },
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
                param: 'pto_collapse',
                type: ControlKeys.Collapse,
                label: 'PTO',
                controls:
                    [{
                        param: 'pto_checklist',
                        type: ControlKeys.Looper,
                        setLength: 3,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Oil leaks' }
                            , { 'name': 'Mounting Points' }
                        ],
                        pdf: { 2: [{ x: 186, y: 423, width: 387, height: 42 }] },
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
                                pdf: { 2: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 2: [{ x: 103, y: 0, width: 284 }] },
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
                param: 'swingmotor_collapse',
                type: ControlKeys.Collapse,
                label: 'Swing Motor / Transmissions',
                controls:
                    [{
                        param: 'swingmotor_checklist',
                        type: ControlKeys.Looper,
                        setLength: 4,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Oil Leaks' }
                            , { 'name': 'Mountings' }
                            , { 'name': 'Hose Condition / Clamps / P clamps' }
                        ],
                        pdf: { 2: [{ x: 186, y: 339, width: 387, height: 56 }] },
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
                                pdf: { 2: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 2: [{ x: 103, y: 0, width: 284 }] },
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
                        pdf: { 2: [{ x: 190, y: 227, width: 387, height: 84 }] },
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
                                pdf: { 2: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 2: [{ x: 103, y: 0, width: 284 }] },
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
                        setLength: 11,
                        value: [{ 'name': 'Fire Extinguisher Date' }
                            , { 'name': '2nd Fire Extinguisher Date' }
                            , { 'name': 'Fire Suppression System / Date' }
                            , { 'name': 'Fire Suppression Bottle / Date' }
                            , { 'name': 'Boom Pins / Bushes' }
                            , { 'name': 'Stick Pins / Bushes' }
                            , { 'name': 'Quick Hitch / Pins / Safety Pin' }
                            , { 'name': 'Bucket Pins / Bushes' }
                            , { 'name': 'Bucket Linkages Pins / Bushes' }
                            , { 'name': 'Auto Greaser / Level / Lines' }
                            , { 'name': 'Swing Bearing Deflection' }
                        ],
                        pdf: { 3: [{ x: 190, y: 590, width: 387, height: 154 }] },
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
                                pdf: { 3: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 3: [{ x: 103, y: 0, width: 284 }] },
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
                        param: 'electrics_checklist',
                        type: ControlKeys.Looper,
                        setLength: 10,
                        value: [{ 'name': 'Batteries and Clamps\nRubber over battery\nAcid level\Cables', '{}': { height: 30 } }
                            , { 'name': 'Work lights' }
                            , { 'name': 'Travel alarm' }
                            , { 'name': 'Beacon' }
                            , { 'name': 'Horn' }
                            , { 'name': 'Gauges / Warning Lights / Alarms' }
                            , { 'name': 'Kickouts' }
                            , { 'name': 'Tilt' }
                            , { 'name': 'Boom' }
                            , { 'name': 'Relays / Fuses / Breakers' }
                        ],
                        pdf: { 3: [{ x: 190, y: 408, width: 387, height: 156 }] },
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
                                pdf: { 3: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 3: [{ x: 103, y: 0, width: 284 }] },
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
                        pdf: { 3: [{ x: 190, y: 268, width: 387, height: 126 }] },
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
                                pdf: { 3: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 3: [{ x: 103, y: 0, width: 284 }] },
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
                        param: 'get_checklist',
                        type: ControlKeys.Looper,
                        setLength: 8,
                        value: [ { 'name': 'Bucket N#' }
                                ,{ 'name': 'Bucket Teeth / Adapters' }
                                ,{ 'name': 'Bucket condition' }
                                ,{ 'name': 'Cutting edge', '{}': { height: 26 } }
                                ,{ 'name': '2nd Bucket N#' }
                                ,{ 'name': 'Bucket Teeth / Adapters' }
                                ,{ 'name': 'Bucket condition' }
                                ,{ 'name': 'Cutting edge' }
                                ],
                        pdf: { 3: [{ x: 190, y: 135, width: 387, height: 125 }] },
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
                                pdf: { 3: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 3: [{ x: 103, y: 0, width: 284 }] },
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
                        value: [ { 'name': 'Teeth' }
                                ,{ 'name': 'Lip Protectors' }
                                ,{ 'name': 'Heel Blocks' }
                                ],
                        pdf: { 6: [{ x: 395, y: 168, width: 387, height: 63 }] },
                        grid: { 6: [{ width: 387, height: 21 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'selector',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'New', value: 'New', pdf: { x: 35 }, renderValue: true },
                                    { label: '< 50% Worn', value: '< 50% Worn', pdf: { x: 87 }, renderValue: true },
                                    { label: '> 50% Worn', value: '> 50% Worn', pdf: { x: 148 }, renderValue: true },
                                ],
                                pdf: { 6: [{ y: 0 }] },
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
                        param: 'fitout_checklist',
                        type: ControlKeys.Looper,
                        setLength: 25,
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
                            , { 'name': 'Fire Suppression Shut Down Working', '{}': { height: 28 } }
                            , { 'name': 'Battery Isolator Working' }
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
                        pdf: { 4: [{ x: 183, y: 366, width: 390, height: 364 }] },
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
                                pdf: { 4: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 4: [{ x: 100, y: 0 }] },
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
                        pdf: { 4: [{ x: 33, y: 228, width: 540, height: 126 }] },
                        grid: { 4: [{ width: 540, height: 14 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextField,
                                label: 'Name',
                                pdf: { 4: [{ x: 0, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'pass',
                                type: ControlKeys.Spinner,
                                controls: [
                                    { label: 'Pass', value: 'Pass', pdf: { x: 166 }, renderValue: true },
                                    { label: 'N/Fitted', value: 'N/Fitted', pdf: { x: 220 }, renderValue: true },
                                ],
                                pdf: { 4: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 4: [{ x: 250, y: 0 }] },
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
                        setLength: 10,
                        value: [{ 'name': 'Internal Areas (cabin)' }
                            , { 'name': 'External Areas - Panel/Trays etc.' }
                            , { 'name': 'Radiators and Filters' }
                            , { 'name': 'Dust Bowls and Cyclones' }
                            , { 'name': 'Sump/Engine guard' }
                            , { 'name': 'Buckets / Blades / Tyres etc.' }
                            , { 'name': 'Running Gear / Bash Plates' }
                            , { 'name': 'Tyres / Wheel Arches / Tracks' }
                            , { 'name': 'Undercarriage / Other areas', '{}': { height: 56 } }
                            , { 'name': 'Vehicle wash-down completed' }
                        ],
                        pdf: { 5: [{ x: 298, y: 460, width: 258, height: 182 }] },
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
                                pdf: { 5: [{ y: 0 }] },
                                radio: true,
                                required: true,
                            },
                            {
                                param: 'comments',
                                type: ControlKeys.TextArea,
                                HeightRows: 2,
                                label: 'Comments',
                                pdf: { 5: [{ x: 97, y: 0 }] },
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
                param: 'bucket_collapse',
                type: ControlKeys.Collapse,
                label: 'Bucket Measurements',
                controls:
                    [{
                        param: 'bucket_measurements',
                        type: ControlKeys.ImageStatic,
                        value: bucket_measurements, 
                        size: { w: 1133, h: 872 }
                    },
                    {
                        param: 'bucket_measurements_spacer',
                        type: ControlKeys.Divider,
                    },
                    {
                        param: 'bucket_checklist',
                        type: ControlKeys.Looper,
                        setLength: 6,
                        value: [{ 'name': 'Left Side External' }
                            , { 'name': 'Outer Shell' }
                            , { 'name': 'Right Side External' }
                            , { 'name': 'Left Side Internal' }
                            , { 'name': 'Inner Liner' }
                            , { 'name': 'Right Side Internal' }
                        ],
                        pdf: { 6: [{ x: 190, y: 170, width: 100, height: 120 }] },
                        grid: { 6: [{ width: 100, height: 20 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextLabel,
                            },
                            {
                                param: 'thickness',
                                type: ControlKeys.TextField,
                                label: 'New Thickness (mm)',
                                pdf: { 6: [{ x: 0, y: 0 }] },
                                required: true,
                            },
                            {
                                param: 'worn',
                                type: ControlKeys.TextField,
                                label: 'Most Worn Measurement (mm)',
                                pdf: { 6: [{ x: 62, y: 0 }] },
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
                    grid: { 'A0[{}]': [{ width: 260, height: 208, margin: 6 }] },
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
                            pdf: { 'A0[{}]': [{ x: 0, y: 88, width: 260, height: 120 }] },
                            required: true,
                        },
                        {
                            param: 'inspection_attachment_comments',
                            type: ControlKeys.TextArea,
                            label: 'Comments',
                            pdf: { 'A0[{}]': [{ x: 0, y: 0, width: 260, height: 85, size: 12 }] },
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
                    pdf: { 6: [{ x: 75, y: 80, size: 15 }] },
                    required: true,
                },
                {
                    param: 'signoff_sig',
                    type: ControlKeys.Signature,
                    label: 'Signature',
                    pdf: { 6: [{ x: 385, y: 68, width: 150, height: 55 }] },
                    required: true,
                },
            ],
        },
    ],
}