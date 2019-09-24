import { StyleSheet, Dimensions } from 'react-native';

import Colors from './ReportColors';

export const FabStyles = StyleSheet.create(
    {main: { backgroundColor: '#da291c', borderColor: '#54585a' }
    ,node: { backgroundColor: '#ebebeb', borderColor: '#54585a', borderWidth: 1 }
    ,nodeIcon: { color: '#000' }
    });

export const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    separator: {
        backgroundColor: 'blue',
        height: 1,
        marginLeft: 18,
    },
    borderBottom: {
        borderBottomWidth: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
        textDecorationStyle: 'solid',
        flex: 1,
        color: Colors.lighter,
    },
    FormsBackground: {
        backgroundColor: Colors.blue,
        marginTop: 0,
        borderBottomWidth: 0,
    },
    FormBody: {
        marginLeft: 32,
    },
    container: {
        flex: 1,
    },

    ImageContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.dark,
    },

    logo: {
        opacity: 0.8,
        overflow: 'visible',
        resizeMode: 'cover',
        marginLeft: -128,
        marginBottom: -192,
    },
    text: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.black,
    },
    image: {
        width: Dimensions.get('window').width,
    },
    imageStatic: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    FabContainerBottom: {
        bottom: 76,
    },
    FabbackgroundColor: {
        backgroundColor: '#FF0000',
    },
    FabEmailbackgroundColor: {
        backgroundColor: '#3B5998',
    },
    FabPDFbackgroundColor: {
        backgroundColor: '#34AF23',
    },
    pdfContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    loadingText: {
        marginTop: 200,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        textDecorationStyle: 'solid',
    },

});
