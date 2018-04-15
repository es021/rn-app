import React from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl, ToastAndroid } from 'react-native';
import AppStyle from '../style/app-style';
import { FullLoader } from './loader';
import PropTypes from 'prop-types';

// renderItem(i, d), loadData(page)
export default class RefreshableList extends React.Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.onEndReached = this.onEndReached.bind(this);

        this.state = {
            loading: true,
            data: [],
            nextPage: 1,
            latestDataLength: 0
        }

        this.onEndReachedThreshold = !this.props.noAppend ? 0.5 : -1;
    }

    componentDidMount() {
        this.loadData(true);
    }

    loadData(isInit = false) {
        if (isInit) {
            this.setState({ loading: true });
        }

        var pageToLoad = (isInit) ? 1 : this.state.nextPage

        this.props.loadData(pageToLoad).then((data) => {
            this.setState((prevState) => {
                var newData = null;
                if (isInit) {
                    newData = data;
                } else {
                    prevState.data.push(...data);
                    newData = prevState.data;
                }

                return {
                    latestDataLength: data.length,
                    data: newData,
                    loading: false,
                    nextPage: pageToLoad + 1
                };
            })
        });

    }

    onEndReached(distanceFromEnd) {
        //ToastAndroid.show('on end reached ' + distanceFromEnd, ToastAndroid.SHORT);
        if (this.state.latestDataLength > 0) {
            this.loadData();
            console.log('on end reached ', distanceFromEnd);
        }
    }

    render() {
        var v = null;
        if (this.state.loading) {
            v = <FullLoader />;
        } else {

            v = <FlatList
                keyExtractor={(d) => this.props.keyExtractor(d)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={() => this.loadData(true)} />
                }
                data={this.state.data}
                renderItem={({ i, item }) => this.props.renderItem(i, item)}
                onEndReachedThreshold={this.onEndReachedThreshold}
                onEndReached={({ distanceFromEnd }) => {
                    if (!this.props.noAppend) {
                        this.onEndReached(distanceFromEnd);
                    }
                }}
            />;
        }

        return v;
    }
}

RefreshableList.propTypes = {
    noAppend: PropTypes.bool
}

RefreshableList.defaultProps = {
    noAppend: false
}
