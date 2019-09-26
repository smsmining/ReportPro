import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Mailer from 'react-native-mail';

import { styles, LoadingStyles } from '../utils/Style';
import { ExportPDF } from '../export';

import PDFDisplay from '../components/PDFDisplay';
import MessageAlert from '../components/Alerts';
import PageLayout from '../components/Layout/PageLayout';


export default class PDF extends React.Component
{
    state =
        {pdf: null

        ,loading: false
        ,loadingState: null
        ,error: []
        };

    _pdfGenerator;

    componentDidMount()
    {
        const { guid, instance } = this.props;

        this.setState({ loading: true, loadingState: "Initialising" });

        this._pdfGenerator = new ExportPDF(guid, instance, this.onError);
        this._pdfGenerator.Load(this.onPDFLoaded);
    }

    componentWillUnmount()
    {
        if (this._pdfGenerator)
            this._pdfGenerator.deconstructor();
    }

    onError = (error) => this.state.error.push(error);
    onPDFLoaded = () =>
    {
        this.setState({ loadingState: "Copying Template" });
        this._pdfGenerator.Clone(this.onPDFCloned);
    }
    onPDFCloned = () =>
    {
        this.setState({ loadingState: "Generating Layout" });
        const layout = this._pdfGenerator.GenerateLayout();

        this.setState({ loadingState: "Printing Document" });
        this._pdfGenerator.PrintLayout(layout, this.onPDFPrinted);
    }
    onPDFPrinted = (data) => this.setState({ pdf: data, loadingState: "Loading Document" });

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
        const { pdf, loading, loadingState, error } = this.state;

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={pdf && { label: "Send PDF", onPress: this.handleEmail }}
            >
                {loading &&
                <React.Fragment>
                <Text style={LoadingStyles.label}>Loading ...</Text>
                {loadingState &&
                <Text style={LoadingStyles.subtitle}>{loadingState}</Text>
                }
                </React.Fragment>
                }
                {error &&
                <Text>{error.map((error) => "- " + error + "\n")}</Text>
                }
                {pdf &&
                <PDFDisplay
                    pdfPath={pdf}
                    onLoadComplete={() => this.setState({ loading: false })}
                    onError={this.onError}
                />
                }
            </PageLayout>
        );
    }
}