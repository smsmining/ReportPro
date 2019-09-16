import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';

import { styles } from '../utils/Style';

export default PDFDisplay = (props) =>
{
    const { pdfPath, onLoadComplete, onError } = props;

    return (
       <View style={styles.pdfContainer}>
            <Pdf
                source={{ uri: 'file://' + pdfPath }}
                onLoadComplete={onLoadComplete}
                onError={onError}
                style={styles.pdf}
            />
        </View>
    );
};