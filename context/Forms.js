import { createFetcher } from './CreateFetcher';
import RNFetchBlob from 'rn-fetch-blob';

const rootDirs = RNFetchBlob.fs.dirs;

 const List = (onSuccess) =>
{
    return createFetcher( async () =>
            fakeDB
                .forms
                .map(form => ({ guid: form.guid, name: form.name, version: form.version }))
            )
            .read()
            .then((data) => onSuccess(data));
};

const Get = (guid, onSuccess) =>
{
    return createFetcher( async () =>
            fakeDB
                .forms
                .find(form => form.guid === guid)
            )
            .read()
            .then((data) => onSuccess(data));
};

const GetFilePath = (guid, filename) =>
{
    return rootDirs.DCIMDir + '/Reports/' + guid + '/' + filename;
};


const CreateDummyPDF = (guid,tempfile,dummyfile,onSuccess) =>
{
    const srcFile = GetFilePath(guid,tempfile);
    const desFile = GetFilePath(guid,dummyfile);
    RNFetchBlob.fs.cp(srcFile ,desFile)
    .then(() => onSuccess(desFile))
    .catch();
};


const fakeDB =
{
    forms:
        [
            {
                guid: "00000000-0000-0000-0000-000000000000",
                name: 'Inspection',
                version: '0.0.1',
                tabs: [
                    {
                        id: '1',
                        label: 'custom',
                        icon: 'event-note',
                        controls: [
                            {
                                id: '1',
                                type: 'divider',
                                label: 'Inspection Information',
                                param: 'Inspection Divider',
                                value: '',
                            },
                            {
                                id: '2',
                                type: 'textField',
                                label: 'PIN/VIN No',
                                param: 'PIN/VIN No',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '3',
                                type: 'textField',
                                label: 'Report No',
                                param: 'Report No',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'numeric',
                            },
                            {
                                id: '4',
                                type: 'date',
                                label: 'Inspection date',
                                param: 'Inspection date',
                                value: '',
                            },
                            {
                                id: '5',
                                type: 'textField',
                                label: 'Inspected by',
                                param: 'Inspected by',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '6',
                                type: 'textField',
                                label: 'Inspection place',
                                param: 'Inspection place',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '7',
                                type: 'divider',
                                label: 'Customer Information',
                                param: 'Customer Divider',
                                value: '',
                            },
                            {
                                id: '8',
                                type: 'textField',
                                label: 'Customer Name',
                                param: 'Customer Name',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '9',
                                type: 'textField',
                                label: 'Customer Address',
                                param: 'Customer Address',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '10',
                                type: 'textField',
                                label: 'Customer Phone',
                                param: 'Customer Phone',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'phone-pad',
                            },
                            {
                                id: '11',
                                type: 'divider',
                                label: 'Machine Information',
                                param: 'Machine Divider',
                                value: '',
                            },
                            {
                                id: '12',
                                type: 'textField',
                                label: 'Model Code',
                                param: 'Model Code',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '13',
                                type: 'textField',
                                label: 'Model Name',
                                param: 'Model Name',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '14',
                                type: 'textField',
                                label: 'S/N',
                                param: 'S/N',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'numeric',
                            },
                            {
                                id: '15',
                                type: 'textField',
                                label: 'Machine ID',
                                param: 'Machine ID',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '16',
                                type: 'divider',
                                label: 'General Information',
                                param: 'General Divider',
                                value: '',
                            },
                            {
                                id: '17',
                                type: 'date',
                                label: 'Annual inspection time limit',
                                param: 'time limit',
                                value: '',
                            },
                            {
                                id: '18',
                                type: 'textField',
                                label: 'Operated Hours',
                                param: 'Operated Hours',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'numeric',
                            },
                            {
                                id: '19',
                                type: 'textField',
                                label: 'Time since Delivery',
                                param: 'Time since Delivery',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '20',
                                type: 'textField',
                                label: 'Emergency repair',
                                param: 'Emergency repair',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },

                            {
                                id: '21',
                                type: 'textField',
                                label: 'Condition',
                                param: 'Condition',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '22',
                                type: 'textArea',
                                label: 'Overall inspection result',
                                param: 'Overall inspection result',
                                value: '',
                                placeholder: 'Comment',
                                HeightRows :'',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '23',
                                type: 'textField',
                                label: 'Latest hr',
                                param: 'Latest hr',
                                placeholder: '',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                            },
                            {
                                id: '24',
                                type: 'imageSelect',
                                label: 'Digger Image',
                                param: 'Digger Image',
                                value: '',
                            },
                        ],
                    },
                    {
                        id: '2',
                        label: 'machine',
                        icon: 'event-note',
                        controls: [
                            {
                                id: '1',
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'logo',
                                value: '',
                            },
                            {
                                id: '2',
                                type: 'textField',
                                label: 'form1_tab2_con2',
                                param: 'form1_tab2_con2',
                                value: '',
                            },
                            {
                                id: '3',
                                type: 'textField',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                controls: [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                            {
                                id: '4',
                                type: 'spinner',
                                label: 'Company',
                                param: 'Company',
                                controls: [
                                    {label: 'company_1', value:'key1'},
                                    {label: 'company_2', value:'key2'},
                                    {label: 'company_3', value:'key3'},
                                    ],
                                value: '',
                            },
                            {
                                id: '5',
                                type: 'textField',
                                label: 'Phone',
                                param: 'Phone',
                                value: '',
                                maxLength:'',
                                keyboardType:'phone-pad',
                            },
                            {
                                id: '6',
                                type: 'imageStatic',
                                label: 'image title_1',
                                param: 'image title_1',
                                value: require('../resources/00000000-0000-0000-0000-000000000000/form0_1.png'),
                            },
                            {
                                id: '7',
                                type: 'textLabel',
                                label: 'message title',
                                param: '',
                                value: 'this is a read only message',
                            },
                            {
                                id: '8',
                                type: 'imageStatic',
                                label: 'image title_2',
                                param: 'image title_2',
                                value: require('../resources/00000000-0000-0000-0000-000000000000/form0_2.png'),
                            },
                        ],
                    },
                    {
                        id: '3',
                        label: 'sign',
                        icon: 'event-note',
                        controls: [
                            {
                                id: '1',
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'logo',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                id: '2',
                                type: 'textField',
                                label: 'form1_tab3_con2',
                                param: 'form1_tab3_con2',
                                value: '',
                            },
                            {
                                id: '3',
                                type: 'drillDown',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                        ],
                    },
                ],
                pdf_name:'Inspection Report.pdf',
                pdf_pages:[
                    {
                        id: 0,
                        controls: [
                            {
                                id: '1',
                                type: 'textField',
                                param: 'PIN/VIN No',
                                style: {x:120, y:720, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '2',
                                type: 'textField',
                                param: 'Report No',
                                style: {x:360, y:720, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '3',
                                type: 'date',
                                label: 'Inspection date',
                                param: 'Inspection date',
                                style: {x:86, y:680, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '4',
                                type: 'textField',
                                param: 'Inspected by',
                                style: {x:393, y:680, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '5',
                                type: 'textField',
                                param: 'Inspection place',
                                style: {x:86, y:644, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '6',
                                type: 'textField',
                                param: 'Customer Name',
                                style: {x:86, y:605, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '7',
                                type: 'textField',
                                param: 'Customer Address',
                                style: {x:86, y:588, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '8',
                                type: 'textField',
                                param: 'Customer Phone',
                                style: {x:393, y:588, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '9',
                                type: 'textField',
                                param: 'Model Code',
                                style: {x:86, y:538, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '10',
                                type: 'textField',
                                param: 'Model Name',
                                style: {x:188, y:538, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '11',
                                type: 'textField',
                                param: 'S/N',
                                style: {x:313, y:538, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '12',
                                type: 'textField',
                                param: 'Machine ID',
                                style: {x:393, y:538, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '13',
                                type: 'date',
                                param: 'time limit',
                                style: {x:86, y:503, color: '#33cc33',fontSize:13},
                            },
                            {
                                id: '14',
                                type: 'textField',
                                param: 'Operated Hours',
                                style: {x:86, y:460, color: '#33cc33',fontSize:22},
                            },
                            {
                                id: '15',
                                type: 'textField',
                                param: 'Time since Delivery',
                                style: {x:333, y:460, color: '#33cc33',fontSize:22},
                            },
                            {
                                id: '16',
                                type: 'textField',
                                param: 'Emergency repair',
                                style: {x:86, y:415, color: '#33cc33',fontSize:22},
                            },
    
                            {
                                id: '17',
                                type: 'textField',
                                param: 'Condition',
                                style: {x:333, y:415, color: '#33cc33',fontSize:22},
                            },
                            {
                                id: '18',
                                type: 'textArea',
                                param: 'Overall inspection result',
                                style: {x:45, y:370, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '19',
                                type: 'imageSelect',
                                param: 'Digger Image',
                                style: {x: 205,y: 180,width: 200,height: 100},
                            },
                        ],
                    },
                    {
                        id: 1,
                        controls: [
                            {
                                id: '1',
                                type: 'textField',
                                param: 'Model Code',
                                style: {x:124, y:710, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '12',
                                type: 'textField',
                                param: 'Model Name',
                                style: {x:225, y:710, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '3',
                                type: 'textField',
                                param: 'S/N',
                                style: {x:350, y:710, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '4',
                                type: 'textField',
                                param: 'Machine ID',
                                style: {x:430, y:710, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '5',
                                type: 'textField',
                                param: 'Latest hr',
                                style: {x:190, y:674, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '6',
                                type: 'textField',
                                param: 'Time since Delivery',
                                style: {x:394, y:674, color: '#33cc33',fontSize:15},
                            },
                            {
                                id: '7',
                                type: 'imageSelect',
                                param: 'Digger Image',
                                style: {x: 129,y: 540,width: 200,height: 100},
                            },
                        ],
                    },
                ],
            },
            {
                guid: "00000000-0000-0000-0000-000000000001",
                name: 'hire-on',
                version: '0.0.1',
                tabs: [
                    {
                        id: '1',
                        label: 'custom',
                        icon: 'photo-camera',
                        controls: [
                            {
                                id: '1',
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'logo',
                                value: '',
                                
                            },
                            {
                                id: '2',
                                type: 'textField',
                                label: 'form 2',
                                param: 'Example',
                                value: '',
                            },
                            {
                                id: '3',
                                type: 'textField',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                            },
                        ],
                    },
                    {
                        id: '2',
                        label: 'machine',
                        icon: 'photo-camera',
                        controls: [
                            {
                                id: '1',
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'Example',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                id: '2',
                                type: 'textInput',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '3',
                        label: 'sign',
                        icon: 'photo-camera',
                        controls: [
                            {
                                id: '1',
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'Example',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                id: '2',
                                type: 'textField',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                guid: "00000000-0000-0000-0000-000000000002",
                name: 'hire-off',
                version: '0.0.1',
                tabs: [
                    {
                        id: '1',
                        label: 'custom',
                        icon: 'settings',
                        controls: [
                            {
                                id: '1',
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'logo',
                                value: '',
                            },
                            {
                                id: '2',
                                type: 'textInput',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                            },
                        ],
                    },
                    {
                        id: '2',
                        label: 'machine',
                        icon: 'settings',
                        controls: [
                            {
                                id: '1',
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'Example',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                id: '2',
                                type: 'textField',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: '3',
                        label: 'sign',
                        icon: 'settings',
                        controls: [
                            {
                                type: 'imageSelect',
                                label: 'logo',
                                param: 'Example',
                                value: 'BASE64 ENCODED STRING',
                            },
                            {
                                type: 'textField',
                                label: 'Example',
                                param: 'Example',
                                value: 'This is some data',
                                'controls': [
                                    {
                                        type: 'camera',
                                        label: 'Evidence A',
                                        value: null,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },

        ],
};

export default  { List, Get ,GetFilePath, CreateDummyPDF};
