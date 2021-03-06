import React from 'react';
import { Text } from 'native-base';
import { Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

import { AlignmentStyles, LoadingStyles } from '../utils/Style';
import Database from '../context/Database';
import { Models } from '../context/models';
import { ControlKeys } from '../context/forms/_config';

import PageLayout from '../components/Layout/PageLayout';
import ImportModel from '../components/ImportData/ImportModel';

export default class ImportData extends React.Component {
    state =
        {loading: false
        ,dirty: false

        ,instance: null
        }

    componentDidMount()
    {
        this.setState({ loading: true });
        Database.Read().then(result => this.setState({ loading: false, dirty: true, instance: result }));
    }

    componentDidUpdate()
    {
        if (this.state.dirty)
            this.setState({ dirty: false });
    }


    onChange = (value, param) =>
    {
        const newInstance = { ...this.state.instance, [param]: value };
        Database.Write(newInstance);

        this.setState({ instance: newInstance, dirty: true, });
    }
    

    mounting = [];
    setMounting = (mounting, param) =>
    {
        const index = this.mounting.indexOf(param);

        if ((index !== -1) === !(!mounting))
            return;

        if (mounting)
            return this.mounting.push(param);
        else
            this.mounting.splice(index, 1);

        setTimeout(() => this.setState({ loading: !(!this.mounting.length) }), 500);
    }

    render()
    {
        return (
            <PageLayout
                back={{ icon: "home", onPress: Actions.pop }}
            >
                {this.state.loading &&
                <Overlay height={100} containerStyle={AlignmentStyles.auto} isVisible>
                    <Text style={{ ...LoadingStyles.label, marginTop: 25 }}>Loading ...</Text>
                </Overlay>
                }
                <ScrollView>
                    <ImportModel
                        param='machines'
                        label='Machine'
                        model={Models.Machine}
                        importMap={
                            {machine_id: "A"
                            ,machine_model: "B"
                            ,machine_make: "C"
                            ,machine_sn: "D"
                            }}
                        controls={[
                            {param: 'machine_id'
                            ,type: ControlKeys.TextField
                            },
                            {param: 'machine_smu'
                            ,hidden: true
                            }]}
                        entityKey='machine_id'
                        entities={this.state.instance && this.state.instance.machines}
                        onChange={this.onChange}
                        onMounting={this.setMounting}
                        dirty={this.state.dirty}
                    />
                </ScrollView>
            </PageLayout>
        );
    }
}