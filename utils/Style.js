import { StyleSheet, Dimensions } from 'react-native';

import Colors from './ReportColors';

export { Colors }

export const FabStyles = StyleSheet.create(
    {main: { backgroundColor: '#da291c', borderColor: '#54585a' }
    ,node: { backgroundColor: '#ebebeb', borderColor: '#54585a', borderWidth: 1 }
    ,nodeIcon: { color: '#000' }
    });

export const LoadingStyles = StyleSheet.create(
    {label:
        {textAlign: 'center'
        ,fontSize: 20
        ,fontWeight: '600'
        ,textDecorationStyle: 'solid'
    },
    subtitle:
        {marginTop: 5
        ,textAlign: 'center'
        ,fontSize: 8
        ,fontWeight: '600'
        ,textDecorationStyle: 'solid'
        },
    });


export const LayoutPartials =
    {absoluteBottom:
        {container:
            {position: 'absolute'
            ,bottom: 0
            ,left: 0
            ,right: 0
            }
        }
    }

export const AlignmentStyles = StyleSheet.create(
    {middle:
        {flex: 1
        ,justifyContent: 'center'
        }
    ,center:
        {alignItems: 'center'
        }
    ,column:
        {flex: 1
        ,flexDirection: 'column'
        }
    ,row:
        {flex: 1
        ,flexDirection: 'row'
        }
    ,auto:
        {flex: 1
        ,justifyContent: 'center'
        ,alignItems: 'center'
        }
    });


const margin =
    {sm: 10
    ,md: 15
    }

export const MarginStyles = 
    {sm: StyleSheet.create(
        {t: { marginTop: margin.sm }
        ,b: { marginBottom: margin.sm }
        ,l: { marginLeft: margin.sm }
        ,r: { marginRight: margin.sm }
        })
    ,md: StyleSheet.create(
        {t: { marginTop: margin.md }
        ,b: { marginBottom: margin.md }
        ,l: { marginLeft: margin.md }
        ,r: { marginRight: margin.md }
        })
    };


export const CameraStyles = StyleSheet.create(
    {button:
        {backgroundColor: Colors.secondary
        ,borderRadius: 5
        ,padding: 15
        ,paddingHorizontal: 20
        ,alignSelf: 'center'
        ,margin: 20
        }
    ,camera:
        {flex: 1
        ,justifyContent: 'flex-end'
        ,alignItems: 'center'
        }
    ,overlay:
        {flex: 0
        ,flexDirection: 'row'
        ,justifyContent: 'center'
        }
    });

export const GlobalStyles = StyleSheet.create(
    {screen:
        {width: Dimensions.get('window').width
        ,height: Dimensions.get('window').height
        }
    ,screenWidth:
        {width: Dimensions.get('window').width
        }
    ,screenHeight:
        {height: Dimensions.get('window').height
        }
    });

export const MiscStyles = StyleSheet.create(
    {icon:
        {color: Colors.white
        }
    });

export const HighlightStyles = StyleSheet.create(
    {error:
        {backgroundColor: Colors.highlight.error
        }
    ,warning:
        {backgroundColor: Colors.highlight.warning
        }
    ,disabled:
        {backgroundColor: Colors.highlight.disabled
        }
    ,maintain:
        {backgroundColor: Colors.white
        ,borderTopRightRadius: 7.5
        ,borderTopLeftRadius: 7.5
        }
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
    InlineBody: {
        marginLeft: 0,
        borderBottomWidth: 1,
        borderColor: Colors.secondary,
    },

    ImageContainer: {
        ...HighlightStyles.maintain,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.dark,
    },

    header: {
        flex: 1,
    },

    navText: {
        textAlign: 'right',
    },


    appName: {
        color: Colors.white,
        fontSize: 14,
    },

    logo: {
        overflow: 'visible',
        resizeMode: 'stretch',
        margin: 0,
        width: 140,
        height: '100%',
        padding:0,
    },
    text: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.black,
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
    height: { height: Dimensions.get('window').height }
});
