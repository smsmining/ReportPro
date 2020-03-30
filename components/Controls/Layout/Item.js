import React from 'react';
import { ListItem } from 'native-base';

import { styles, HighlightStyles } from '../../../utils/Style';

export default Item = ({ value, required, hidden, highlightRequired, children, itemDivider, style }) => (
    <ListItem
        style={
            {...(style || styles.borderBottom)
            ,...(required && (highlightRequired && (value === undefined || value === null) ? HighlightStyles.error : HighlightStyles.warning))
            ,display: hidden ? 'none' : undefined
            }}
        noIndent
        itemDivider={itemDivider}
    >
        {children}
    </ListItem>
);