import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from '../utils/Style';
import Pdf from 'react-native-pdf';

class PDFShow extends Component {

  render() {

    const { guid } = this.props;
    // get the pdf name by guid
    //hardcorded the path
    let path = '/storage/emulated/0/Android/data/com.reportsms/files/Pictures/Inspection Report.pdf';
    const uriValue = 'file://' + path;
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
