import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from '../utils/Style';
import Pdf from 'react-native-pdf';
import Forms from '../context/Forms';

class PDFShow extends Component {

  render() {

    const { guid,pdf_name} = this.props;
    let pdfPath = Forms.GetFilePath(guid, pdf_name);
    const uriValue = 'file://' + pdfPath;
    const source = {uri: uriValue};

    return (
        <View style={styles.pdfContainer}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                style={styles.pdf}/>
        </View>
    );
  }
}

export default PDFShow;
