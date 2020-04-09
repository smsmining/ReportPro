import { ControlKeys, SiteSpinner } from "./_config";

export default Workshop_Inspection =
{
    guid: "00000000-0000-0000-0000-000000000001",
    name: 'Workshop Inspection',
    pdfname: 'Workshop Inspection',
    version: '0.0.1',
    tabs: [
        {
            id: '1',
            label: 'Details',
            icon: 'edit',
            type: ControlKeys.Tab,
            controls: [
                {
                    param: 'details_header',
                    type: ControlKeys.Divider,
                    label: 'Document Details'
                },
                {
                    ...SiteSpinner,
                    param: 'details_minesite',
                    label: 'Site',
                    pdf: { 0: [{ x: 160, y: 760, width: 100, height: 15 }] },
                    required: true,
                },
                {
                    param: 'details_date',
                    type: ControlKeys.Date,
                    label: 'Date',
                    pdf: { 0: [{ x: 320, y: 760, width: 70, height: 15 }] },
                    required: true,
                },
                {
                    param: 'details_time',
                    type: ControlKeys.TextField,
                    label: 'Time',
                    pdf: { 0: [{ x: 450, y: 760, width: 100, height: 15 }] },
                    required: true,
                },
                {
                    param: 'details_shift',
                    type: ControlKeys.Spinner,
                    label: 'Shift',
                    controls: [
                        { label: 'Day', value: 'Day Shift', pdf: { x: 476 }, renderValue: true },
                        { label: 'Night', value: 'Night Shift', pdf: { x: 521 }, renderValue: true },
                    ],
                    pdf: { 0: [{ y: 744 }] },
                    radio: true,
                    required: true,
                },
                {
                    param: 'details_weather',
                    type: ControlKeys.TextField,
                    label: 'Weather',
                    pdf: { 0: [{ x: 160, y: 742, width: 230, height: 15 }] },
                    required: true,
                },
            ],
        },
        {
            id: '2',
            label: 'Checklist',
            icon: 'check-square-o',
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
                            , { 'checklist_name': 'Are fire extinguishers in serviceable condition?' }
                            , { 'checklist_name': 'Is all signage clean and visible?' }
                            , { 'checklist_name': 'Are all oxy-acetylene bottles stored in an upright position and secured?' }
                            , { 'checklist_name': 'Are all oxy-acetylene hoses in good condition?' }
                            , { 'checklist_name': 'Are flashback arrestors fitted to all oxy and acetylene kits?' }
                            , { 'checklist_name': 'Is gas storage secure and stored as per racking requirements?' }
                            , { 'checklist_name': 'Are all workshop tools in a safe and serviceable condition?' }
                            , { 'checklist_name': 'Are dangerous goods stored in appropriate cupboards?' }
                            , { 'checklist_name': 'Lighting is operational and suitable?' }
                            , { 'checklist_name': 'Are spill kits in place with correct quantities of spill response equipment and locked?' }
                            , { 'checklist_name': 'Are spill response kits free from rubbish e.g. oily rags cardboard material?' }
                            , { 'checklist_name': 'Are work benches tidy and free of clutter?' }
                            , { 'checklist_name': 'All storage pods are stored in appropriate bunded areas?' }
                            , { 'checklist_name': 'Is there any evidence of oil spillage in the work area?' }
                            , { 'checklist_name': 'Is the workshop floor clean and clear of trip hazards including rubbish?' }
                            , { 'checklist_name': 'Are emergency eyewash / shower(s) tested and is access unobstructed?' }
                            , { 'checklist_name': 'Are all hoses wound up and stored correctly?' }
                            , { 'checklist_name': 'Are the storage containers clean and clear of trip hazards?' }
                            , { 'checklist_name': 'Are machine guards in place and fitted with an E-Stop e.g. pedestal grinder(s)?' }
                            , { 'checklist_name': 'Are Safety Data Sheets (SDS) available and in date?' }
                            , { 'checklist_name': 'Is the overall condition of the workshop areas satisfactory?' }
                            , { 'checklist_name': 'Is PPE available in all areas needed?' }
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
                            param: 'checklist_selector',
                            type: ControlKeys.Spinner,
                            label: 'safety condition',
                            controls: [
                                {label: 'Safe', value: 'Safe', pdf: { x: 14 }, renderValue: true },
                                {label: 'At Risk', value: 'At Risk', pdf: { x: 49 }, renderValue: true },
                                {label: 'N/A', value: 'N/A', pdf: { x: 85 }, renderValue: true },
                            ],
                            pdf: { 0: [{ y: 6 }] },
                            radio: true,
                            required: true,
                        },
                        {
                            param: 'checklist_spacer',
                            type: ControlKeys.Divider,
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
                    param: 'checklist_oiltank_selector',
                    type: ControlKeys.Spinner,
                    label: 'safety condition',
                    controls: [
                        { label: 'Safe', value: 'Safe', pdf: { x: 463 }, renderValue: true },
                        { label: 'At Risk', value: 'At Risk', pdf: { x: 498 }, renderValue: true },
                        { label: 'N/A', value: 'N/A', pdf: { x: 534 }, renderValue: true },
                    ],
                    pdf: { 0: [{ y: 249, width: 100, height: 15 }] },
                    radio: true,
                    required: true,
                },
                {
                    param: 'checklist_oiltank_spacer',
                    type: ControlKeys.Divider,
                },
            ],
        },
        {
            id: '3',
            label: 'Signoff',
            icon: 'user-o',
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
                    required: true,
                },
                {
                    param: 'signoff_inspected_sig',
                    type: ControlKeys.Signature,
                    label: 'Signature',
                    pdf: { 0: [{ x: 415, y: 92, width: 100, height: 15 }] },
                    required: true,
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
                    required: true,
                },
                {
                    param: 'signoff_supervisor_sig',
                    type: ControlKeys.Signature,
                    label: 'Signature',
                    pdf: { 0: [{ x: 415, y: 75, width: 100, height: 15 }] },
                    required: true,
                },
            ],
        },
    ],
}