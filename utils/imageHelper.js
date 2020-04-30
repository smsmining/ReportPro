import ImageResizer from 'react-native-image-resizer';
import AppFlags from '../AppFlags';
import { Rename, Temp, Read, Remove } from './Storage';

let imageHelper = {};

imageHelper.FitInside = (orig, target) =>
{
    let renderstyle = { ...target };

    const ratio = orig.width / orig.height;
    const orientation = target.width > target.height ? 'l' : 'p';
    if (orientation === 'l')
        renderstyle.height = target.width / ratio;
    else
        renderstyle.width = target.height * ratio;

    const shrink = Math.min(target.height / renderstyle.height, target.width / renderstyle.width);
    renderstyle.width *= shrink;
    renderstyle.height *= shrink;

    return renderstyle;
}


imageHelper.calcScale = (orig, target) =>
{
    if (!AppFlags.PDFDraw.image.maxScaling || target >= orig)
        return 1;

    let scale = orig / target;
    scale = Math.pow(scale, 0.5);
    return Math.min(scale, AppFlags.PDFDraw.image.maxScaling);
};

imageHelper.imageScale = async (uri, width, height, type, compression, format) =>
{
    try
    {
        let image = await ImageResizer.createResizedImage(uri, width, height, type.toUpperCase().replace('JPG', 'JPEG'), compression);

        if (!format)
        {
            let newPath = await Temp() + 'scaled.' + image.uri.substring(image.uri.lastIndexOf('.') + 1);
            await Rename(image.uri.replace('file://', ''), newPath);
            return 'file://' + newPath;
        }

        let data = await Read(image.uri, format);
        await Remove(image.uri);
        return data;
    }
    catch (e) { console.warn('Failed to Scale Image', e); return null; }
};


imageHelper.getImageParams = (uri) =>
{
    const isBase = /^data:image\/([a-zA-Z]+);base64,.+/g.exec(uri);
    let result = { type: null, uri: null, isBase: !!isBase };

    if (isBase)
    {
        result.type = isBase[1].toLowerCase();
        result.uri = uri.replace(isBase[1], result.type).replace(/\n/g, '');
    }
    else
    {
        const storageIndex = uri.indexOf('/storage');
        result.uri = storageIndex !== -1
            ?   uri.substr(storageIndex)
            :   uri;

        result.type = result.uri.substring(result.uri.lastIndexOf('.') + 1).toLowerCase();
    }

    return result;
};

export default ImageHelper = imageHelper;
