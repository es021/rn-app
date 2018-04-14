import React from 'react';
import { Text, View } from 'react-native';
import AppStyle from '../style/app-style';
import axios from 'axios';
import { FlexView } from '../component/view';
import { FullLoader } from '../component/loader';
import RefreshableList from '../component/refreshable-list';
import { getNavigationParams } from '../config/router';


export default class LogDetail extends React.Component {
    render() {
        var d = getNavigationParams(this).data;
        return (
            <FlexView>
                <Text>LogDetail {JSON.stringify(d)}</Text>
            </FlexView>
        );
    }
}