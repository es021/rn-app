import React from 'react';
import { ActivityIndicator, Text, StyleSheet, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { FlexView } from './view';
import AppStyle, { Color } from '../style/app-style';
import Calendar from '../util/Calendar';
import { createStatusIcon } from './helper';

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
        margin: 1 ,
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
    }
});

export default class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.getRow = this.getRow.bind(this);
        this.getBox = this.getBox.bind(this);

        var currentMonth = 4;
        var currentYear = 2018;

        this.state = {
            dates: Calendar.getMonthArrByWeek(currentMonth, currentYear),
            currentYear: currentYear,
            currentMonth: currentMonth
        }
        //console.log(Calendar.getDateFromStr("20180303"));
    }

    getBox(date) {
        var v = <View style={[style.box, style.boxEmpty]}></View>;
        var onPress = null;

        if (date !== null) {
            let dateStr = Calendar.getDateStr(date);
            let d = date.getDate();

            onPress = () => {
                ToastAndroid.show(dateStr, ToastAndroid.SHORT);
            }

            v = <TouchableOpacity style={style.box} onPress={onPress}>
                <Text style={style.textBox}>{d}</Text>
                {createStatusIcon(1, 15, true, style.statusIcon)}
                {createStatusIcon(0, 15, true, style.statusIcon)}
                {createStatusIcon(0, 15, true, style.statusIcon)}
                {createStatusIcon(1, 15, true, style.statusIcon)}
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
                    <Text>{Calendar.DAYS[d]}</Text>
                </View>
            } else {
                return this.getBox(dates[i]);
            }
        });

        return <View style={style.row}>
            {boxes}
        </View>
    }

    render() {
        var rows = this.state.dates.map((r, i) => {
            return this.getRow(r);
        });

        return <View style={style.calendar}>
            <Text style={AppStyle.h1}>
                {Calendar.MONTHS[this.state.currentMonth - 1]}
            </Text>
            {this.getRow(null, true)}
            {rows}
        </View>

    }
}
