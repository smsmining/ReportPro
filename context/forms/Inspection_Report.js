import { ControlKeys, Models } from "./_config";

export default Inspection_Report =
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
                    required: true,
                },
                {
                    param: 'inspector',
                    type: ControlKeys.TextField,
                    label: 'Inspector',
                    pdf: { 0: [{ x: 355, y: 677, width: 100, height: 15, size: 14 }] },
                    required: true,
                },
                {
                    param: 'location',
                    type: ControlKeys.Model,
                    model: Models.Site,
                    controls: [{
                        param: 'site',
                        label: 'Location',
                        pdf: { 0: [{ x: 75, y: 640, width: 200, height: 15, size: 14 }] },
                        required: true,
                    }]
                },
                {
                    param: 'pin_vin',
                    type: ControlKeys.TextField,
                    label: 'Pin / Vin',
                    pdf: { 0: [{ x: 115, y: 717, width: 150, height: 15, size: 14 }] },
                    required: true,
                },
                {
                    param: 'rep_no',
                    type: ControlKeys.TextField,
                    label: 'Report Number',
                    pdf: { 0: [{ x: 355, y: 717, width: 150, height: 15, size: 14 }] },
                    required: true,
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
                    required: true,
                },
                {
                    param: 'customer_phone',
                    type: ControlKeys.TextField,
                    label: 'Phone',
                    pdf: { 0: [{ x: 400, y: 585, width: 150, height: 15, size: 14 }] },
                    required: true,
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
                    param: 'machine',
                    type: ControlKeys.Model,
                    model: Models.Machine,
                    controls: [
                        {
                            param: 'machine_id',
                            pdf: { 0: [{ x: 442, y: 535, width: 120, height: 15, size: 14 }]
                                , 'A0': [{ x: 436, y: 80, width: 110, height: 15, size: 12 }]
                                },
                        },
                        {
                            param: 'machine_make',
                            hidden: true,
                        },
                        {
                            param: 'machine_model',
                            pdf: {0: [{ x: 200, y: 535, width: 85, height: 15, size: 14 }]
                                ,'A0': [{ x: 192, y: 80, width: 110, height: 15, size: 12 }]
                                },
                            required: true,
                        },
                        {
                            param: 'machine_sn',
                            pdf: { 0: [{ x: 292, y: 535, width: 140, height: 15, size: 14 }]
                                , 'A0': [{ x: 309, y: 80, width: 110, height: 15, size: 12 }]
                                },
                            required: true,
                        },
                        {
                            param: 'machine_rego',
                            pdf: { 0: [{ x: 82, y: 535, width: 110, height: 15, size: 14 }]
                                , 'A0': [{ x: 73, y: 80, width: 110, height: 15, size: 12 }]
                            },
                            required: true,
                        },
                        {
                            param: 'machine_smu',
                            hidden: true,
                        },
                    ]
                },
                {
                    param: 'machine_time_inspection',
                    type: ControlKeys.TextField,
                    label: 'Inspection Time Limit',
                    keyboard: 'decimal-pad',
                    pdf: { 0: [{ x: 75, y: 498, width: 110, height: 13, size: 12 }] },
                    required: true,
                },
                {
                    param: 'machine_hours_operated',
                    type: ControlKeys.TextField,
                    label: 'Operated Hours',
                    keyboard: 'decimal-pad',
                    pdf: { 0: [{ x: 75, y: 465, width: 110, height: 13, size: 12 }] },
                    required: true,
                },
                {
                    param: 'machine_hours_latest',
                    type: ControlKeys.TextField,
                    label: 'Latest Hour',
                    keyboard: 'decimal-pad',
                    pdf: { 'A0': [{ x: 125, y: 47, width: 110, height: 15, size: 12 }] },
                    required: true,
                },
                {
                    param: 'machine_time_delivery',
                    type: ControlKeys.TextField,
                    label: 'Time Since Delivery',
                    pdf: { 0: [{ x: 355, y: 465, width: 110, height: 13, size: 12 }]
                            ,'A0': [{ x: 345, y: 47, width: 110, height: 15, size: 12 }]
                            },
                    required: true,
                },
                {
                    param: 'machine_repair',
                    type: ControlKeys.TextField,
                    label: 'Emergency Repair',
                    pdf: { 0: [{ x: 75, y: 420, width: 110, height: 13, size: 12 }] },
                    required: true,
                },
                {
                    param: 'machine_condition',
                    type: ControlKeys.TextField,
                    label: 'Condition',
                    pdf: { 0: [{ x: 355, y: 420, width: 110, height: 13, size: 12 }] },
                    required: true,
                },
                {
                    param: 'machine_result',
                    type: ControlKeys.TextArea,
                    label: 'Inspection Result',
                    pdf: { 0: [{ x: 43, y: 290, width: 520, height: 90, size: 12 }] },
                    required: true,
                },
                {
                    param: 'machine_image',
                    type: ControlKeys.ImageSelect,
                    label: 'Image',
                    pdf: { 0: [{ x: 157, y: 50, width: 300, height: 175 }] },
                    required: true,
                },
            ],
        },
        {
            type: ControlKeys.Tab,
            label: 'Actions',
            icon: 'check-square-o',
            controls: [
                {
                    param: 'attachment_page',
                    type: ControlKeys.Looper,
                    label: '+ Add Action',
                    pdf: { 'A0[{}]': [{ x: 32, y: 125, width: 532, height: 650 }] },
                    grid: { 'A0[{}]': [{ width: 260, height: 208, margin: 6 }] },
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
                            pdf: { 'A0[{}]': [{ x: 100, y: 75, width: 160, height: 13, size: 12 }] },
                            required: true,
                        },
                        {
                            param: 'inspection_attachment_severity',
                            type: ControlKeys.Spinner,
                            label: 'Severity',
                            pdf: { 'A0[{}]': [{ x: 0, y: 75, width: 95, height: 13, size: 12 }] },
                            controls: [
                                {label: "Normal", value: "Normal:", pdf: { backgroundColor: "#99FF33" }},
                                {label: "Watch Close", value: "Watch Closely:", pdf: { backgroundColor: "#FF9933" }},
                                {label: "Attention", value: "Attention:", pdf: { backgroundColor: "#FF3333" }},
                                {label: "Failure", value: "Failure:", pdf: { backgroundColor: "#FF3333" }},
                                ],
                            radio: true,
                            required: true,
                        },
                        {
                            param: 'inspection_attachment_image',
                            type: ControlKeys.ImageSelect,
                            label: 'Image',
                            pdf: { 'A0[{}]': [{ x: 0, y: 88, width: 260, height: 120 }] },
                            required: true,
                        },
                        {
                            param: 'inspection_attachment_comments',
                            type: ControlKeys.TextArea,
                            label: 'Comments',
                            pdf: { 'A0[{}]': [{ x: 0, y: 0, width: 260, height: 75, size: 12 }] },
                        },
                    ],
                },
            ],
        },
    ],
}