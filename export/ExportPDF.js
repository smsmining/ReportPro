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

    constructor(formGuid, values, onError)
    {
        this._guid = formGuid;
        this._values = values;

        this._onError = onError;
    }

    Load = async () =>
    {
        let form = await Forms.Get(this._guid);

        if (!form)
            return this._onError("Export to PDF failed to find form data.");

        this._formConfig = form;

        return this;
    }

    deconstructor = () =>
    {
        if (this._asyncReqForm)
            this._asyncReqForm.cancel();
    }


    GenerateLayout = () =>
    {
        let layout = {};

        for (tab in this._formConfig.tabs)
            this.generateLayoutData(layout, this._formConfig.tabs[tab], this._values);

        return layout;
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
            let loopTracking = { x: x, y: y + height };

            for (loop in sublayouts)
            {
                if (!sublayouts[loop])
                    continue;

                const styles = sublayouts[loop].map(draw => draw.style);
                const drawsWidth = Math.max(...styles.map(style => style.x + (style.width || 0)));
                const drawsHeight = Math.max(...styles.map(style => style.y + (style.height || 0)));

                if (drawsWidth > cellWidth || drawsHeight > cellHeight)
                    return this._onError("Export to PDF requires looper children within cell size definition");
            }


            for (loop in sublayouts)
            {
                let draws = sublayouts[loop];

                if (draws)
                {
                    if ((vertical && loopTracking.x > width)
                    || (!vertical && loopTracking.y < y)
                        )
                    {
                        this._onError("Export to PDF requires looper children not exceed size definition");
                        break;
                    }

                    for (child in draws)
                    {
                        const draw = draws[child];
                        let { style } = draw;

                        style.width = style.width || (cellWidth - style.x);
                        style.height = style.height || (style.y - cellHeight);

                        style.x += loopTracking.x;
                        style.y = loopTracking.y - cellHeight + style.y;

                        loopLayouts.push(draw);
                    }
                }
                    

                if (vertical)
                {
                    loopTracking.y -= cellHeight + (cellMargin || 0);

                    if (loopTracking.y - cellHeight > y)
                        continue;

                    loopTracking.y = height;

                    loopTracking.x += cellWidth + (cellMargin || 0);
                }
                else
                {
                    loopTracking.x += cellWidth + (cellMargin || 0);

                    if (loopTracking.x + cellWidth < width)
                        continue;

                    loopTracking.x = x || 0;

                    loopTracking.y -= cellHeight + (cellMargin || 0);
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

        let renderValue = (values || { })[param] || value;

        if (renderValue === true)
            renderValue = pdf.trueValue || '\u2611';
        else if (renderValue === false)
            renderValue = pdf.falseValue || '\u2610';

        else if (!renderValue) return;

        else if (renderValue instanceof Date)
        {
            const dateFormat = require('dateformat');
            renderValue = dateFormat(renderValue, control.format || "d mmm yyyy");
        }
        

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


    PrintLayout = async (layout, onUpdate, onSucceed) =>
    {
            writeFile = new PDFDraw();
            await writeFile.Clone(this._guid, this._formConfig.pdfname); 

            for (page in layout)
            {
                const pageNo = parseInt(page, 10);
                onUpdate(pageNo + 1);
                writeFile.SetPage(pageNo);

                for (let i = 0; i < layout[page].length; i++)
                {
                    const draw = layout[page][i];

                    if (draw.style.backgroundColor)
                        writeFile.DrawRectangle({ ...draw.style, color: draw.style.backgroundColor });
                    
                    if (!draw.value)
                        continue;

                    if (ControlKeys.ImageSelect === draw.type)
                    {
                        await writeFile.DrawImage(draw.value, draw.style);
                        continue;
                    }

                    await writeFile.DrawText(draw.value, draw.style);
                }
            }

            onUpdate();
            await writeFile.Apply();

            if (onSucceed)
                return onSucceed(writeFile.path);

            return writeFile.path;
    }
}