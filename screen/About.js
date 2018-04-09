import React from 'react';
import { Text, View } from 'react-native';
import AppStyle from '../style/app-style';
import { FlexView } from '../component/view';

export default class About extends React.Component {
    render() {
        return (
            <FlexView>
                <Text>About</Text>
            </FlexView>
        );
    }
}