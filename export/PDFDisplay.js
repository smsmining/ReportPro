import React from 'react';
import { View } from 'react-native';
import { styles } from '../utils/Style';
import Pdf from 'react-native-pdf';

const PDFDisplay = (props) => {

    const { pdfPath,onLoadComplete, onError} = props;
    const uriValue = 'file://' + pdfPath;
    const source = {uri: uriValue};

    return (
       <View style={styles.pdfContainer}>
            <Pdf
            source={source}
            onLoadComplete={(numberOfPages,filePath)=>{
                   onLoadComplete();
                }}
            onPageChanged={(page,numberOfPages)=>{

            }}
            onError={(error)=>{
                onError(error);
            }}
            style={styles.pdf}
            />
        </View>

    );
};

export default PDFDisplay;


