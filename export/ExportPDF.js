import Forms from '../context/Forms';

import PDFDraw from '../utils';

export class ExportPDF
{
    _asyncReqForm;

    _guid;
    _pdfConfig;
    _values;

    _writeFile;

    _onLoaded;
    _onComplete;

    constructor(formGuid, values, onLoaded)
    {
        this._guid = formGuid;
        this._values = values;

        this._onLoaded = onLoaded;
        this._asyncReqForm = Forms.Get(formGuid, this.handleFormResponse);
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
            throw new Error("No PDF configuration");

        this._pdfConfig = response.pdf;

        if (this._onLoaded)
            this._onLoaded();
    }

    Generate = (onComplete) =>
    {
        if (!this._values || !this._pdfConfig)
            throw new Error("ExportPDF not configured for Generate()");

        this._onComplete = onComplete;

        this._writeFile = new PDFDraw();
        this._writeFile.Clone(this._guid, this._pdfConfig.name, this.WriteValues);
    }

    WriteValues = () =>
    {
        this._pdfConfig.forEach(page =>
        {
            this._writeFile.Apply();
            this._writeFile.SetPage(page.id);

            page.controls.forEach(control =>
            {
                if (control.type === 'imageSelect')
                    this._writeFile.DrawImage(this._values[control.param], control.style);

                else
                    this._writeFile.DrawText(this._values[control.param], control.style);
            });
        });

        this._writeFile.Apply(this._onComplete);
    }
}