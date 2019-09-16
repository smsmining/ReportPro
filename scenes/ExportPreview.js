import React from 'react';
import { Text } from 'react-native';
import Mailer from 'react-native-mail';
import { Actions } from 'react-native-router-flux';

import { styles } from '../utils/Style';
import PDFDraw from '../utils/PDFDraw';
import Forms from '../context/Forms';

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

    pdfConfig = null;
    pdfName = '';

    componentDidMount()
    {
        const { guid } = this.props;

        this.setState({ loading: true });

        this._asyncReqPDF = Forms.Get(guid, this.handlerPDFResponse);
    }

    componentWillUnmount()
    {
        if (this._asyncReqPDF)
            this._asyncReqPDF.cancel();
    }

    handlerPDFResponse = (response) =>
    {
        this._asyncReqPDF = null;

        const { guid } = this.props;

        console.log(response);

        if (!response || !response.pdf)
            return this.setState({ error: "No PDF configuration", loading: false });

        this.pdfConfig = response.pdf.pages;
        this.pdfName = response.pdf.name + '.pdf';

        const date = new Date();
        const dateStamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() + 1) + "-" + date.getMinutes() + "." + date.getSeconds();

        const fileName = response.pdf.name.substring(0, response.pdf.name.indexOf('.pdf'));

        PDFDraw.CreateDummyPDF(guid, this.pdfName, fileName + dateStamp + '.pdf', this.onWritePDF);
    }

    onWritePDF = (pdfPath) =>
    {
        const { instance } = this.props;

        if (!this.pdfConfig)
            return;

        this.pdfConfig.forEach(page =>
        {
            let pdfPage = PDFDraw.PageHandler(page.id);

            page.controls.forEach(control =>
            {
                instance && PDFDraw.drawContent(pdfPage, control.type, instance[control.param], control.style);
            });

            PDFDraw.pdfWriter(pdfPath, pdfPage, this.onPDFGenerated);
        });
    }

    onPDFGenerated = (data) => this.setState({ pdf: data });

    handleEmail = () =>
    {
        const { pdf } = this.state;

        Mailer.mail(
            {subject: this.pdfName
            ,body: '<b>Please check</b>'
            ,isHTML: true
            ,attachment:
                {path: pdf
                ,type: 'pdf'
                ,name: this.pdfName,
                }
            }, (error) => MessageAlert('Email Error ', error));
    };

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