import React from 'react';
import { StackNavigator } from 'react-navigation';

import CalendarView from './CalendarView';
import CalendarDateDetail from './CalendarDateDetail';

export default Calendar = StackNavigator({
    CalendarView: {
        screen: CalendarView,
        navigationOptions: {
            title: "Overview"
        }
    }
    , CalendarDateDetail: {
        screen: CalendarDateDetail,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.title
        })
    }
}); 