import React from 'react';
import { ActivityIndicator } from 'react-native';
import { FlexView } from './view';

export class FullLoader extends React.Component {
    render() {
        return <FlexView>
            <ActivityIndicator size="large" />
        </FlexView>
    }
}
