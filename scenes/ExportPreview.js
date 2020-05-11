import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LoadingStyles } from '../utils/Style';
import { ExportPDF } from '../export';

import Instance from '../context/Instance';

import PDFDisplay from '../components/PDFDisplay';
import PageLayout from '../components/Layout/PageLayout';
import ShareDialog from '../components/Dialog/ShareDialog';


export default class PDF extends React.Component
{
    state =
        {pdfPath: null
        ,valuesExist: false

        ,showSend: false
        ,loading: false
        ,loadingState: null
        ,error: []
        };

    componentDidMount()
    {
        this.generatePDF();
        Instance.ValuesExist({ guid: this.props.guid, id: this.props.id })
            .then(exists => this.setState({ valuesExist: exists }));
    }

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
            this.setState({ pdfPath: path, pdfTitle: path.substring(path.lastIndexOf('/') + 1, path.length - 4), loadingState: "Loading Document" });
        }
        catch (err)
        {
            this.onError(err);
            this.setState({ loadingState: "An error occured generating the document." })
        }
    }

    toggleShowSend = () => this.setState({ showSend: !this.state.showSend });

    render()
    {
        const { pdfPath } = this.state;

        let shareOptions = [
            {icon: { name: 'file-pdf', type: 'FontAwesome5' }
            ,title: 'Document PDF'
            ,file: { title: this.state.pdfTitle, path: this.state.pdfPath }
            }];
        if (this.state.valuesExist)
            shareOptions.push(
                {icon: { name: 'image', type: 'FontAwesome' }
                ,title: 'Document Images'
                ,file: { title: this.state.pdfTitle, path: this.state.valuesExist }
                });

        return (
            <PageLayout
                back={{ icon: "arrow-back", onPress: Actions.pop }}
                next={pdfPath && { icon: "send", iconType: "Feather", onPress: this.toggleShowSend }}
            >
                {this.state.loading &&
                <React.Fragment>
                <Text style={{ ...LoadingStyles.label, marginTop: 200 }}>Loading ...</Text>
                <Text style={LoadingStyles.subtitle}>{this.state.loadingState || ""}</Text>
                </React.Fragment>
                }
                {this.state.error &&
                <Text>{this.state.error.map((error) => "- " + error + "\n")}</Text>
                }
                {pdfPath &&
                <React.Fragment>
                <PDFDisplay
                    pdfPath={pdfPath}
                    onLoadComplete={() => this.setState({ loading: false })}
                    onError={this.onError}
                />
                <ShareDialog
                    isVisible={this.state.showSend}
                    onClose={this.toggleShowSend}
                    options={shareOptions}
                />
                </React.Fragment>
                }
            </PageLayout>
        );
    }
}