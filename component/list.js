import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppStyle from '../style/app-style';

// title, subtitle, content
export class BasicLI extends React.Component {
    render() {
        return <View style={[style.border, style.padding]}>
            <Text style={AppStyle.h1}>{this.props.title}</Text>
            <Text>{this.props.subtitle}</Text>
        </View>
    }
}

const style = StyleSheet.create({
    border: {
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    padding: { 
        padding: 5
    }
});

