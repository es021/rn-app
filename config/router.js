import React from 'react';
import { TabNavigator } from 'react-navigation';

import Home from '../screen/Home';
import About from '../screen/About';

export const TabApp = TabNavigator({
    Home: { screen: Home },
    About: { screen: About },
});