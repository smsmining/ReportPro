import { ControlKeys } from "../../components/ControlItem";
import { SiteSpinner } from "./siteSpinner";

const tray_measurements = "data:image/png;base64,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"

export default SMS_MN_INS_0008_01 =
{
    guid: "00000000-0000-0000-0000-000000000011",
    name: 'Mech & Safety Inspection Dump Truck',
    pdfname: 'SMS-MN-INS-0008_01 Mechanical and Safety Inspection - Dump Truck',
    version: 'SMS-MN-INS-0008_01',
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
                },
                {
                    param: 'inspection_location',
                    type: ControlKeys.TextField,
                    label: 'Location',
                    pdf: { 0: [{ x: 225, y: 415, size: 15 }] },
                },
                {
                    param: 'inspection_inspector',
                    type: ControlKeys.TextField,
                    label: 'Inspector',
                    pdf: { 0: [{ x: 400, y: 415, size: 15 }] },
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
                },
                {
                    ...SiteSpinner,
                    param: 'customer_site',
                    label: 'Site',
                    pdf: { 0: [{ x: 225, y: 330, size: 15 }] },
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
                },
                {
                    param: 'machine_make',
                    type: ControlKeys.TextField,
                    label: 'Make',
                    pdf: { 0: [{ x: 225, y: 235, size: 15 }] },
                },
                {
                    param: 'machine_model',
                    type: ControlKeys.TextField,
                    label: 'Model',
                    pdf: { 0: [{ x: 400, y: 235, size: 15 }] },
                },
                {
                    param: 'machine_sn',
                    type: ControlKeys.TextField,
                    label: 'Serial No.',
                    pdf: { 0: [{ x: 70, y: 180, size: 15 }] },
                },
                {
                    param: 'machine_rego',
                    type: ControlKeys.TextField,
                    label: 'Rego No.',
                    pdf: { 0: [{ x: 225, y: 180, size: 15 }] },
                },
                {
                    param: 'machine_smu',
                    type: ControlKeys.TextField,
                    label: 'SMU Reading',
                    pdf: { 0: [{ x: 400, y: 180, size: 15 }] },
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
                        value: [{ 'name': 'Doors/Locks' }
                            , { 'name': 'Windows' }
                            , { 'name': 'Mirrors' }
                            , { 'name': 'Operator Seat' }
                            , { 'name': 'Seat Belts' }
                            , { 'name': 'A/C Filters' }
                            , { 'name': 'A/C Operation, Temp' }
                            , { 'name': 'UHF/ Digital Radio - Radio Power Supply Hardwired' }
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
                            , { 'name': 'Cab Detailed\Cleaned' }
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
                        setLength: 26,
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
                            , { 'name': 'Check intake system for leaks' }
                        ],
                        pdf: { 1: [{ x: 181, y: 73, width: 387, height: 364 }] },
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
                        setLength: 8,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Hyd. Tank condition' }
                            , { 'name': 'Hyd. Pump operation' }
                            , { 'name': 'Control Valves / Leaks' }
                            , { 'name': 'Lift / Tip / Boom / Hoist Cylinders' }
                            , { 'name': 'Steering Cylinders' }
                            , { 'name': 'Water Cannon Cylinders' }
                            , { 'name': 'PTO Shaft & Coupling, Safety guards' }
                        ],
                        pdf: { 2: [{ x: 186, y: 632, width: 387, height: 112 }] },
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
                        setLength: 3,
                        value: [{ 'name': 'Hyd / Trans cooler / mounts' }
                            , { 'name': 'Wet Brake cooler / mounts' }
                            , { 'name': 'Hose Condition / Clamps / P clamps' }
                        ],
                        pdf: { 2: [{ x: 186, y: 577, width: 387, height: 42 }] },
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
                        param: 'hydraulics_checklist_c',
                        type: ControlKeys.Looper,
                        setLength: 2,
                        value: [{ 'name': 'HMU for leaks' }
                            , { 'name': 'Check Emergency Steering' }
                        ],
                        pdf: { 2: [{ x: 186, y: 535, width: 387, height: 28 }] },
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
                        setLength: 7,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Oil leaks' }
                            , { 'name': 'Prop Shaft & Uni\'s' }
                            , { 'name': 'Operation' }
                            , { 'name': 'Retarder' }
                            , { 'name': 'Electrical connections' }
                            , { 'name': 'Shift levers/Pad' }
                        ],
                        pdf: { 2: [{ x: 186, y: 423, width: 387, height: 98 }] },
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
                        pdf: { 2: [{ x: 186, y: 369, width: 387, height: 42 }] },
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
                        setLength: 8,
                        value: [{ 'name': 'Oil / Fluid Level' }
                            , { 'name': 'Actuators' }
                            , { 'name': 'Brake Peddle' }
                            , { 'name': 'Hose / Pipes' }
                            , { 'name': 'Park Brake' }
                            , { 'name': 'Park Brake Pad Wear' }
                            , { 'name': 'Park Brake Disc Thickness (mm)' }
                            , { 'name': 'Brake test & record' }
                        ],
                        pdf: { 2: [{ x: 186, y: 243, width: 387, height: 112 }] },
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
                        pdf: { 2: [{ x: 186, y: 143, width: 387, height: 84 }] },
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
                param: 'suspension_collapse',
                type: ControlKeys.Collapse,
                label: 'Suspension',
                controls:
                    [{
                        param: 'suspension_checklist',
                        type: ControlKeys.Looper,
                        setLength: 5,
                        value: [{ 'name': 'Front struts / Level (mm)' }
                            , { 'name': 'Middle axle suspension' }
                            , { 'name': 'Rear axle suspension' }
                            , { 'name': 'Rods & Links' }
                            , { 'name': 'A Frame movement' }
                        ],
                        pdf: { 3: [{ x: 190, y: 674, width: 387, height: 70 }] },
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
                        setLength: 6,
                        value: [{ 'name': 'Steering Linkages' }
                            , { 'name': 'Fire Extinguisher Date' }
                            , { 'name': '2nd Fire Extinguisher Date' }
                            , { 'name': 'Fire Suppression System / Date' }
                            , { 'name': 'Fire Suppression Bottle / Date' }
                            , { 'name': 'Auto Greaser / Level / Lines' }
                            ],
                        pdf: { 3: [{ x: 190, y: 576, width: 387, height: 84 }] },
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
                        pdf: { 3: [{ y: 548 }] },
                        radio: true,
                    },
                    {
                        param: 'electrics_checklist_comments_batt',
                        type: ControlKeys.TextArea,
                        HeightRows: 2,
                        label: 'Comments',
                        pdf: { 3: [{ x: 293, y: 548, width: 284 }] },
                    },
                    {
                        param: 'electrics_checklist_spacer_batt',
                        type: ControlKeys.Divider,
                    },
                    {
                        param: 'electrics_checklist',
                        type: ControlKeys.Looper,
                        setLength: 12,
                        value: [{ 'name': 'Headlights' }
                            , { 'name': 'Work lights' }
                            , { 'name': 'Indicators' }
                            , { 'name': 'Brake lights' }
                            , { 'name': 'Reverse alarm' }
                            , { 'name': 'Reverse Lights' }
                            , { 'name': 'Beacon' }
                            , { 'name': 'Horn' }
                            , { 'name': 'Gauges/Warning Lights / Alarms' }
                            , { 'name': 'Kickouts' }
                            , { 'name': 'Tray Float' }
                            , { 'name': 'Relays / Fuses / Breakers' }
                        ],
                        pdf: { 3: [{ x: 190, y: 354, width: 387, height: 168 }] },
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
                param: 'braketest_collapse',
                type: ControlKeys.Collapse,
                label: 'Brake Test',
                controls:
                    [{
                        param: 'braketest_checklist',
                        type: ControlKeys.Looper,
                        setLength: 3,
                        value: [{ 'name': 'P/Brake Hold RPM' }
                            , { 'name': 'Service Brake Hold RPM' }
                            , { 'name': 'Combined Brake Hold RPM' }
                        ],
                        pdf: { 3: [{ x: 190, y: 298, width: 387, height: 42 }] },
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
                        pdf: { 4: [{ x: 33, y: 228, width: 540, height: 126 }] },
                        grid: { 4: [{ width: 540, height: 14 }] },
                        controls:
                            [{
                                param: 'name',
                                type: ControlKeys.TextField,
                                label: 'Name',
                                pdf: { 0: [{ x: 0, y: 0 }] },
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
                param: 'tray_collapse',
                type: ControlKeys.Collapse,
                label: 'Tray Measurements',
                controls:
                    [{
                        param: 'tray_measurements',
                        type: ControlKeys.ImageStatic,
                        value: tray_measurements, 
                        size: { w: 796, h: 557 }
                    },
                    {
                        param: 'tray_measurements_spacer',
                        type: ControlKeys.Divider,
                    },
                    {
                        param: 'tray_checklist',
                        type: ControlKeys.Looper,
                        setLength: 10,
                        value: [{ 'name': 'HB-1' }
                            , { 'name': 'FL-1' }
                            , { 'name': 'FL-2' }
                            , { 'name': 'FL-3' }
                            , { 'name': 'LS-1' }
                            , { 'name': 'LS-2' }
                            , { 'name': 'LST-1' }
                            , { 'name': 'RS-1' }
                            , { 'name': 'RS-2' }
                            , { 'name': 'RST-1' }
                        ],
                        pdf: { 7: [{ x: 240, y: 187, width: 258, height: 180 }] },
                        grid: { 7: [{ width: 258, height: 18 }] },
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
                            },
                            {
                                param: 'worn',
                                type: ControlKeys.TextField,
                                label: 'Most Worn Measurement (mm)',
                                pdf: { 0: [{ x: 100, y: 0 }] },
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
                label: 'Tyre Inspections',
                controls:
                    [{
                        param: 'tyre_details_header',
                        type: ControlKeys.Divider,
                        label: 'Tyre Details', 
                    },
                    {
                        param: 'tyre_details_checklist',
                        type: ControlKeys.Looper,
                        setLength: 6,
                        pdf: { 6: [{ x: 208, y: 378, width: 582, height: 145 }] },
                        grid: { 6: [{ width: 97, height: 145 }] },
                        controls:
                            [{
                                param: 'header',
                                type: ControlKeys.Divider,
                                label: 'Position {}'
                            },
                            {
                                param: 'size',
                                type: ControlKeys.TextField,
                                label: 'Tyre Size',
                                pdf: { 0: [{ x: 2, y: 132 }] },
                            },
                            {
                                param: 'brand',
                                type: ControlKeys.TextField,
                                label: 'Brand',
                                pdf: { 0: [{ x: 2, y: 117 }] },
                            },
                            {
                                param: 'pattern',
                                type: ControlKeys.TextField,
                                label: 'Pattern',
                                pdf: { 0: [{ x: 2, y: 102 }] },
                            },
                            {
                                param: 'spec',
                                type: ControlKeys.TextField,
                                label: 'Spec',
                                pdf: { 0: [{ x: 2, y: 85 }] },
                            },
                            {
                                param: 'tread_inner',
                                type: ControlKeys.TextField,
                                label: 'Inner Depth (mm)',
                                pdf: { 0: [{ x: 2, y: 68, width: 45 }] },
                            },
                            {
                                param: 'tread_outer',
                                type: ControlKeys.TextField,
                                label: 'Outer Depth (mm)',
                                pdf: { 0: [{ x: 50, y: 68, width: 47 }] },
                            },
                            {
                                param: 'tread_avg',
                                type: ControlKeys.TextField,
                                label: 'Avg. Depth (mm)',
                                pdf: { 0: [{ x: 2, y: 51 }] },
                            },
                            {
                                param: 'tyre_sn',
                                type: ControlKeys.TextField,
                                label: 'Tyre SN',
                                pdf: { 0: [{ x: 2, y: 34 }] },
                            },
                            {
                                param: 'rim_sn',
                                type: ControlKeys.TextField,
                                label: 'Rim SN',
                                pdf: { 0: [{ x: 2, y: 17 }] },
                            },
                            {
                                param: 'pressure',
                                type: ControlKeys.TextField,
                                label: 'Pressure',
                                pdf: { 0: [{ x: 2, y: 2 }] },
                            },
                            {
                                param: 'spacer',
                                type: ControlKeys.Divider,
                            },
                            ]
                    },
                    {
                        param: 'tyre_issues_header',
                        type: ControlKeys.Divider,
                        label: 'Tyre Issues', 
                    },
                    {
                        param: 'tyre_issues_checklist',
                        type: ControlKeys.Looper,
                        setLength: 6,
                        pdf: { 6: [{ x: 208, y: 270, width: 582, height: 92 }] },
                        grid: { 6: [{ width: 582, height: 15.2 }] },
                        controls:
                            [{
                                param: 'header',
                                type: ControlKeys.Divider,
                                label: 'Position {}'
                            },
                            {
                                param: 'issues',
                                type: ControlKeys.TextField,
                                label: 'Issues Found',
                                pdf: { 0: [{ x: 2, y: 0 }] },
                            },
                            {
                                param: 'recommend',
                                type: ControlKeys.TextField,
                                label: 'Recommendations',
                                pdf: { 0: [{ x: 293, y: 0 }] },
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
                    pdf: { 7: [{ x: 75, y: 90, size: 15 }] },
                },
                {
                    param: 'signoff_sig',
                    type: ControlKeys.Signature,
                    label: 'Signature',
                    pdf: { 7: [{ x: 385, y: 68, width: 150, height: 55 }] },
                },
            ],
        },
    ],
}