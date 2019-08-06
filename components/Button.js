'use strict';
import React from 'react';
import { Button, Text } from 'native-base';


const ButtonSMS = ({ifShow}) =>{
  if (ifShow) {
    return (
    <Button light>
        <Text>Click Me!</Text>
    </Button>
    );
  }
  return null;

};




export default ButtonSMS;
