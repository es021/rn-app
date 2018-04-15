import React from 'react';
import { Text, View, Switch, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FlexView } from '../component/view';
import { FullLoader } from '../component/loader';

import AppStyle, { Color } from '../style/app-style';
import { BasicLI } from '../component/list';
import RefreshableList from '../component/refreshable-list';

import { getNavigationParams } from '../config/router';
import { getAxiosGraphQLQuery } from '../helper/api-helper';

import { createStatusIcon, createActivityDetail } from '../component/helper';

export default class CalendarDateDetail extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);

        this.onStatusChange = this.onStatusChange.bind(this);
        this.createLogStatusObj = this.createLogStatusObj.bind(this);
        this.getActivityLi = this.getActivityLi.bind(this);
        this.state = {
            logs: this.createLogStatusObj(getNavigationParams(this).data)
        }

        this.dateStr = getNavigationParams(this).dateStr;
    }

    createLogStatusObj(logs) {
        var r = {};
        if (logs !== null && typeof logs !== "undefined") {
            logs.map((d, i) => {
                r[d.activity_id] = d
            });
        }
        return r;
    }

    loadData(page) {
        var q = `query{ activities { ID name icon weight}}`;

        return getAxiosGraphQLQuery(q).then((res) => {
            return res.data.data.activities;
        });
    }

    renderItem(i, d) {
        return this.getActivityLi(i, d);
    }

    onStatusChange = (activity_id, v) => {

        this.setState((prevState) => {
            var currentStatus = null;
            if (!prevState.logs[activity_id]) {
                prevState.logs[activity_id] = {};
            } else {
                currentStatus = prevState.logs[activity_id].status;
            }

            var statusInt = v ? 1 : 0;
            var q = false;
            // new - add to DB
            if (currentStatus == null) {
                q = `mutation { add_log(activity_id:${activity_id}, 
                    status:${statusInt}, 
                    date:${this.dateStr}) { ID status activity_id } }`;
                ToastAndroid.show("Adding Status", ToastAndroid.SHORT);
            }
            // existing - update
            else if (currentStatus != v) {
                var ID = prevState.logs[activity_id].ID;
                q = `mutation { edit_log(ID:${ID}, 
                    status:${statusInt}) { ID } }`;

                ToastAndroid.show("Updating Status", ToastAndroid.SHORT);
            }

            if (q) {
                getAxiosGraphQLQuery(q).then((res) => {
                    // add new to state
                    if (currentStatus == null) {
                        let d = res.data.data.add_log;
                        this.setState((prevState) => {
                            prevState.logs[d.activity_id] = d;
                            return { logs: prevState.logs };
                        });
                    }
                });
            }

            prevState.logs[activity_id].status = v;
            return { logs: prevState.logs };
        });
    };

    getActivityLi(i, activity) {
        const style = StyleSheet.create({
            view: {
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: "row",
                padding: 7,
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderWidth: 0.5,
                borderColor: Color.lightGray
            },
            disabled: {
                backgroundColor: Color.lightGray
            },
            statusIcon: {
                marginHorizontal: 5
            }
        });


        var status = (this.state.logs[activity.ID])
            ? this.state.logs[activity.ID].status : undefined;

        var greenStyle = style.disabled;
        var redStyle = style.disabled;
        if (typeof status !== "undefined") {
            if (!status) {
                redStyle = {};
            } else {
                greenStyle = {};
            }
        }

        var v = <View key={i} style={style.view}>
            {createActivityDetail(activity)}
            <View style={AppStyle.horizontalFlex}>
                <TouchableOpacity style={style.statusIcon}
                    onPress={() => { this.onStatusChange(activity.ID, true) }}>
                    {createStatusIcon(1, 30, false, greenStyle)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { this.onStatusChange(activity.ID, false) }}>
                    {createStatusIcon(0, 30, false, redStyle)}
                </TouchableOpacity>
            </View>
        </View>

        return <BasicLI customView={v} />;
    }

    keyExtractor(d) {
        return d.ID;
    }

    render() {
        return <RefreshableList
            noAppend={true}
            loadData={this.loadData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor} />
        // <Text>
        //     {JSON.stringify(d)}
        //     {JSON.stringify(this.state.activities)}
        // </Text>
    }
}
