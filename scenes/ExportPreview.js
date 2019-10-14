import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';

import { LoadingStyles } from '../utils/Style';
import { ExportPDF } from '../export';

import PDFDisplay from '../components/PDFDisplay';
import PageLayout from '../components/Layout/PageLayout';


export default class PDF extends React.Component
{
    state =
        {pdfPath: null

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

        this.setState({ pdfPath: path, loadingState: "Loading Document" })
    }

    handleShare = async () =>
    {
        const { pdfPath } = this.state;

        let intentTitle = pdfPath.substring(pdfPath.lastIndexOf('/') + 1, pdfPath.length - 4);

        await Share.open(
            {title: intentTitle
            ,url: "file://" + pdfPath
            ,type: 'application/pdf'
            });

        Actions.pop();
    }

    render()
    {
        const { pdfPath, loading, loadingState, error } = this.state;

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={pdfPath && { label: "Send PDF", onPress: this.handleShare }}
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
                {pdfPath &&
                <PDFDisplay
                    pdfPath={pdfPath}
                    onLoadComplete={() => this.setState({ loading: false })}
                    onError={this.onError}
                />
                }
            </PageLayout>
        );
    }
}