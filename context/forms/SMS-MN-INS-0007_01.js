import { ControlKeys, SiteSpinner } from "./_config";

const blade_measurements = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA50AAACfCAYAAAB6DL3cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAYGSURBVHhe7dyNauJAGIbRglJE8f4v13WiiZM/rVvfNrHnwMfWGJNUC8ND2v3grpMxxhhjjDHGPBh4yA8NAADwXbqCjh8GAAAgTXf8IT5sAADgt+mSN+LDBAAAlk63rIgPCwAAWDtdsxDDD8KHAQAAvCPt80O8yQAAABf66AW8iQAAAF+jn77AmwQAAPAa+urMmwAAAPAz3r6/ht/gW36TAAAAK7H6Rlv1xQMAAPxBi+64RV8cAAAAT/vVzvvVkwMAAPDjoh0YPTgAAACr861O/NaLAQAA+HMeduTdJwEAAOAJo8YUmwAAALya6AQAACBGdAIAABAjOgEAAIgRnQAAAMSITgAAAGJEJwAAADGiEwAAgBjRCQAAQIzoBAAAIEZ0AgAAECM6AQAAiBGdAAAAxIhOAAAAYkQnAAAAMaITAACAGNEJAABAjOgEAAAgRnQCAAAQIzoBAACIEZ0AAADEiE4AAABiRCcAAAAxohMAAIAY0QkAAECM6AQAACBGdAIAABAjOgEAAIgRnQAAAMSITgAAAGJEJwAAADGiEwAAgBjRCQAAQIzoBAAAIEZ0AgAAECM6AQAAiBGdAAAAxIhOAAAAYkQnAAAAMaITAACAGNEJAABAjOgEAAAgRnQCAAAQIzoBAACIEZ0AAADEiE4AAABiRCcAAAAxohMAAIAY0QkAAECM6AQAACBGdAIAABAjOgEAAIgRnQAAAMSITgAAAGJEJwAAADGiEwAAgBjRCQAAQIzoBAAAIEZ0AgAAECM6AQAAiBGdAAAAxIhOAAAAYkQnAAAAMaITAACAGNEJAABAjOgEYB2Oh8Npt2nWq2q2p/3h2Kxh7fPb3eXxlP328rrhPtPH7u83t8/m89Dt0zrutr196uOUa6hfc9l3c9rtL/s017jd9/Y//zM6z+Fz09sPABaqW6ssWgAsWht9bXx1EXgNr0fReTzsT9tz3G2341gbHrtow3F4vntRWxz3u9OmCs3mvJvd6XCN4zo6h/sWU9G52ZyvuQrsQnQCsBLdWmXRAmDRpsKwCa9r0D2MzhKRZd8m9PoBN3Xs4hKel32fi87bncuhNjovETw+3mR0fu6bc9fbRScAK9GtVRYtABZtGIZzj+ei8BZ748Cc2lbUYfjo+K12v/pXZmt1RA7PV0xH5/m6BzErOgFYiW6tsmgBsGi3mKvnFmH3onAy2KpfeX0mOs+bq+nfMa018Ti4xmJue2suOtuv2+sWnQCsRLdWWbQAWLSpMKz/E5570TmKzEGEPhOdj+50DjXnrs7VRuRl+zha70Vnez3d60UnAMvXrVUWLQAWbTI6vxCF7fbzl6O5xdxMdP7H33QODV/XRmR3XYNwvBedRXtNO9EJwDp0a5VFC4BFmwrDr9zprPe5bmrUdxonj93cDb1tmzv+UDnu3DWWx3N3Lsvj4mF0trFa1m7RCcDydWuVRQuARevFVjVtBE4/fw7Asm0izh7/vWY/VOfOXwdhMd6vf5xRRF7jtr4Tei86i/Y1ohOAFejWKosWAAAAryY6AQAAiBGdAAAAxIhOAAAAYkQnAAAAMaITAACAGNEJAABAjOgEAAAgRnQCAAAQIzoBAACIEZ0AAADEiE4AAABiRCcAAAAxohMAAIAY0QkAAECM6AQAACBGdAIAABAjOgEAAIgRnQAAAMSITgAAAGJEJwAAADGiEwAAgBjRCQAAQIzoBAAAIEZ0AgAAECM6AQAAiBGdAAAAxIhOAAAAYkQnAAAAMaITAACAGNEJAABAjOgEAAAgRnQCAAAQIzoBAACIEZ0AAADEiE4AAABiRCcAAAAxohMAAIAY0QkAAECM6AQAACBGdAIAABAjOgEAAIgRnQAAAMSITgAAAGJEJwAAADGiEwAAgBjRCQAAQIzoBAAAIEZ0AgAAECM6AQAAiBGdAAAAxIhOAAAAYkQnAAAAMaITAACAGNEJAABAjOgEAAAgRnQCAAAQIzoBAACIEZ0AAADEiE4AAABiRCcAAAAxohMAAIAY0QkAAECM6AQAACBGdAIAABDTi05jjDHGGGOMMebVAwAAACkfH/8AEm7cJsqgBC8AAAAASUVORK5CYII="

export default SMS_MN_INS_0007_01 =
{
    guid: "00000000-0000-0000-0000-000000000010",
    name: 'Mech & Safety Inspection Grader',
    pdfname: 'SMS-MN-INS-0007_01 Mechanical and Safety Inspection - Grader',
    version: 'SMS-MN-INS-0007_01',
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
                        setLength: 12,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Hyd. Tank condition' }
                            , { 'name': 'Hyd. Pump operation' }
                            , { 'name': 'Control Valves / Leaks' }
                            , { 'name': 'Lift / Tip / Boom / Hoist Cylinders' }
                            , { 'name': 'Tip Cylinder' }
                            , { 'name': 'Centre Shift Cylinder' }
                            , { 'name': 'Ripper Lift Cylinder' }
                            , { 'name': 'Side shift Cylinders' }
                            , { 'name': 'Wheel lean Cylinders' }
                            , { 'name': 'Steering Cylinders' }
                            , { 'name': 'PTO Shaft & Coupling, Safety guards' }
                        ],
                        pdf: { 2: [{ x: 186, y: 576, width: 387, height: 168 }] },
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
                        setLength: 3,
                        value: [{ 'name': 'Hyd / Trans cooler / mounts' }
                            , { 'name': 'Wet Brake cooler / mounts' }
                            , { 'name': 'Hose Condition / Clamps / P clamps' }
                        ],
                        pdf: { 2: [{ x: 186, y: 520, width: 387, height: 42 }] },
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
                        param: 'hydraulics_checklist_c',
                        type: ControlKeys.Looper,
                        setLength: 2,
                        value: [{ 'name': 'HMU for leaks' }
                               ,{ 'name': 'Check Emergency Steering' }
                               ],
                        pdf: { 2: [{ x: 186, y: 478, width: 387, height: 28 }] },
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
                        setLength: 8,
                        value: [{ 'name': 'Oil Level' }
                            , { 'name': 'Oil leaks' }
                            , { 'name': 'Operation' }
                            , { 'name': 'Retarder' }
                            , { 'name': 'Electrical connections' }
                            , { 'name': 'Shift levers/Pad' }
                            , { 'name': 'Mountings' }
                            , { 'name': 'Hose Condition / Clamps / P clamps' }
                        ],
                        pdf: { 2: [{ x: 186, y: 352, width: 387, height: 112 }] },
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
                        pdf: { 2: [{ x: 186, y: 214, width: 387, height: 112 }] },
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
                param: 'axle_collapse',
                type: ControlKeys.Collapse,
                label: 'Axels',
                controls:
                    [{
                        param: 'axle_checklist',
                        type: ControlKeys.Looper,
                        setLength: 2,
                        value: [{ 'name': 'Front Axle' }
                            , { 'name': 'Tandems' }
                        ],
                        pdf: { 2: [{ x: 186, y: 172, width: 387, height: 28 }] },
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
                        setLength: 5,
                        value: [{ 'name': 'Front Machine Panels' }
                            , { 'name': 'Rear Machine Panels' }
                            , { 'name': 'Side panels' }
                            , { 'name': 'Paint Condition' }
                            , { 'name': 'Asset ID Fitted - Front, Side, Rear' }
                            ],
                        pdf: { 2: [{ x: 186, y: 88, width: 387, height: 70 }] },
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
                        setLength: 21,
                        value: [{ 'name': 'Oscillation bearings' }
                            , { 'name': 'Oscillation nut / retainers' }
                            , { 'name': 'Front Frame' }
                            , { 'name': 'Articulation Bearings / Pin Bolts' }
                            , { 'name': 'Steering Linkages' }
                            , { 'name': 'Fire Extinguisher Date' }
                            , { 'name': '2nd Fire Extinguisher Date' }
                            , { 'name': 'Fire Suppression System / Date' }
                            , { 'name': 'Fire Suppression Bottle / Date' }
                            , { 'name': 'Rear frame' }
                            , { 'name': 'Circle' }
                            , { 'name': 'Circle wear plates' }
                            , { 'name': 'Auto Greaser / Level / Lines' }
                            , { 'name': 'Circle Drive Sprocket' }
                            , { 'name': 'Circle Teeth' }
                            , { 'name': 'Blade Skin' }
                            , { 'name': 'Blade Slides' }
                            , { 'name': 'Blade Lift Caps movement' }
                            , { 'name': 'Blade tilt movement' }
                            , { 'name': 'Blade Pivot movement' }
                            , { 'name': 'Ripper movement' }
                            ],
                        pdf: { 3: [{ x: 190, y: 452, width: 387, height: 294 }] },
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
                        pdf: { 3: [{ y: 424 }] },
                        radio: true,
                        required: true,
                    },
                    {
                        param: 'electrics_checklist_comments_batt',
                        type: ControlKeys.TextArea,
                        HeightRows: 2,
                        label: 'Comments',
                        pdf: { 3: [{ x: 293, y: 424, width: 284 }] },
                    },
                    {
                        param: 'electrics_checklist_spacer_batt',
                        type: ControlKeys.Divider,
                    },
                    {
                        param: 'electrics_checklist',
                        type: ControlKeys.Looper,
                        setLength: 10,
                        value: [{ 'name': 'Headlights' }
                            , { 'name': 'Work lights' }
                            , { 'name': 'Indicators' }
                            , { 'name': 'Brake lights' }
                            , { 'name': 'Reverse alarm' }
                            , { 'name': 'Reverse Lights' }
                            , { 'name': 'Beacon' }
                            , { 'name': 'Horn' }
                            , { 'name': 'Gauges/Warning Lights / Alarms' }
                            , { 'name': 'Relays / Fuses / Breakers' }
                        ],
                        pdf: { 3: [{ x: 190, y: 256, width: 387, height: 140 }] },
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
                        pdf: { 3: [{ x: 190, y: 214, width: 387, height: 28 }] },
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
                        pdf: { 3: [{ x: 190 - 50, y: 186, width: 387 + 50, height: 28 }] },
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
                        pdf: { 6: [{ x: 243, y: 350, width: 387, height: 60 }] },
                        grid: { 6: [{ width: 387, height: 20 }] },
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
                                    { label: '< 50% Worn', value: '< 50% Worn', pdf: { x: 99 }, renderValue: true },
                                    { label: '> 50% Worn', value: '> 50% Worn', pdf: { x: 199 }, renderValue: true },
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
                        pdf: { 3: [{ x: 190, y: 130, width: 387, height: 42 }] },
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
                        pdf: { 4: [{ x: 33, y: 228, width: 540, height: 126 }] },
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
                        value: blade_measurements, 
                        size: { w: 925, h: 159 }
                    },
                    {
                        param: 'blade_measurements_spacer',
                        type: ControlKeys.Divider,
                    },
                    {
                        param: 'blade_checklist',
                        type: ControlKeys.Looper,
                        setLength: 1,
                        value: [{ 'name': 'Blade Skin' }
                               ],
                        pdf: { 6: [{ x: 282, y: 520, width: 258, height: 18 }] },
                        grid: { 6: [{ width: 258, height: 18 }] },
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
                                pdf: { 0: [{ x: 110, y: 0 }] },
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
                        pdf: { 7: [{ x: 208, y: 310, width: 582, height: 145 }] },
                        grid: { 7: [{ width: 97, height: 145 }] },
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
                                required: true,
                            },
                            {
                                param: 'brand',
                                type: ControlKeys.TextField,
                                label: 'Brand',
                                pdf: { 0: [{ x: 2, y: 117 }] },
                                required: true,
                            },
                            {
                                param: 'pattern',
                                type: ControlKeys.TextField,
                                label: 'Pattern',
                                pdf: { 0: [{ x: 2, y: 102 }] },
                                required: true,
                            },
                            {
                                param: 'spec',
                                type: ControlKeys.TextField,
                                label: 'Spec',
                                pdf: { 0: [{ x: 2, y: 85 }] },
                                required: true,
                            },
                            {
                                param: 'tread_inner',
                                type: ControlKeys.TextField,
                                label: 'Inner Depth (mm)',
                                pdf: { 0: [{ x: 2, y: 68, width: 45 }] },
                                required: true,
                            },
                            {
                                param: 'tread_outer',
                                type: ControlKeys.TextField,
                                label: 'Outer Depth (mm)',
                                pdf: { 0: [{ x: 50, y: 68, width: 47 }] },
                                required: true,
                            },
                            {
                                param: 'tread_avg',
                                type: ControlKeys.TextField,
                                label: 'Avg. Depth (mm)',
                                pdf: { 0: [{ x: 2, y: 51 }] },
                                required: true,
                            },
                            {
                                param: 'tyre_sn',
                                type: ControlKeys.TextField,
                                label: 'Tyre SN',
                                pdf: { 0: [{ x: 2, y: 34 }] },
                                required: true,
                            },
                            {
                                param: 'rim_sn',
                                type: ControlKeys.TextField,
                                label: 'Rim SN',
                                pdf: { 0: [{ x: 2, y: 17 }] },
                                required: true,
                            },
                            {
                                param: 'pressure',
                                type: ControlKeys.TextField,
                                label: 'Pressure',
                                pdf: { 0: [{ x: 2, y: 2 }] },
                                required: true,
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
                        pdf: { 7: [{ x: 208, y: 205, width: 582, height: 92 }] },
                        grid: { 7: [{ width: 582, height: 15.2 }] },
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
                    pdf: { 7: [{ x: 75, y: 90, size: 15 }] },
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