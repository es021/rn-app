import React from 'react';
import { Text, View, FlatList, RefreshControl } from 'react-native';
import AppStyle from '../style/app-style';
import axios from 'axios';
import { FlexView } from '../component/view';
import { FullLoader } from '../component/loader';
import { BasicLI } from '../component/list';
import RefreshableList from '../component/refreshable-list';

import CalendarView from '../component/calendar';

export default class Home extends React.Component {
    render() {
        return (
            <FlexView>
                <CalendarView></CalendarView>
            </FlexView>
        );
    }
}