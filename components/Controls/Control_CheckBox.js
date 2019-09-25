import React from 'react';
import { CheckBox,Body,Text,ListItem} from 'native-base';


export default Control_CheckBox = (props) => {

    const { label, value, param, onChange } = props;
    return (
        <ListItem>
             <CheckBox checked={value} color="green" onPress={() => onChange(!value, param)}/>
             <Body>
                <Text>{label}</Text>
             </Body>
        </ListItem>
    );
};



