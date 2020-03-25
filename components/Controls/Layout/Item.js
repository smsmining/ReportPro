import React from 'react';
import { ListItem } from 'native-base';

import { styles, HighlightStyles } from '../../../utils/Style';

export default Item = ({ value, required, highlightRequired, children }) => (
    <ListItem style={{ ...styles.borderBottom, ...(required && (highlightRequired && (value === undefined || value === null) ? HighlightStyles.error : HighlightStyles.warning)) }} noIndent>
        {children}
    </ListItem>
);