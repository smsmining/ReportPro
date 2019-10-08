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

    componentDidMount()
    {
        this.generatePDF();
    }

    onError = (error) => this.state.error.push(error);

    generatePDF = async () =>
    {
        const { guid, instance } = this.props;

        this.setState({ loading: true, loadingState: "Initialising" });
        pdfGenerator = await new ExportPDF(guid, instance, this.onError).Load();

        const layout = pdfGenerator.GenerateLayout();

        this.setState({ loadingState: "Printing Document" });
        let path = await pdfGenerator.PrintLayout(layout, page => this.setState({ loadingState: page ? "Printing Page " + page : "Saving Document" }));

        this.setState({ pdf: path, loadingState: "Loading Document" })
    }

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