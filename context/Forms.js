import { createFetcher } from './CreateFetcher';



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
                                label: 'Basic Information',
                                param: 'infoDivider',
                                value: '',
                               
                            },
                            {
                                id: '2',
                                type: 'date',
                                label: 'Date',
                                param: 'chosenDate',
                                value: '',
                         
                            },
                            {
                                id: '3',
                                type: 'textField',
                                label: 'Place',
                                param: 'Place',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                           
                            },
                            {
                                id: '4',
                                type: 'textField',
                                label: 'Inspector',
                                param: 'Inspector',
                                value: '',
                                maxLength:'',
                                keyboardType:'default',
                              
                            },
                            {
                                id: '5',
                                type: 'divider',
                                label: 'Customer Information',
                                param: 'CustomerDivider',
                                value: '',
                              
                            },
                            {
                                id: '6',
                                type: 'textArea',
                                label: 'Comment',
                                param: 'Comment',
                                value: '',
                                HeightRows :'',
                                maxLength:'',
                                keyboardType:'default',
                            
                            },
                            {
                                id: '7',
                                type: 'image',
                                label: 'logo',
                                param: 'logo',
                                value: '',
                                
                            },
                            {
                                id: '8',
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
                                id: '9',
                                type: 'textField',
                                label: 'Phone',
                                param: 'Phone',
                                value: '',
                                maxLength:'',
                                keyboardType:'phone-pad',
                           
                            },
                            {
                                id: '10',
                                type: 'textLabel',
                                label: 'message title',
                                param: 'this is a read only message',
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
                                type: 'image',
                                label: 'logo',
                                param: 'logo',
                                value: 'BASE64 ENCODED STRING',
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
                        ],
                    },
                    {
                        id: '3',
                        label: 'sign',
                        icon: 'event-note',
                        controls: [
                            {
                                id: '1',
                                type: 'image',
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
                                type: 'image',
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
                                type: 'image',
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
                                type: 'image',
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
                                type: 'image',
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
                                type: 'image',
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
                                type: 'image',
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

export default  { List, Get };
