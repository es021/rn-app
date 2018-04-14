import React from 'react';
import { TabNavigator } from 'react-navigation';

import Home from '../screen/Home';
import About from '../screen/About';
import Log from '../screen/Log';

export const getNavigationParams = (obj) => {
    return obj.props.navigation.state.params;
}

export const TabApp = TabNavigator({
    Home: { screen: Home },
    Log: { screen: Log },
    About: { screen: About }
});