import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Mailer from 'react-native-mail';

import { styles } from '../utils/Style';
import { ExportPDF } from '../export';

import PDFDisplay from '../components/PDFDisplay';
import MessageAlert from '../components/Alerts';
import PageLayout from '../components/Layout/PageLayout';


export default class PDF extends React.Component
{
    state =
        {pdf: null

        ,loading: false
        ,error: null
        };

    _pdfGenerator;

    componentDidMount()
    {
        const { guid, instance } = this.props;

        this.setState({ loading: true });

        this._pdfGenerator = new ExportPDF(guid, instance, this.onPDFLoaded);
    }

    componentWillUnmount()
    {
        if (_pdfGenerator)
            _pdfGenerator.deconstructor();
    }

    onPDFLoaded = () => this._pdfGenerator(this.onPDFGenerated);
    onPDFGenerated = (data) => this.setState({ pdf: data });

    handleEmail = () =>
        Mailer.mail(
            {subject: this.pdfName
            ,body: '<b>Please check</b>'
            ,isHTML: true
            ,attachment:
                {path: this.state.pdf
                ,type: 'pdf'
                ,name: this.pdfName,
                }
            }, (error) => MessageAlert('Email Error ', error));

    render()
    {
        const { pdf, loading, error } = this.state;

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={pdf && { label: "Send PDF", onPress: this.handleEmail }}
            >
                {loading &&
                <Text style={styles.loadingText}>Loading ...</Text>
                }
                {error &&
                <Text>{error}</Text>
                }
                {pdf &&
                <PDFDisplay
                    pdfPath={pdf}
                    onLoadComplete={() => this.setState({ loading: false })}
                    onError={(error) => this.setState({ loading: false, error: error })}
                />
                }
            </PageLayout>
        );
    }
}