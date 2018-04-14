import React from 'react';
import { StackNavigator } from 'react-navigation';

import LogList from './LogList';
import LogDetail from './LogDetail';

export default Log = StackNavigator({
    LogList: {
        screen: LogList,
        navigationOptions: {
            title: "Logs"
        }
    },
    LogDetail: {
        screen: LogDetail,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.title
        })
    }
});