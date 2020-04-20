import AppFlags from '../../AppFlags';

import Hazard_Report from './Hazard_Report';
import Inspection_Report from './Inspection_Report';
import SMS_MN_INS_0004_01 from './SMS-MN-INS-0004_01';
import SMS_MN_INS_0005_01 from './SMS-MN-INS-0005_01';
import SMS_MN_INS_0006_01 from './SMS-MN-INS-0006_01';
import SMS_MN_INS_0007_01 from './SMS-MN-INS-0007_01';
import SMS_MN_INS_0008_01 from './SMS-MN-INS-0008_01';
import SMS_MN_INS_0009_01 from './SMS-MN-INS-0009_01';
import SMS_SAF_FRM_0013_03 from './SMS-SAF-FRM-0013_03';
import SMS_SAF_FRM_0014_02 from './SMS-SAF-FRM-0014_02';
import Take_5 from './Take_5';
import Workshop_Inspection from './Workshop_Inspection';


export default Forms =
    [Take_5
    ,Hazard_Report
    ,Inspection_Report
    ,Workshop_Inspection
    ,SMS_SAF_FRM_0014_02
    ,SMS_SAF_FRM_0013_03
    
    ,...(AppFlags.DevBuild
?   [SMS_MN_INS_0004_01
    ,SMS_MN_INS_0005_01
    ,SMS_MN_INS_0006_01
    ,SMS_MN_INS_0007_01
    ,SMS_MN_INS_0008_01
    ,SMS_MN_INS_0009_01
    ]
:   []
    )
    ]