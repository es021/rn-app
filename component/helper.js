import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Color } from '../style/app-style';
import { Icon } from 'react-native-elements'
import CalendarUtil from '../util/CalendarUtil';

export function createActivityDetail(activity, log = null) {
    const style = StyleSheet.create({
        detail: {
            flex: 1,
            flexDirection: "row",
        },
        text: {
            marginLeft: 10,
            fontSize: 20
        },
        textSmall: {
            fontSize: 15
        }
    });

    var logDetail = null;
    if (log !== null) {
        logDetail = <Text style={[style.textSmall]}>
            {"\n"}{CalendarUtil.getDateStrPretty(log.date, true)}
        </Text>;
    } 

    return <View style={style.detail}>
        <Icon name={activity.icon} size={30} color={Color.blue}></Icon>
        <Text style={[style.text]}>{activity.name}
            {logDetail}
        </Text>
    </View>
}


export const createStatusIcon = (status, size = 40, noIcon = false, customStyle = {}) => {
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

    return <View style={[style.status, backStyle, customStyle]}>
        {noIcon ? null :
            <Icon style={style.statusText}
                name={iconName} color="white" />
        }
    </View>;
}
