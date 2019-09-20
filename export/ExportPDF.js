import Forms from '../context/Forms';

import { PDFDraw } from '../utils';
import { ControlKeys } from '../components/ControlItem';

export default class ExportPDF
{
    _asyncReqForm;

    _guid;
    _values;
    _formConfig;
    _pdfLayout;

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

        this._formConfig = response;

        this._onLoaded();
    }

    Generate = (onComplete) =>
    {
        if (!this._formConfig)
            this._onError("Export to PDF not configured.");

        this._onComplete = onComplete;

        this._writeFile = new PDFDraw(this._onError);
        this._writeFile.Clone(this._guid, this._formConfig.pdfname, this.WriteValues);
    }

    WriteValues = () =>
    {
        let layout = {};

        for (tab in this._formConfig.tabs)
            this.generateLayoutData(layout, this._formConfig.tabs[tab]);

        for (page in layout)
        {
            this._writeFile.SetPage(parseInt(page, 10));

            for (let i = 0; i < layout[page].length; i++)
            {
                const draw = layout[page][i];

                if (ControlKeys.ImageSelect === draw.type)
                    this._writeFile.DrawImage(draw.value, draw.style);

                else
                    this._writeFile.DrawText(draw.value, draw.style);
            }

            this._writeFile.Apply();
        }

        this._onComplete(this._writeFile.path);
    }

    generateLayoutData = (layout, control) =>
    {
        const { type, controls } = control || {};

        if (ControlKeys.Tab === type)
        {
            for (child in controls)
                this.generateLayoutData(layout, controls[child]);
            return;
        }

        if (ControlKeys.Looper === type)
            return this.generateLooperLayoutData(layout, control);

        this.generateControlLayoutData(layout, control);
    }

    generateLooperLayoutData = (layout, control) =>
    {
        const { controls } = control || {};

        let sublayout = {};

        for (child in controls)
            this.generateLayoutData(sublayout, controls[child]);

        //  Apply this.pdf onto sublayout

        return;
    }

    generateControlLayoutData = (layout, control) =>
    {
        const { type, param, value, pdf, controls } = control || {};

        if (!pdf || !param) return;

        const renderValue = (this._values || {})[param] || value;

        if (!renderValue) return;
        
        for (page in pdf)
        {
            if (!layout[page]) layout[page] = [];

            let additionalStyle = {};
            if (controls && ControlKeys.Spinner === type)
            {
                const option = controls.find(option => option.value === renderValue);

                if(option)
                    additionalStyle = { ...additionalStyle, ...option.pdf };
            }

            for (style in pdf[page])
                layout[page].push(
                    {type: type
                    ,value: renderValue
                    ,style: { ...pdf[page][style], ...additionalStyle }
                    });
        }
    }
}