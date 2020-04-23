import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Share from 'react-native-share';

import { LoadingStyles } from '../utils/Style';
import { ExportPDF } from '../export';

import PDFDisplay from '../components/PDFDisplay';
import PageLayout from '../components/Layout/PageLayout';
import { GeneralAlertDialog } from '../components/Alerts';
import { Scenes } from '../scenes';
import { Zip } from '../utils/Storage';

export default class PDF extends React.Component
{
    state =
        {pdfPath: null

        ,loading: false
        ,loadingState: null
        ,error: []
        };

    componentDidMount() { this.generatePDF(); }

    onError = (error) => this.state.error.push(error);

    generatePDF = async () =>
    {
        const { guid, instance } = this.props;
        this.setState({ loading: true, loadingState: "Initialising" });

        try
        {
            pdfGenerator = await new ExportPDF(guid, instance, this.onError).Load();
            const layout = pdfGenerator.GenerateLayout();

            this.setState({ loadingState: "Printing Document" });
            const path = await pdfGenerator.PrintLayout(layout, page => this.setState({ loadingState: page ? "Printing Page " + page : "Saving Document" }))
            this.setState({ pdfPath: path, loadingState: "Loading Document" });
        }
        catch (err)
        {
            this.onError(err);
            this.setState({ loadingState: "An error occured generating the document." })
        }
    }

    handleShare = async () =>
    {
        const { pdfPath } = this.state;

        try
        {
            let intentTitle = pdfPath.substring(pdfPath.lastIndexOf('/') + 1, pdfPath.length - 4);
            let zipPath = await Zip(pdfPath);

            await Share.open(
                {title: intentTitle
                ,url: zipPath
                ,type: 'application/zip'
                });

            this.props.onChange();
            Actions.popTo(Scenes.ControlForm);
          }
        catch (e)
        {
            console.log(e);
            GeneralAlertDialog
                ("Send Error"
                ,"An issue occured sending the document"
                );
        }  
    }

    render()
    {
        const { pdfPath, loading, loadingState, error } = this.state;

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={pdfPath && { icon: "send", iconType:"Feather", onPress: this.handleShare }}
            >
                {loading &&
                <React.Fragment>
                <Text style={{ ...LoadingStyles.label, marginTop: 200 }}>Loading ...</Text>
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