import React from 'react';
import { ActivityIndicator, Text, StyleSheet, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { FlexView } from '../component/view';
import AppStyle, { Color } from '../style/app-style';
import CalendarUtil from '../util/CalendarUtil';
import { createStatusIcon } from '../component/helper';
import { getAxiosGraphQLQuery } from '../helper/api-helper';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { IconButton } from '../component/icon';

const style = StyleSheet.create({
    calendar: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 5
    },
    row: {
        flexDirection: "row",
    },
    box: {
        padding: 5,
        flex: 1,
        flexDirection: "row",
        position: "relative",
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: "wrap",
        borderColor: Color.blue,
        //borderRadius: 10,
        margin: 2,
        borderWidth: 0.5,
        height: 60,
    },
    statusIcon: {
        margin: 1,
    },
    textBox: {
        position: "absolute",
        bottom: 2,
        right: 4
    },
    boxHeader: {
        borderColor: Color.none,
        paddingVertical: 5,
        height: 30
    },
    boxEmpty: {
        borderColor: Color.none
    },
    refresh: {
        backgroundColor: Color.blue,
        position: "absolute",
        bottom: 15,
        right: 10
    }
});

export default class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.getRow = this.getRow.bind(this);
        this.getBox = this.getBox.bind(this);
        this.loadData = this.loadData.bind(this);
        this.navigateMonth = this.navigateMonth.bind(this);
        this.getCurrentMonthLogs = this.getCurrentMonthLogs.bind(this);

        var currentMonth = CalendarUtil.getCurrentMonth();
        //var currentMonth = 4;
        var currentYear = CalendarUtil.getCurrentYear();

        this.state = {
            data: {},
            dates: CalendarUtil.getMonthArrByWeek(currentMonth),
            currentYear: currentYear,
            currentMonth: currentMonth,
            loading: true,
        }
        this.loadData();
    }

    loadData() {

        if (!this.state.loading) {
            this.setState(() => {
                return { loading: true };
            });
        }

        var q = `query{ logs (month:${this.state.currentMonth}, year:${this.state.currentYear}, order_by: "activity_id") {ID activity_id status date} }`;
        //console.log(q); 
        getAxiosGraphQLQuery(q).then((res) => {
            var data = {};
            res.data.data.logs.map((d, i) => {
                if (typeof data[d.date] === "undefined") {
                    data[d.date] = [];
                }
                data[d.date].push(d);
            })

            this.setState((prevState) => {
                if (typeof prevState.data[this.state.currentYear] === "undefined") {
                    prevState.data[this.state.currentYear] = {};
                }
                prevState.data[this.state.currentYear][this.state.currentMonth] = data;
                return { data: prevState.data, loading: false };
            });
        });
    }

    getCurrentMonthLogs() {
        var logs = null;
        try {
            logs = this.state.data[this.state.currentYear][this.state.currentMonth];
        } catch (e) {
            console.log(e);
        }

        if (typeof logs === "undefined" || logs === null) {
            this.loadData();
            return null;
        }
        return logs;
    }

    getBox(date) {
        let v = null;
        if (date === null) {
            v = <View style={[style.box, style.boxEmpty]}></View>;
        } else {
            let dateStr = CalendarUtil.getDateStr(date);
            let d = date.getDate();
            let statusCircle = null;

            let logs = this.getCurrentMonthLogs();
            let dayLog = null;

            if (logs !== null) {
                dayLog = logs[CalendarUtil.getDateStr(date)];
                if (typeof dayLog !== "undefined" && dayLog !== null) {
                    statusCircle = dayLog.map((d, i) => {
                        return createStatusIcon(d.status, 15, true, style.statusIcon);
                    });
                }
            }

            const onPress = () => {
                //ToastAndroid.show(dateStr, ToastAndroid.SHORT);
                this.props.navigation.navigate('CalendarDateDetail'
                    , { title: CalendarUtil.getDateStrPretty(date, true), data: dayLog, dateStr: dateStr });
            }

            v = <TouchableOpacity style={style.box} onPress={onPress}>
                <Text style={style.textBox}>{d}</Text>
                {statusCircle}
            </TouchableOpacity>
        }

        return v;
    }

    getRow(dates, header = false) {

        var days = Array(7);
        days[0] = 1;
        days[1] = 2;
        days[2] = 3;
        days[3] = 4;
        days[4] = 5;
        days[5] = 6;
        days[6] = 0;

        var boxes = days.map((d, i) => {
            if (header) {
                return <View style={[style.box, style.boxHeader]}>
                    <Text>{CalendarUtil.DAYS[d]}</Text>
                </View>
            } else {
                return this.getBox(dates[i]);
            }
        });

        return <View style={style.row}>
            {boxes}
        </View>
    }

    navigateMonth(offset) {
        this.setState((prevState) => {
            var newYear = prevState.currentYear;
            var newMonth = prevState.currentMonth + offset;
            if (newMonth < 1) {
                newMonth = 12;
                newYear--;
            }

            if (newMonth > 12) {
                newMonth = 1;
                newYear++;
            }

            return {
                currentMonth: newMonth,
                currentYear: newYear,
                dates: CalendarUtil.getMonthArrByWeek(newMonth, newYear),
            };
        })
    }

    render() {
        //console.log(this.state.data);
        var rows = this.state.dates.map((r, i) => {
            return this.getRow(r);
        });

        var dayHeader = this.getRow(null, true);


        var refresh = <IconButton circle={true}
            onPress={() => { this.loadData() }}
            loading={this.state.loading}
            wrapperStyle={style.refresh} name="refresh"
            color={Color.blue} size={45}>
        </IconButton>;

        return <View style={style.calendar}>
            <View style={AppStyle.horizontalFlex}>
                <IconButton onPress={() => { this.navigateMonth(-1) }}
                    wrapperStyle={AppStyle.h1} name="keyboard-arrow-left"
                    color={Color.blue} size={40} >
                </IconButton>
                <Text style={AppStyle.h1}>
                    {CalendarUtil.MONTHS[this.state.currentMonth - 1]}
                    {"\n"}
                    <Text style={AppStyle.h2}>
                        {this.state.currentYear}
                    </Text>
                </Text>
                <IconButton onPress={() => { this.navigateMonth(1) }}
                    wrapperStyle={AppStyle.h1} name="keyboard-arrow-right"
                    color={Color.blue} size={40}>
                </IconButton>
            </View>
            {refresh}
            {dayHeader}
            {rows}
        </View>

    }
}
