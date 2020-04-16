import { ControlKeys, Models } from "./_config";

export default SMS_MN_INS_0004_01 =
{
    guid: "00000000-0000-0000-0000-000000000007",
    name: 'Mech & Safety Inspection General',
    pdfname: 'SMS-MN-INS-0004_01 Mechanical and Safety Inspection - General',
    version: 'SMS-MN-INS-0004_01',
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
                }
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
                            setLength: 17,
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
                                , { 'name': 'Cab Detailed\Cleaned' }
                                , { 'name': 'Heater Tested - Hot' }
                                , { 'name': 'Hour Meter' }
                            ],
                            pdf: { 1: [{ x: 186, y: 466, width: 387, height: 263 }] },
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
                                    ,{ 'name': 'Oil Leaks' }
                                    ,{ 'name': 'Oil Filter' }
                                    ,{ 'name': 'Air Filters/Pipes' }
                                    ,{ 'name': 'Fuel Filter, Pipes & Hoses' }
                                    ,{ 'name': 'Fuel Level' }
                                    ,{ 'name': 'Coolant Level' }
                                    ,{ 'name': 'Coolant Leaks' }
                                    ,{ 'name': 'Inhibitor Condition' }
                                    ,{ 'name': 'Fan, Water Pump & A/C belts' }
                                    ,{ 'name': 'Alternator & Bracket' }
                                    ,{ 'name': 'Starter Motor' }
                                    ,{ 'name': 'Turbo' }
                                    ,{ 'name': 'Air Compressor' }
                                    ,{ 'name': 'A/Con compressor & Mount' }
                                    ,{ 'name': 'Engine mounts' }
                                    ,{ 'name': 'Radiator & mounts' }
                                    ,{ 'name': 'Radiator pipes & hoses' }
                                    ,{ 'name': 'Exhaust system' }
                                    ,{ 'name': 'Charge air cooler & pipes' }
                                    ,{ 'name': 'EVB operation' }
                                    ,{ 'name': 'Fan Guards' }
                                    ,{ 'name': 'Safety Decals' }
                                    ,{ 'name': 'Paint' }
                                    ,{ 'name': 'Heater Taps On - No Leaks' }
                                    ],
                            pdf: { 1: [{ x: 186, y: 116, width: 387, height: 350 }] },
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
                            setLength: 15,
                            value: [{ 'name': 'Oil Level' }
                                , { 'name': 'Hyd. Tank condition' }
                                , { 'name': 'Hyd. Pump operation' }
                                , { 'name': 'Control Valves/Leaks' }
                                , { 'name': 'Lift/Tip/Boom Cylinders' }
                                , { 'name': 'Dipper Arm Cylinder' }
                                , { 'name': 'Bucket Cylinder' }
                                , { 'name': 'Side shift Cylinders' }
                                , { 'name': 'Wheel lean Cylinders' }
                                , { 'name': 'Steering Cylinders' }
                                , { 'name': 'Water Cannon Cylinders' }
                                , { 'name': 'PTO Shaft & Coupling, Safety guards', '{}': { height: 26 } }
                                , { 'name': 'Hyd/Trans cooler/mounts' }
                                , { 'name': 'Wet Brake cooler/mounts' }
                                , { 'name': 'Hose Condition/Clamps/P clamps' }
                            ],
                            pdf: { 2: [{ x: 190, y: 521, width: 387, height: 223 }] },
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
                            setLength: 7,
                            value: [{ 'name': 'Oil Level' }
                                , { 'name': 'Oil leaks' }
                                , { 'name': 'Prop Shaft & Uni\'s' }
                                , { 'name': 'Operation' }
                                , { 'name': 'Retarder' }
                                , { 'name': 'Electrical connections' }
                                , { 'name': 'Shift levers/Pad' }
                            ],
                            pdf: { 2: [{ x: 190, y: 396, width: 387, height: 98 }] },
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
                            pdf: { 2: [{ x: 190, y: 341, width: 387, height: 42 }] },
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
                    param: 'rego_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Road Registered',
                    controls:
                        [{
                            param: 'rego_checklist',
                            type: ControlKeys.Looper,
                            setLength: 5,
                            value: [{ 'name': 'Jack' }
                                , { 'name': 'Wheel Brace' }
                                , { 'name': 'Spare Tyre Removal Brace' }
                                , { 'name': 'Road Triangles' }
                                , { 'name': 'First Aid Kit' }
                            ],
                            pdf: { 2: [{ x: 190, y: 257, width: 387, height: 70 }] },
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
                    param: 'brakes_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Brakes',
                    controls:
                        [{
                            param: 'brakes_checklist',
                            type: ControlKeys.Looper,
                            setLength: 8,
                            value: [{ 'name': 'Oil/Fluid Level' }
                                , { 'name': 'Actuators' }
                                , { 'name': 'Brake Peddle' }
                                , { 'name': 'Hose/Pipes' }
                                , { 'name': 'Park Brake' }
                                , { 'name': 'Park Brake Pad Wear' }
                                , { 'name': 'Park Brake Disc Thickness (mm)' }
                                , { 'name': 'Brake test & record' }
                            ],
                            pdf: { 2: [{ x: 190, y: 132, width: 387, height: 112 }] },
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
                    param: 'axles_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Axles',
                    controls:
                        [{
                            param: 'axles_checklist',
                            type: ControlKeys.Looper,
                            setLength: 4,
                            value: [{ 'name': 'Front Axle/Diff/Planetary' }
                                    ,{ 'name': 'Mid Axle/Diff/Planetary' }
                                    ,{ 'name': 'Rear Axle/Diff/Planetary' }
                                    ,{ 'name': 'Prop shafts' }
                                    ],
                            pdf: { 3: [{ x: 190, y: 688, width: 387, height: 56 }] },
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
                    param: 'body_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Body Condition',
                    controls:
                        [{
                            param: 'body_checklist',
                            type: ControlKeys.Looper,
                            setLength: 5,
                            value: [{ 'name': 'Front Machine Panels' }
                                    ,{ 'name': 'Rear Machine Panels' }
                                    ,{ 'name': 'Side panels' }
                                    ,{ 'name': 'Paint Condition' }
                                    ,{ 'name': 'Asset ID Fitted - Front, Side, Rear' }
                                    ],
                            pdf: { 3: [{ x: 190, y: 604, width: 387, height: 70 }] },
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
                    param: 'suspension_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Suspension',
                    controls:
                        [{
                            param: 'suspension_checklist',
                            type: ControlKeys.Looper,
                            setLength: 5,
                            value: [{ 'name': 'Front struts/Level (mm)' }
                                    ,{ 'name': 'Middle axle suspension' }
                                    ,{ 'name': 'Rear axle suspension' }
                                    ,{ 'name': 'Rods & Links' }
                                    ,{ 'name': 'A Frame movement' }
                                    ],
                            pdf: { 3: [{ x: 190, y: 520, width: 387, height: 70 }] },
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
                    param: 'frame_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Frame / Artic',
                    controls:
                        [{
                            param: 'frame_checklist',
                            type: ControlKeys.Looper,
                            setLength: 5,
                            value: [{ 'name': 'Steering Linkages' }
                                    ,{ 'name': 'Fire Extinguisher Date' }
                                    ,{ 'name': '2nd Fire Extinguisher Date' }
                                    ,{ 'name': 'Fire Suppression System / Date' }
                                    ,{ 'name': 'Fire Suppression Bottle / Date' }
                                    ,{ 'name': 'Rear frame' }
                                    ,{ 'name': 'Auto Greaser/Level/Lines' }
                                    ,{ 'name': 'Cab Jack' }
                                    ],
                            pdf: { 3: [{ x: 190, y: 394, width: 387, height: 112 }] },
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
                            setLength: 12,
                            value: [
                                 { 'name': 'Batteries and Clamps\nRubber over battery\nAcid level\Cables', '{}': { height: 30 } }
                                ,{ 'name': 'Headlights' }
                                ,{ 'name': 'Work lights' }
                                ,{ 'name': 'Indicators' }
                                ,{ 'name': 'Brake lights' }
                                ,{ 'name': 'Reverse / Travel alarm' }
                                ,{ 'name': 'Reverse Lights' }
                                ,{ 'name': 'Beacon' }
                                ,{ 'name': 'Horn' }
                                ,{ 'name': 'Gauges/Warning Lights/Alarms' }
                                ,{ 'name': 'Relays/Fuses/Breakers' }
                                ,{ 'name': 'Tyre Pressures' }
                                ],
                            pdf: { 3: [{ x: 190, y: 187, width: 387, height: 184 }] },
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
                    param: 'braketest_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Brake Function Test',
                    controls:
                        [{
                            param: 'braketest_checklist',
                            type: ControlKeys.Looper,
                            setLength: 3,
                            value: [{ 'name': 'P/Brake Hold RPM' }
                                    ,{ 'name': 'Service Brake Hold RPM' }
                                    ,{ 'name': 'Combined Brake Hold RPM' }
                                    ],
                            pdf: { 3: [{ x: 190, y: 132, width: 387, height: 42 }] },
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
                    param: 'tyre_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Tyre Inspection',
                    controls:
                        [{
                            param: 'tyre_checklist',
                            type: ControlKeys.Looper,
                            setLength: 8,
                            pdf: { 4: [{ x: 132, y: 622, width: 440, height: 112 }] },
                            grid: { 4: [{ width: 440, height: 14 }] },
                            controls:
                                [{
                                    param: 'header',
                                    type: ControlKeys.Divider,
                                    label: 'Wheel Position {} '
                                },
                                {
                                    param: 'depth',
                                    type: ControlKeys.TextField,
                                    label: 'Depth',
                                    pdf: { 4: [{ x: 3, y: 0 }] },
                                    required: true,
                                },
                                {
                                    param: 'comments',
                                    type: ControlKeys.TextArea,
                                    HeightRows: 2,
                                    label: 'Comments',
                                    pdf: { 4: [{ x: 118, y: 0 }] },
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
                            setLength: 26,
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
                                , { 'name': 'Wheel Chocks/ brackets' }
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
                            pdf: { 4: [{ x: 183, y: 214, width: 390, height: 378 }] },
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
                            pdf: { 4: [{ x: 33, y: 75, width: 540, height: 126 }] },
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
                    pdf: { 5: [{ x: 75, y: 140, size: 15 }] },
                    required: true,
                },
                {
                    param: 'signoff_sig',
                    type: ControlKeys.Signature,
                    label: 'Signature',
                    pdf: { 5: [{ x: 320, y: 75, width: 150, height: 75 }] },
                    required: true,
                },
            ],
        },
    ],
}