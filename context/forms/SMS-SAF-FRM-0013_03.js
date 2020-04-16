import { ControlKeys, Models } from "./_config";

export default SMS_SAF_FRM_0013_03 =
{
    guid: "00000000-0000-0000-0000-000000000002",
    name: 'Safe Act Observation - Mining',
    pdfname: 'SMS-SAF-FRM-0013_03 Safe Act Observation - Mining Report',
    version: 'SMS-SAF-FRM-0013_03',
    tabs: [
        {
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
                    required: true,
                },
                {
                    param: 'location',
                    type: ControlKeys.Model,
                    model: Models.Site,
                    controls: [{
                        param: 'site',
                        label: 'Location',
                        pdf: { 0: [{ x: 300, y: 765, size: 16 }] },
                        required: true,
                    }]
                },
                {
                    param: 'observer',
                    type: ControlKeys.TextField,
                    label: 'Observer',
                    pdf: { 0: [{ x: 505, y: 765, size: 16 }] },
                    required: true,
                },
                {
                    param: 'date',
                    type: ControlKeys.Date,
                    label: 'Date',
                    renderFormat: 'dd   mm   yyyy',
                    pdf: { 0: [{ x: 74, y: 745 }] },
                    required: true,
                },
                {
                    param: 'time',
                    type: ControlKeys.TextField,
                    label: 'Time',
                    pdf: { 0: [{ x: 68, y: 735, size: 14 }] },
                    required: true,
                },
            ],
        },
        {
            type: ControlKeys.Tab,
            label: 'Checklist',
            icon: 'check-square-o',
            controls: [
                {
                    param: 'risk_assessment_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Risk Assessments',
                    controls:
                        [{
                            param: 'risk_assessment_checklist',
                            type: ControlKeys.Looper,
                            setLength: 2,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 715, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 10 }] },
                            value: [{ 'action': 'JHA Completed and Being Followed' }
                                , { 'action': 'Take 5 Completed and Being Followed' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
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
                            required: true,
                        },
                        {
                            param: 'risk_assessment_compliant',
                            type: ControlKeys.TextField,
                            label: 'Risk Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 697, height: 30, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'risk_assessment_comments',
                            type: ControlKeys.TextField,
                            label: 'Risk Comments',
                            pdf: { 0: [{ x: 415, y: 697, height: 30, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'compliance_to_procedures_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Compliance to Procedures',
                    controls:
                        [{
                            param: 'compliance_to_procedures_checklist',
                            type: ControlKeys.Looper,
                            setLength: 2,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 675, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 10 }] },
                            value: [{ 'action': 'Work Area Suitable / Inspected' }
                                , { 'action': 'Hazards Identified' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
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
                            required: true,
                        },
                        {
                            param: 'compliance_to_procedures_compliant',
                            type: ControlKeys.TextField,
                            label: 'Compliance Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 644, height: 46, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'compliance_to_procedures_comments',
                            type: ControlKeys.TextField,
                            label: 'Compliance Comments',
                            pdf: { 0: [{ x: 415, y: 644, height: 46, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'operator_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Operator',
                    controls:
                        [{
                            param: 'operator_checklist',
                            type: ControlKeys.Looper,
                            setLength: 8,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 625, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                            value: [
                                { 'action': 'Employees VOC Trained' }
                                , { 'action': 'Seat Belt Operational' }
                                , { 'action': 'Load Sheet Completed Correctly' }
                                , { 'action': 'Activity log sheet completed' }
                                , { 'action': 'General operating skills' }
                                , { 'action': 'Housekeeping in cab' }
                                , { 'action': 'Obey traffic signage' }
                                , { 'action': 'Correct/Positive Radio Communication' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
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
                            required: true,
                        },
                        {
                            param: 'operator_compliant',
                            type: ControlKeys.TextField,
                            label: 'Operator Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 535, height: 102, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'operator_comments',
                            type: ControlKeys.TextField,
                            label: 'Operator Comments',
                            pdf: { 0: [{ x: 415, y: 535, height: 102, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'traffic_management_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Traffic Managment',
                    controls:
                        [{
                            param: 'traffic_management_checklist',
                            type: ControlKeys.Looper,
                            setLength: 6,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 515, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                            value: [
                                { 'action': 'Install and Cleaning Delineation' }
                                , { 'action': 'Install and Cleaning Traffic Signs' }
                                , { 'action': 'Correct Posture' }
                                , { 'action': 'Correct Lifting Technique' }
                                , { 'action': 'Intersection Compliance' }
                                , { 'action': 'Follow 50/20 Rule' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
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
                            required: true,
                        },
                        {
                            param: 'traffic_management_compliant',
                            type: ControlKeys.TextField,
                            label: 'Traffic Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 443, height: 84, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'traffic_management_comments',
                            type: ControlKeys.TextField,
                            label: 'Traffic Comments',
                            pdf: { 0: [{ x: 415, y: 443, height: 84, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'mobile_equipment_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Mobile Equipment',
                    controls:
                        [{
                            param: 'mobile_equipment_checklist',
                            type: ControlKeys.Looper,
                            setLength: 7,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 420, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                            value: [
                                { 'action': 'Equipment Prestart Completed' }
                                , { 'action': 'Seat Belts Worn' }
                                , { 'action': 'Barricades in Place (if applicable)' }
                                , { 'action': 'Driving to Conditions' }
                                , { 'action': 'Use of Horn signalling' }
                                , { 'action': 'Correctly Parked/Grounded' }
                                , { 'action': 'Spotter in Place' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
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
                            required: true,
                        },
                        {
                            param: 'mobile_equipment_compliant',
                            type: ControlKeys.TextField,
                            label: 'Mobile Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 347, height: 85, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'mobile_equipment_comments',
                            type: ControlKeys.TextField,
                            label: 'Mobile Comments',
                            pdf: { 0: [{ x: 415, y: 347, height: 85, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'prestart_equipment_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Prestart Equipment',
                    controls:
                        [{
                            param: 'prestart_equipment_checklist',
                            type: ControlKeys.Looper,
                            setLength: 3,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 320, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 8 }] },
                            value: [
                                { 'action': 'Positive Isolation' }
                                , { 'action': 'SOP Followed' }
                                , { 'action': 'Equipment Wheels Chocked or Parked in Go Line' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
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
                            required: true,
                        },
                        {
                            param: 'prestart_equipment_compliant',
                            type: ControlKeys.TextField,
                            label: 'Prestart Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 278, height: 54, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'prestart_equipment_comments',
                            type: ControlKeys.TextField,
                            label: 'Prestart Comments',
                            pdf: { 0: [{ x: 415, y: 278, height: 54, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'ppe_collapse',
                    type: ControlKeys.Collapse,
                    label: 'PPE',
                    controls:
                        [{
                            param: 'ppe_checklist',
                            type: ControlKeys.Looper,
                            setLength: 5,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 257, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 7 }] },
                            value: [
                                { 'action': 'Eye Protection' }
                                , { 'action': 'Hearing Protection' }
                                , { 'action': 'Hand Protection' }
                                , { 'action': 'Hard Hats' }
                                , { 'action': 'Steel Cap Boots (laced and secured to the top)' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'ppe_sampled',
                            type: ControlKeys.TextField,
                            label: 'PPE Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 195, height: 74, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'ppe_compliant',
                            type: ControlKeys.TextField,
                            label: 'PPE Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 195, height: 74, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'ppe_comments',
                            type: ControlKeys.TextField,
                            label: 'PPE Comments',
                            pdf: { 0: [{ x: 415, y: 195, height: 74, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'environmental_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Environmental',
                    controls:
                        [{
                            param: 'environmental_checklist',
                            type: ControlKeys.Looper,
                            setLength: 3,
                            pdf: { 0: [{ x: 28, y: 0, width: 555, height: 170, vertical: true }] },
                            grid: { 0: [{ width: 530, height: 5, margin: 8 }] },
                            value: [
                                { 'action': 'Oil Leaks Spillage' }
                                , { 'action': 'Dust' }
                                , { 'action': 'Required Permit in Place' }
                            ],
                            controls: [
                                {
                                    param: 'action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 0, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 210 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 238 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 266 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'divider',
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
                            required: true,
                        },
                        {
                            param: 'environmental_compliant',
                            type: ControlKeys.TextField,
                            label: 'Environmental Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 364, y: 142, height: 40, width: 38 }] },
                            required: true,
                        },
                        {
                            param: 'environmental_comments',
                            type: ControlKeys.TextField,
                            label: 'Environmental Comments',
                            pdf: { 0: [{ x: 415, y: 142, height: 40, width: 165 }] },
                        },
                        ],
                },
                {
                    param: 'total_divider',
                    type: ControlKeys.Divider,
                    label: 'Total',
                },
                {
                    param: 'total_compliant',
                    type: ControlKeys.Spinner,
                    pdf: { 0: [{ y: 119, size: 10 }] },
                    controls: [
                        { label: "Compliant", value: "Compliant", pdf: { x: 330 }, renderValue: true },
                        { label: "Non-Compliant", value: "Non-Compliant", pdf: { x: 380 }, renderValue: true },
                    ],
                    radio: true,
                    required: true,
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
    ],
}