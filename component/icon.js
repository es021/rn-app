import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Color } from '../style/app-style';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export class IconButton extends React.Component {
    render() {
        const style = StyleSheet.create({
            circle: {
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                width: this.props.size,
                height: this.props.size,
                borderColor: this.props.color
            },
            loading: {
                backgroundColor: Color.none
            }
        });

        let color = this.props.circle ? "white" : this.props.color;
        let extraStyle = this.props.circle ? style.circle : {};
        let size = this.props.circle ? this.props.size - 5 : this.props.size;

        let content = null;
        let onPress = null;
        if (this.props.loading) {
            loadStyle = style.loading;
            content = <ActivityIndicator size="large"></ActivityIndicator>;
            onPress = () => { };
        } else {
            loadStyle = {};
            onPress = this.props.onPress;
            content = <Icon name={this.props.name} color={color} size={size} />;
        }

        return <TouchableOpacity style={[this.props.wrapperStyle, extraStyle, loadStyle]}
            onPress={onPress}>
            {content}
        </TouchableOpacity>
    }
}

IconButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string,
    wrapperStyle: PropTypes.any,
    circle: PropTypes.bool,
    loading: PropTypes.bool
}

IconButton.defaultProps = {
    color: Color.blue,
    circle: false,
    loading: false
}
