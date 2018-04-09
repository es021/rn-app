import React from 'react';
import { Text, View, FlatList, RefreshControl } from 'react-native';
import AppStyle from '../style/app-style';
import axios from 'axios';
import { FlexView } from '../component/view';
import { FullLoader } from '../component/loader';
import { BasicLI } from '../component/list';

// renderItem(), loadData()
export class RefreshableList extends React.Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);

        this.state = {
            loading: true,
            data: null
        }

        this.loadData();
    }

    loadData() {
        this.setState({ loading: true });
        this.props.loadData().then((res) => {
            this.setState(() => {
                return { data: res.data, loading: false };
            })
        });
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
                        onRefresh={this.loadData} />
                }
                data={this.state.data}
                renderItem={({ i, item }) => this.props.renderItem(i, item)}
            />;
        }

        return v;
    }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
    }

    loadData() {
        return axios.get('https://jsonplaceholder.typicode.com/users');
    }

    renderItem(i, d) {
        return <BasicLI key={i} title={d.name} subtitle={d.email} />;
    }

    keyExtractor(d) {
        return d.id;
    }

    render() {
        return <RefreshableList
            loadData={this.loadData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
        />
    }
}