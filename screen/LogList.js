import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppStyle, { Color } from '../style/app-style';
import axios from 'axios';
import { BasicLI } from '../component/list';
import RefreshableList from '../component/refreshable-list';
import PropTypes from 'prop-types';
import { getAxiosGraphQLQuery } from '../helper/api-helper';
import { Icon } from 'react-native-elements'


const createStatusIcon = (status, size = 40) => {
    let style = StyleSheet.create({
        status: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            width: size,
            height: size
        },
        statusText: {
            color: "white",
            fontSize: size - 10
        },
        backRed: {
            backgroundColor: Color.red,
        },
        backGreen: {
            backgroundColor: Color.green,
        }
    });

    var backStyle = status ? style.backGreen : style.backRed;
    var iconName = status ? "check" : "close";

    return <View style={[style.status, backStyle]}>
        <Icon style={style.statusText}
            name={iconName} color="white" />
    </View>;
}


export default class LogList extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
    }

    loadData(page) {
        var q = `query{ logs(page:${page}, offset:10) { 
            ID status date 
            activity {ID name} 
            } }`;

        return getAxiosGraphQLQuery(q).then((res) => {
            //console.log(res.data.data.logs);
            //console.log("data fetched " + res.data.data.logs.length);
            return res.data.data.logs;
        })
    }

    renderItem(i, d) {
        const title = `${d.date} - ${d.activity.name}`;
        const onPress = () => {
            this.props.navigation.navigate('LogDetail', { title: title, data: d });
        }

        return <LogLi key={i}
            onPress={onPress}
            data={d} />;
    }

    keyExtractor(d) {
        return d.ID;
    }

    render() {
        return <RefreshableList
            loadData={this.loadData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
        />
    }
}


// #############################################################################
// LogLi -------------------------------

const style = StyleSheet.create({
    view: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        padding: 7,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: Color.lightGray
    },
    text: {
        marginLeft: 10
    }
});

class LogLi extends React.Component {
    render() {
        var d = this.props.data;
        var v = <View style={style.view}>
            {createStatusIcon(d.status)}
            <Text style={[AppStyle.h1, style.text]}>{d.date}</Text>
        </View>

        return <BasicLI onPress={this.props.onPress}
            customView={v} />;
    }
}

LogLi.propTypes = {
    onPress: PropTypes.func,
    data: PropTypes.object.isRequired
}

LogLi.defaultProps = {
    customView: null
}
