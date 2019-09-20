import Forms from '../context/Forms';

import { PDFDraw } from '../utils';

export default class ExportPDF
{
    _asyncReqForm;

    _guid;
    _pdfConfig;
    _values;

    _writeFile;

    _onError;
    _onLoaded;
    _onComplete;

    constructor(formGuid, values, onError)
    {
        this._guid = formGuid;
        this._values = values;

        this._onError = onError;
    }

    Load = (onLoaded) =>
    {
        this._onLoaded = onLoaded;
        this._asyncReqForm = Forms.Get(this._guid, this.handleFormResponse);
    }

    deconstructor = () =>
    {
        if (this._asyncReqForm)
            this._asyncReqForm.cancel();
    }

    handleFormResponse = (response) =>
    {
        this._asyncReqForm = null;

        if (!response || !response.pdf)
            this._onError("Export to PDF not configured.");

        this._pdfConfig = response.pdf;

        this._onLoaded();
    }

    Generate = (onComplete) =>
    {
        if (!this._pdfConfig)
            this._onError("Export to PDF not configured.");

        this._onComplete = onComplete;

        this._writeFile = new PDFDraw(this._onError);
        this._writeFile.Clone(this._guid, this._pdfConfig.name, this.WriteValues);
    }

    WriteValues = () =>
    {
        if (this._pdfConfig.pages && this._values)
            for (const pagePosition in this._pdfConfig.pages)
            {
                const page = this._pdfConfig.pages[pagePosition];

                if (!page.controls)
                    continue;

                this._writeFile.SetPage(page.id);

                for (const controlPosition in page.controls)
                {
                    const control = page.controls[controlPosition];

                    if (control.type === 'imageSelect')
                        this._writeFile.DrawImage(this._values[control.param], control.style);

                    else
                        this._writeFile.DrawText(this._values[control.param], control.style);
                }

                this._writeFile.Apply();
            }

        this._onComplete(this._writeFile.path);
    }
}