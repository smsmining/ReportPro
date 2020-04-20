import Forms from '../context/Forms';

import { PDFDraw } from '../utils';
import { ControlKeys } from '../components/ControlItem';
import { jsonHelper } from '../utils/jsonHelper';

const IsAppendix = /A(\d+)(?:\[((?:\d+)|(?:{+}+))\])?/i;

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

        if (ControlKeys.Tab === type
        ||  ControlKeys.Collapse === type
        ||  ControlKeys.Model === type
            )
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

        if (!pdf) return;

        let renderValues = (values || {})[param];
        if (renderValues)
            renderValues = renderValues.value;
        else
            renderValues = value;

        if (!renderValues) return;

        let pageLayouts = {};
        let loopConfigs = {};
        for (loop in renderValues)
        {
            let sublayout = {};
            const loopValues = renderValues[loop] || {};

            for (child in controls)
                this.generateLayoutData(sublayout, controls[child], loopValues);

            for (const [key, layouts] of Object.entries(sublayout))
            {
                const parts = key.split('.');
                const page = parts[0];
                const alias = parts[1] || 0;

                if (!pdf[page] || !pdf[page][alias])
                {
                    this._onError("Error: No PDF for [" + page + "," + alias + "]");
                    continue;
                }

                if (!pageLayouts[page]) pageLayouts[page] = {};
                if (!pageLayouts[page][alias]) pageLayouts[page][alias] = {};

                pageLayouts[page][alias][loop] = layouts;
            }

            if (loopValues['{}'])
                loopConfigs[loop] = loopValues['{}'];
        }

        for (page in pdf)
        for (alias in pdf[page])
        {
            if (!grid[page][alias])
                return this._onError("Error: No Grid (" + param + "[" + page + "," + alias + "])");

            const sublayouts = (pageLayouts[page] || {})[alias] || {};
            const { x, y, width, height, vertical } = pdf[page][alias];

            if (!width || !height)
                return this._onError("Error: No looper sizing (" + param + ")");

            const { width: cellWidth, height: cellHeight, margin: cellMargin } = grid[page][alias];

            if (!cellWidth || !cellHeight)
                return this._onError("Error: No looper cell sizing (" + param + ")");

            for (loop in sublayouts)
                if (!this.layoutWithinBounds(sublayouts[loop], cellWidth, cellHeight))
                    return this._onError("Error: Looper cell size exceed (" + param + ")");


            const isApp = IsAppendix.exec(page);
            const maxX = x + width;

            let loopLayouts = {};
            let loopTracking = { x: x, y: y + height, page: 1 };

            for (loop in sublayouts)
            {
                if (!sublayouts[loop])
                    continue;

                const loopConfig = loopConfigs[loop] || {};
                const loopWidth = loopConfig.width || cellWidth;
                const loopHeight = loopConfig.height || cellHeight;

                if ((loopTracking.y - loopHeight) < y
                ||  (loopTracking.x + loopWidth) > maxX
                    )
                {
                    if (!isApp)
                        { this._onError("Error: Looper size exceed (" + param + ")"); break; }

                    loopTracking = { x: x, y: y + height, page: loopTracking.page + 1 };
                }

                let draws = sublayouts[loop];
                let drawResults = [];

                for (child in draws)
                {
                    const draw = jsonHelper.Clone(draws[child]);
                    let { style } = draw;

                    style.width = style.width || (cellWidth - style.x);
                    style.height = style.height || (style.y - cellHeight);

                    style.x += loopTracking.x;
                    style.y = loopTracking.y - cellHeight + style.y;

                    drawResults.push(draw);
                }

                if (!loopLayouts[loopTracking.page])
                    loopLayouts[loopTracking.page] = [];
                loopLayouts[loopTracking.page] = loopLayouts[loopTracking.page].concat(drawResults);

                if (vertical)
                {
                    loopTracking.y -= loopHeight + (cellMargin || 0);

                    if (loopTracking.y - loopHeight >= y)
                        continue;

                    loopTracking.y = height;
                    loopTracking.x += loopWidth + (cellMargin || 0);
                }
                else
                {
                    loopTracking.x += loopWidth + (cellMargin || 0);

                    if (loopTracking.x + loopWidth <= maxX)
                        continue;

                    loopTracking.x = x || 0;
                    loopTracking.y -= loopHeight + (cellMargin || 0);
                }
            }

            for (const [loop, loopLayout] of Object.entries(loopLayouts))
            {
                const renderPage = page
                    .replace(/\{\}/g, loop)
                    .replace(/\{\{/g, '{')
                    .replace(/\}\}/g, '}');
                    
                if (!layout[renderPage]) layout[renderPage] = [];

                layout[renderPage] = layout[renderPage].concat(loopLayout);
                layout[renderPage].push({ style: pdf[page][alias] });
            }
        }
    }

    layoutWithinBounds = (layouts, width, height) =>
    {
        if (!layouts)
            return true;

        const styles = layouts.map(draw => draw.style);
        const drawsWidth = Math.max(...styles.map(style => style.x + (style.width || 0)));
        const drawsHeight = Math.max(...styles.map(style => style.y + (style.height || 0)));

        return drawsWidth <= width && drawsHeight <= height;
    }

    generateControlLayoutData = (layout, control, values) =>
    {
        const { type, param, value, pdf, controls } = control || {};

        if (!pdf || !param) return;

        let renderValue = (values || {})[param];

        if (renderValue)
            renderValue = renderValue.value;
        else if (typeof value === 'object'
            && !(value instanceof Date)
            )
            renderValue = value.value;
        else
            renderValue = value;

        if (renderValue === null || renderValue === undefined)
            return;

        if (type == ControlKeys.CheckBox)
            renderValue = !(!renderValue);

        else if (!renderValue) return;

        let option = null;
        if (controls && ControlKeys.Spinner === type)
        {
            option = controls.find(option => option.value === renderValue);

            if (option && option.renderValue)
                renderValue = option.renderValue;
        }


        if (renderValue instanceof Date)
        {
            const dateFormat = require('dateformat');
            renderValue = dateFormat(renderValue, control.renderFormat || "d mmm yyyy");
        }

        let defaultFont = "Helvetica";
        if (renderValue === true)
        {
            renderValue = pdf.trueValue || '\u2713';
            defaultFont = "ZapfDingbats";
        }
        else if (renderValue === false)
        {
            if (!pdf.falseValue)
                return;

            renderValue = pdf.falseValue;
            defaultFont = "ZapfDingbats";
        }


        for (page in pdf)
        {
            if (!layout[page]) layout[page] = [];

            let additionalStyle = {};
            if (option && option.pdf)
                additionalStyle = { ...additionalStyle, ...option.pdf };

            for (alias in pdf[page])
                layout[page].push(
                    {type: type
                    ,value: renderValue
                    ,style: { ...pdf[page][alias], ...additionalStyle, font: pdf[page][alias].font || defaultFont }
                    });
        }
    }

    
    PrintLayout = async (layout, onUpdate, onSucceed) =>
    {
        writeFile = new PDFDraw();
        await writeFile.Clone(this._guid, this._formConfig.pdfname); 

        let appendix = {};
        let maxPage = 0;

        for (page in layout)
        {
            const layoutPage = layout[page];

            if (!layoutPage)
                continue;

            const isApp = IsAppendix.exec(page);
            if (isApp)
            {
                const appPage = isApp[1];
                const appLoop = isApp[2];

                if (!appendix[appPage]) appendix[appPage] = {all: []};

                if (appLoop)
                {
                    if (!appendix[appPage][appLoop]) appendix[appPage][appLoop] = [];
                    appendix[appPage][appLoop] = appendix[appPage][appLoop].concat(layoutPage);
                }
                else
                    appendix[appPage].all = appendix[appPage].all.concat(layoutPage);

                continue;
            }
            else
            {
                const pageNo = parseInt(page, 10);
                onUpdate(pageNo + 1);
                maxPage = Math.max(pageNo, maxPage);

                writeFile.SetPage(pageNo);

                for (let i = 0; i < layoutPage.length; i++)
                    await this.PrintLayoutElement(writeFile, layoutPage[i]);
            }
        }

        for (page in appendix)
        for (loop in appendix[page])
        {
            if (loop === 'all')
                continue;

            const pageNo = parseInt(page, 10);
            const app = appendix[page][loop];
            onUpdate(maxPage++);

            await writeFile.CloneAppendix(pageNo);

            for (let i = 0; i < app.length; i++)
                await this.PrintLayoutElement(writeFile, app[i]);

            if (appendix[page].all)
            for (let i = 0; i < appendix[page].all.length; i++)
                await this.PrintLayoutElement(writeFile, appendix[page].all[i]);
        }

        onUpdate();
        await writeFile.Apply();

        if (onSucceed)
            return onSucceed(writeFile.path);

        return writeFile.path;
    }

    PrintLayoutElement = async (doc, draw) =>
    {
        if (draw.style.backgroundColor)
            doc.DrawRectangle({ ...draw.style, color: draw.style.backgroundColor });

        if (!draw.value)
            return;

        if (ControlKeys.ImageSelect === draw.type
        ||  ControlKeys.Signature === draw.type
            )
        {
            await doc.DrawImage(draw.value, draw.style);
            return;
        }

        await doc.DrawText(draw.value, draw.style);
    }
}