import React from 'react';
import { Text, View, DrawerLayoutAndroid } from 'react-native';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { TabApp } from './config/router';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    var navigationView = <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>
    </View>

    return (
      <DrawerLayoutAndroid 
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <TabApp />
      </DrawerLayoutAndroid>
    );
  }
} 