import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppStyle from '../style/app-style';
import PropTypes from 'prop-types';

// #############################################################################
// BasicLi -------------------------------

const styleBasicLI = StyleSheet.create({
    border: {
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    padding: {
        padding: 5
    }
});

export class BasicLI extends React.Component {
    render() {
        return <TouchableOpacity onPress={this.props.onPress}>
            {this.props.customView === null ?
                <View style={[styleBasicLI.border, styleBasicLI.padding]}>
                    <Text style={AppStyle.h1}>{this.props.title}</Text>
                    <Text>{this.props.subtitle}</Text>
                </View>
                : this.props.customView}
        </TouchableOpacity>
    }
}

BasicLI.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    customView: PropTypes.obj,
    onPress: PropTypes.func
}

BasicLI.defaultProps = {
    onPress: () => { },
    customView: null
}
