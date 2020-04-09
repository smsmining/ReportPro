import { ControlKeys, SiteSpinner } from "./_config";

export default SMS_SAF_FRM_0014_02 =
{
    guid: "00000000-0000-0000-0000-000000000003",
    name: 'Safe Act Observation - General',
    pdfname: 'SMS-SAF-FRM-0014_02 Safe Act Observation - General',
    version: 'SMS-SAF-FRM-0014_02',
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
                    pdf: { 0: [{ x: 70, y: 765, size: 14 }] },
                    required: true,
                },
                {
                    ...SiteSpinner,
                    param: 'location',
                    label: 'Location',
                    pdf: { 0: [{ x: 300, y: 765, size: 14 }] },
                    required: true,
                },
                {
                    param: 'observer',
                    type: ControlKeys.TextField,
                    label: 'Observer',
                    pdf: { 0: [{ x: 505, y: 765, size: 14 }] },
                    required: true,
                },
                {
                    param: 'date',
                    type: ControlKeys.Date,
                    label: 'Date',
                    renderFormat: 'dd     mm    yyyy',
                    pdf: { 0: [{ x: 72, y: 748, size: 8 }] },
                    required: true,
                },
                {
                    param: 'time',
                    type: ControlKeys.TextField,
                    label: 'Time',
                    pdf: { 0: [{ x: 68, y: 739, size: 8 }] },
                    required: true,
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
                    param: 'risk_assessment_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Risk Assessments',
                    controls:
                        [{
                            param: 'risk_assessment_checklist',
                            type: ControlKeys.Looper,
                            setLength: 2,
                            pdf: { 0: [{ x: 242, y: 705, width: 339, height: 22 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'risk_assessment_action': 'JHA Completed and Being Followed' }
                                , { 'risk_assessment_action': 'Take 5 Completed and Being Followed' }
                            ],
                            controls: [
                                {
                                    param: 'risk_assessment_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'risk_assessment_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'risk_assessment_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'risk_assessment_sampled',
                            type: ControlKeys.TextField,
                            label: 'Risk Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 708, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'risk_assessment_compliant',
                            type: ControlKeys.TextField,
                            label: 'Risk Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 708, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'risk_assessment_comments',
                            type: ControlKeys.TextField,
                            label: 'Risk Comments',
                            pdf: { 0: [{ x: 415, y: 708, width: 163, height: 21 }] },
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
                            setLength: 3,
                            pdf: { 0: [{ x: 242, y: 662.5, width: 339, height: 32.5 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'compliance_to_procedures_action': 'Work Area Suitable / Inspected' }
                                , { 'compliance_to_procedures_action': 'Hazards Identified' }
                                , { 'compliance_to_procedures_action': 'Permits in Place' }
                            ],
                            controls: [
                                {
                                    param: 'compliance_to_procedures_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'compliance_to_procedures_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'compliance_to_procedures_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'compliance_to_procedures_sampled',
                            type: ControlKeys.TextField,
                            label: 'Compliance Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 665.5, width: 43, height: 32 }] },
                            required: true,
                        },
                        {
                            param: 'compliance_to_procedures_compliant',
                            type: ControlKeys.TextField,
                            label: 'Compliance Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 665.5, width: 43, height: 32 }] },
                            required: true,
                        },
                        {
                            param: 'compliance_to_procedures_comments',
                            type: ControlKeys.TextField,
                            label: 'Compliance Comments',
                            pdf: { 0: [{ x: 415, y: 665.5, width: 163, height: 32 }] },
                        },
                        ],
                },
                {
                    param: 'working_at_heights_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Working at Heights (FRPP)',
                    controls:
                        [{
                            param: 'working_at_heights_checklist',
                            type: ControlKeys.Looper,
                            setLength: 5,
                            pdf: { 0: [{ x: 242, y: 598.5, width: 339, height: 53.5 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'working_at_heights_action': 'Employees Trained' }
                                , { 'working_at_heights_action': 'Fall Prevention Barriers in Place' }
                                , { 'working_at_heights_action': 'Certified and Fit for Purpose platforms in use' }
                                , { 'working_at_heights_action': 'Permits in Place' }
                                , { 'working_at_heights_action': 'Fall Restraints / Arrest in use and in date' }
                            ],
                            controls: [
                                {
                                    param: 'working_at_heights_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'working_at_heights_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'working_at_heights_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'working_at_heights_sampled',
                            type: ControlKeys.TextField,
                            label: 'W@H Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 601.5, width: 43, height: 53 }] },
                            required: true,
                        },
                        {
                            param: 'working_at_heights_compliant',
                            type: ControlKeys.TextField,
                            label: 'W@H Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 601.5, width: 43, height: 53 }] },
                            required: true,
                        },
                        {
                            param: 'working_at_heights_comments',
                            type: ControlKeys.TextField,
                            label: 'W@H Comments',
                            pdf: { 0: [{ x: 415, y: 601.5, width: 163, height: 53 }] },
                        },
                        ],
                },
                {
                    param: 'confined_space_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Confined Space (FRPP)',
                    controls:
                        [{
                            param: 'confined_space_checklist',
                            type: ControlKeys.Looper,
                            setLength: 3,
                            pdf: { 0: [{ x: 242, y: 557, width: 339, height: 32.5 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'confined_space_action': 'Employees Trained' }
                                , { 'confined_space_action': 'Atmospheric testing' }
                                , { 'confined_space_action': 'Sentry' }
                            ],
                            controls: [
                                {
                                    param: 'confined_space_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'confined_space_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'confined_space_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'confined_space_sampled',
                            type: ControlKeys.TextField,
                            label: 'Confined Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 560, width: 43, height: 32 }] },
                            required: true,
                        },
                        {
                            param: 'confined_space_compliant',
                            type: ControlKeys.TextField,
                            label: 'Confined Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 560, width: 43, height: 32 }] },
                            required: true,
                        },
                        {
                            param: 'confined_space_comments',
                            type: ControlKeys.TextField,
                            label: 'Confined Comments',
                            pdf: { 0: [{ x: 415, y: 560, width: 163, height: 32 }] },
                        },
                        ],
                },
                {
                    param: 'isolation_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Isolation (FRPP)',
                    controls:
                        [{
                            param: 'isolation_checklist',
                            type: ControlKeys.Looper,
                            setLength: 4,
                            pdf: { 0: [{ x: 242, y: 504.5, width: 339, height: 43 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'isolation_action': 'Positive Isolation' }
                                , { 'isolation_action': 'Tags and Locks Attached' }
                                , { 'isolation_action': 'Stored Energy Released' }
                                , { 'isolation_action': 'Equipment Secured against Movement' }
                            ],
                            controls: [
                                {
                                    param: 'isolation_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'isolation_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'isolation_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'isolation_sampled',
                            type: ControlKeys.TextField,
                            label: 'Isolation Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 507.5, width: 43, height: 42 }] },
                            required: true,
                        },
                        {
                            param: 'isolation_compliant',
                            type: ControlKeys.TextField,
                            label: 'Isolation Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 507.5, width: 43, height: 42 }] },
                            required: true,
                        },
                        {
                            param: 'isolation_comments',
                            type: ControlKeys.TextField,
                            label: 'Isolation Comments',
                            pdf: { 0: [{ x: 415, y: 507.5, width: 163, height: 42 }] },
                        },
                        ],
                },
                {
                    param: 'mobile_equipment_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Mobile Equipment (FRPP)',
                    controls:
                        [{
                            param: 'mobile_equipment_checklist',
                            type: ControlKeys.Looper,
                            setLength: 5,
                            pdf: { 0: [{ x: 242, y: 441, width: 339, height: 53.5 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'mobile_equipment_action': 'VoC completed' }
                                , { 'mobile_equipment_action': 'Seat Belts Worn' }
                                , { 'mobile_equipment_action': 'Barricades in Place (If Applicable)' }
                                , { 'mobile_equipment_action': 'Driving to Conditions' }
                                , { 'mobile_equipment_action': 'Use of Horns' }
                            ],
                            controls: [
                                {
                                    param: 'mobile_equipment_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'mobile_equipment_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'mobile_equipment_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'mobile_equipment_sampled',
                            type: ControlKeys.TextField,
                            label: 'Mobile Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 444, width: 43, height: 53 }] },
                            required: true,
                        },
                        {
                            param: 'mobile_equipment_compliant',
                            type: ControlKeys.TextField,
                            label: 'Mobile Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 444, width: 43, height: 53 }] },
                            required: true,
                        },
                        {
                            param: 'mobile_equipment_comments',
                            type: ControlKeys.TextField,
                            label: 'Mobile Comments',
                            pdf: { 0: [{ x: 415, y: 444, width: 163, height: 53 }] },
                        },
                        ],
                },
                {
                    param: 'electrical_equipment_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Electrical Equipment (FRPP)',
                    controls:
                        [{
                            param: 'electrical_equipment_checklist',
                            type: ControlKeys.Looper,
                            setLength: 2,
                            pdf: { 0: [{ x: 242, y: 410, width: 339, height: 22 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'electrical_equipment_action': 'Correct color test tag' }
                                , { 'electrical_equipment_action': 'Electrical Equipment protected from Damage' }
                            ],
                            controls: [
                                {
                                    param: 'electrical_equipment_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'electrical_equipment_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'electrical_equipment_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'electrical_equipment_sampled',
                            type: ControlKeys.TextField,
                            label: 'Electrical Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 413, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'electrical_equipment_compliant',
                            type: ControlKeys.TextField,
                            label: 'Electrical Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 413, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'electrical_equipment_comments',
                            type: ControlKeys.TextField,
                            label: 'Electrical Comments',
                            pdf: { 0: [{ x: 415, y: 413, width: 163, height: 21 }] },
                        },
                        ],
                },
                {
                    param: 'lifting_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Lifting',
                    controls:
                        [{
                            param: 'lifting_checklist',
                            type: ControlKeys.Looper,
                            setLength: 4,
                            pdf: { 0: [{ x: 242, y: 357, width: 339, height: 43 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'lifting_action': 'Employees Trained' }
                                , { 'lifting_action': 'Lifting Plan in Place' }
                                , { 'lifting_action': 'Area Barricaded' }
                                , { 'lifting_action': 'Lifting Slings - Chains in Date' }
                            ],
                            controls: [
                                {
                                    param: 'lifting_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'lifting_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'lifting_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'lifting_sampled',
                            type: ControlKeys.TextField,
                            label: 'Electrical Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 360, width: 43, height: 42 }] },
                            required: true,
                        },
                        {
                            param: 'lifting_compliant',
                            type: ControlKeys.TextField,
                            label: 'Electrical Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 360, width: 43, height: 42 }] },
                            required: true,
                        },
                        {
                            param: 'lifting_comments',
                            type: ControlKeys.TextField,
                            label: 'Electrical Comments',
                            pdf: { 0: [{ x: 415, y: 360, width: 163, height: 42 }] },
                        },
                        ],
                },
                {
                    param: 'manual_handling_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Manual Handling',
                    controls:
                        [{
                            param: 'manual_handling_checklist',
                            type: ControlKeys.Looper,
                            setLength: 2,
                            pdf: { 0: [{ x: 242, y: 325.3, width: 339, height: 22 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'manual_handling_action': 'Correct Posture' }
                                , { 'manual_handling_action': 'Correct Lifting Techniques' }
                            ],
                            controls: [
                                {
                                    param: 'manual_handling_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'manual_handling_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'manual_handling_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'manual_handling_sampled',
                            type: ControlKeys.TextField,
                            label: 'Manual Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 328.3, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'manual_handling_compliant',
                            type: ControlKeys.TextField,
                            label: 'Manual Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 328.3, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'manual_handling_comments',
                            type: ControlKeys.TextField,
                            label: 'Manual Comments',
                            pdf: { 0: [{ x: 415, y: 328.3, width: 163, height: 21 }] },
                        },
                        ],
                },
                {
                    param: 'tooling_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Tooling',
                    controls:
                        [{
                            param: 'tooling_checklist',
                            type: ControlKeys.Looper,
                            setLength: 2,
                            pdf: { 0: [{ x: 242, y: 293.8, width: 339, height: 22 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'tooling_action': 'Correct Tooling for the Job' }
                                , { 'tooling_action': 'Tooling in Good Condition' }
                            ],
                            controls: [
                                {
                                    param: 'tooling_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'tooling_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'tooling_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'tooling_sampled',
                            type: ControlKeys.TextField,
                            label: 'Tooling Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 296.8, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'tooling_compliant',
                            type: ControlKeys.TextField,
                            label: 'Tooling Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 296.8, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'tooling_comments',
                            type: ControlKeys.TextField,
                            label: 'Tooling Comments',
                            pdf: { 0: [{ x: 415, y: 296.8, width: 163, height: 21 }] },
                        },
                        ],
                },
                {
                    param: 'housekeeping_collapse',
                    type: ControlKeys.Collapse,
                    label: 'Housekeeping',
                    controls:
                        [{
                            param: 'housekeeping_checklist',
                            type: ControlKeys.Looper,
                            setLength: 2,
                            pdf: { 0: [{ x: 242, y: 261.8, width: 339, height: 22 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'housekeeping_action': 'Area clean with Approperiate Barricade' }
                                , { 'housekeeping_action': 'Trips / Slips Hazards' }
                            ],
                            controls: [
                                {
                                    param: 'housekeeping_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'housekeeping_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'housekeeping_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'housekeeping_sampled',
                            type: ControlKeys.TextField,
                            label: 'Housekeeping Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 264.8, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'housekeeping_compliant',
                            type: ControlKeys.TextField,
                            label: 'Housekeeping Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 264.8, width: 43, height: 21 }] },
                            required: true,
                        },
                        {
                            param: 'housekeeping_comments',
                            type: ControlKeys.TextField,
                            label: 'Housekeeping Comments',
                            pdf: { 0: [{ x: 415, y: 264.8, width: 163, height: 21 }] },
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
                            pdf: { 0: [{ x: 242, y: 198.3, width: 339, height: 53.5 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'ppe_action': 'Glasses / Goggles / Shields worn' }
                                , { 'ppe_action': 'Hearing Protection' }
                                , { 'ppe_action': 'Respiratory Protection' }
                                , { 'ppe_action': 'Hand Protection - Leather / Rubber Gloves' }
                                , { 'ppe_action': 'Apron' }
                            ],
                            controls: [
                                {
                                    param: 'ppe_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'ppe_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'ppe_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'ppe_sampled',
                            type: ControlKeys.TextField,
                            label: 'PPE Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 201.3, width: 43, height: 53 }] },
                            required: true,
                        },
                        {
                            param: 'ppe_compliant',
                            type: ControlKeys.TextField,
                            label: 'PPE Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 201.3, width: 43, height: 53 }] },
                            required: true,
                        },
                        {
                            param: 'ppe_comments',
                            type: ControlKeys.TextField,
                            label: 'PPE Comments',
                            pdf: { 0: [{ x: 415, y: 201.3, width: 163, height: 53 }] },
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
                            pdf: { 0: [{ x: 242, y: 155.3, width: 339, height: 33.5 }] },
                            grid: { 0: [{ width: 339, height: 10.5 }] },
                            value: [{ 'environmental_action': 'Hydrocarbons contained' }
                                , { 'environmental_action': 'Correct labelling' }
                                , { 'environmental_action': 'Spill trays' }
                            ],
                            controls: [
                                {
                                    param: 'environmental_action',
                                    type: ControlKeys.TextLabel,
                                },
                                {
                                    param: 'environmental_choice',
                                    type: ControlKeys.Spinner,
                                    pdf: { 0: [{ y: 2, size: 10 }] },
                                    controls: [
                                        { label: "Yes", value: "Yes", pdf: { x: 11 }, renderValue: true },
                                        { label: "No", value: "No", pdf: { x: 36 }, renderValue: true },
                                        { label: "N/A", value: "NA", pdf: { x: 57 }, renderValue: true },
                                    ],
                                    radio: true,
                                    required: true,
                                },
                                {
                                    param: 'environmental_divider',
                                    type: ControlKeys.Divider,
                                },
                            ],
                        },
                        {
                            param: 'environmental_sampled',
                            type: ControlKeys.TextField,
                            label: 'Environmental Sampled',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 315, y: 158.3, width: 43, height: 33 }] },
                            required: true,
                        },
                        {
                            param: 'environmental_compliant',
                            type: ControlKeys.TextField,
                            label: 'Environmental Compliant',
                            keyboardType: 'phone-pad',
                            pdf: { 0: [{ x: 365, y: 158.3, width: 43, height: 33 }] },
                            required: true,
                        },
                        {
                            param: 'environmental_comments',
                            type: ControlKeys.TextField,
                            label: 'Environmental Comments',
                            pdf: { 0: [{ x: 415, y: 158.3, width: 163, height: 33 }] },
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
                    pdf: { 0: [{ y: 138, size: 10 }] },
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
                    pdf: { 0: [{ x: 422, y: 138, size: 10 }] },
                },
            ],
        },
        {
            id: '3',
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
    ],
}