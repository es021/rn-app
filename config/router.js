import React from 'react';
import { TabNavigator } from 'react-navigation';

import Calendar from '../screen/Calendar';
import About from '../screen/About';
import Log from '../screen/Log';

export const getNavigationParams = (obj) => {
    return obj.props.navigation.state.params;
}

export const TabApp = TabNavigator({
    Calendar: { screen: Calendar },
    Log: { screen: Log },
    About: { screen: About }
});