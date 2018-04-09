import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class FlexView extends React.Component {
    render() {
        return <View style={style.flex}>
            {this.props.children}
        </View>
    }
}

const style = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

