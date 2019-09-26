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

        if (!response)
            return this._onError("Export to PDF failed to find form data.");

        this._formConfig = response;

        this._onLoaded();
    }

    Generate = (onComplete) =>
    {
        if (!this._formConfig)
            return this._onError("Export to PDF not configured.");

        this._onComplete = onComplete;

        this._writeFile = new PDFDraw(this._onError);
        this._writeFile.Clone(this._guid, this._formConfig.pdfname, this.WriteValues);
    }

    WriteValues = () =>
    {
        let layout = {};

        for (tab in this._formConfig.tabs)
            this.generateLayoutData(layout, this._formConfig.tabs[tab], this._values);

        for (page in layout)
        {
            this._writeFile.SetPage(parseInt(page, 10));

            for (let i = 0; i < layout[page].length; i++)
            {
                const draw = layout[page][i];

                if (draw.style.backgroundColor)
                    this._writeFile.DrawRectangle({ ...draw.style, color: draw.style.backgroundColor });

                if (!draw.value)
                    continue;

                if (ControlKeys.ImageSelect === draw.type)
                {
                    this._writeFile.DrawImage(draw.value, draw.style);
                    continue;
                }
                
                this._writeFile.DrawText(draw.value, draw.style);
            }

            this._writeFile.Apply();
        }

        this._onComplete(this._writeFile.path);
    }

    generateLayoutData = (layout, control, values) =>
    {
        const { type, controls } = control || {};

        if (ControlKeys.Tab === type)
        {
            for (child in controls)
                this.generateLayoutData(layout, controls[child], values);
            return;
        }

        if (ControlKeys.Looper === type)
            return this.generateLooperLayoutData(layout, control, values);

        this.generateControlLayoutData(layout, control, values);
    }

    generateLooperLayoutData = (layout, control, values) =>
    {
        const { param, value, pdf, grid, controls } = control || {};

        if (!pdf)
            return;

        if (pdf.length > 1)
            return this._onError("Export to PDF cannot handle multipage loopers");

        const renderValues = (values || {})[param] || value;

        if (!renderValues)
            return;

        let sublayouts = [];
        for (loop in renderValues)
        {
            let sublayout = {};

            for (child in controls)
                this.generateLayoutData(sublayout, controls[child], renderValues[loop]);

            if (sublayout.length > 1 || (sublayout.length === 1 && !sublayout[0]))
            {
                this._onError("Export to PDF cannot handle multipage looper children");
                continue;
            }

            if (sublayout[0])
                sublayouts.push(sublayout[0]);
        }

        for (page in pdf)
        {
            if (pdf[page].length > 1 || !grid[page] || grid[page].length > 1 )
                return this._onError("Export to PDF cannot handle multidraw loopers");

            const { x, y, width, height, vertical } = pdf[page][0];

            if (!width || !height)
                return this._onError("Export to PDF requires looper size definition");

            const { width: cellWidth, height: cellHeight, margin: cellMargin } = grid[page][0];

            if (!cellWidth || !cellHeight)
                return this._onError("Export to PDF requires looper cell size definition");


            let loopLayouts = [];
            let loopTracking = { x: x || 0, y: height - (y || 0)};

            for (loop in sublayouts)
            {
                const styles = sublayouts[loop].map(draw => draw.style);
                const drawsWidth = Math.max(...styles.map(style => style.x + (style.width || 0)));
                const drawsHeight = Math.max(...styles.map(style => style.y + (style.height || 0)));

                if (drawsWidth > cellWidth || drawsHeight > cellHeight)
                    return this._onError("Export to PDF requires looper children within cell size definition");
            }


            for (loop in sublayouts)
            {
                let draws = sublayouts[loop];

                for (child in draws)
                {
                    const draw = draws[child];
                    let { style } = draw;

                    style.width = style.width || (cellWidth - style.x);
                    style.height = style.height || (style.y - cellHeight);

                    style.x += loopTracking.x;
                    style.y = loopTracking.y - style.y;

                    loopLayouts.push(draw);
                }

                if (vertical)
                {
                    loopTracking.y -= cellHeight + (cellMargin || 0);

                    if (loopTracking.y - cellHeight < y)
                        continue;

                    loopTracking.y = height;

                    loopTracking.x += cellWidth + (cellMargin || 0);

                    if (loopTracking.x > width)
                        return this._onError("Export to PDF requires looper children not exceed size definition");
                }
                else
                {
                    loopTracking.x += cellWidth + (cellMargin || 0);

                    if (loopTracking.x + cellWidth < width)
                        continue;
                    
                    loopTracking.x = x || 0;

                    loopTracking.y -= cellHeight + (cellMargin || 0);

                    if (loopTracking.y < y)
                        return this._onError("Export to PDF requires looper children not exceed size definition");
                }
            }

            if (!layout[page]) layout[page] = [];

            layout[page] = layout[page].concat(loopLayouts);
            layout[page].push({ style: pdf[page][0] });
        }

        return;
    }

    generateControlLayoutData = (layout, control, values) =>
    {
        const { type, param, value, pdf, controls } = control || {};

        if (!pdf || !param) return;

        const renderValue = (values || { })[param] || value;

        if (renderValue === true)
            renderValue = pdf.trueValue || '\u2611';
        else if (renderValue === false)
            renderValue = pdf.falseValue || '\u2610';

        else if (!renderValue) return;

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