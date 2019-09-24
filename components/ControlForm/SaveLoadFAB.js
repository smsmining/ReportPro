import React from 'react';
import { Fab, Icon, Button } from 'native-base';

import { FabStyles } from '../../utils/Style';

export default class SaveLoadFab extends React.Component
{
    state =
        {expanded: false
        };

    toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

    onSave = () =>
    {
        const { onSave } = this.props;

        this.toggleExpanded();

        if (onSave)
            onSave();
    }

    onLoad = () =>
    {
        const { onLoad } = this.props;

        this.toggleExpanded();

        if (onLoad)
            onLoad();
    }

    onNew = () =>
    {
        const { onNew } = this.props;

        this.toggleExpanded();

        if (onNew)
            onNew();
    }

    render()
    {
        const { onSave, onLoad, onNew } = this.props;
        const { expanded } = this.state;

        return (
            <Fab
                active={expanded}
                direction="up"
                containerStyle={{ bottom: 76 }}
                position="bottomRight"
                style={FabStyles.main}
                onPress={this.toggleExpanded}
            >
                <Icon name={expanded ? "folder-open" : "folder"} type="FontAwesome" />
                {onSave &&
                <Button style={FabStyles.node} onPress={this.onSave} >
                    <Icon name="save" type="FontAwesome" style={FabStyles.nodeIcon} />
                </Button>
                }
                {onLoad && 
                <Button style={FabStyles.node} onPress={this.onLoad} >
                    <Icon name="edit" type="FontAwesome" style={FabStyles.nodeIcon} />
                </Button>
                }
                {onNew &&
                <Button style={FabStyles.node} onPress={this.onNew} >
                    <Icon name="copy" type="FontAwesome" style={FabStyles.nodeIcon}/>
                </Button>
                }
            </Fab>
        );
    }
}