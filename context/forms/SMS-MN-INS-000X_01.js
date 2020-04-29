import { ControlKeys, Models } from "./_config";

export default SMS_MN_INS_000X_01 =
{
    guid: "00000000-0000-0000-0000-000000000013",
    name: 'Mech & Safety Inspection Attachments',
    pdfname: 'SMS-MN-INS-000X_01 Mechanical and Safety Inspection - Attachments',
    version: 'SMS-MN-INS-000X_01',
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
                    param: 'inspection_source',
                    type: ControlKeys.Spinner,
                    label: 'Origional Document',
                    controls: [
                        { label: 'General', value: 'General' },
                        { label: 'Bulldozer', value: 'Bulldozer' },
                        { label: 'Excavator', value: 'Excavator' },
                        { label: 'Grader', value: 'Grader' },
                        { label: 'Dump Truck', value: 'Dump Truck' },
                        { label: 'Wheel Loader', value: 'Wheel Loader' },
                        ],
                    pdf: { 0: [{ x: 225, y: 550, size: 30 }] },
                    required: true,
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
            label: 'Issues',
            icon: 'camera',
            controls: [
                {
                    param: 'required_attachments',
                    type: ControlKeys.Looper,
                    label: '+ Add Attachment',
                    pdf: { 'A0[{}]': [{ x: 32, y: 85, width: 532, height: 690 }] },
                    grid: { 'A0[{}]': [{ width: 532, height: 340, margin: 10 }] },
                    maxLength: 75,
                    controls: [
                        {
                            param: 'header',
                            type: ControlKeys.Divider,
                            label: 'Attachment {}',
                        },
                        {
                            param: 'label',
                            type: ControlKeys.TextField,
                            label: 'Name',
                            pdf: { 'A0[{}]': [{ x: 382, y: 294, width: 150, height: 46, size: 15 }] },
                        },
                        {
                            param: 'image',
                            type: ControlKeys.ImageSelect,
                            label: 'Image',
                            pdf: { 'A0[{}]': [{ x: 0, y: 0, width: 375, height: 340 }] },
                            required: true,
                        },
                        {
                            param: 'comments',
                            type: ControlKeys.TextArea,
                            label: 'Comments',
                            pdf: { 'A0[{}]': [{ x: 382, y: 0, width: 150, height: 294, size: 12 }] },
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
                    pdf: { 0: [{ x: 85, y: 110, size: 15 }] },
                    required: true,
                },
                {
                    param: 'signoff_sig',
                    type: ControlKeys.Signature,
                    label: 'Signature',
                    pdf: { 0: [{ x: 390, y: 65, width: 150, height: 75 }] },
                    required: true,
                },
            ],
        },
    ],
}