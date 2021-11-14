/**
 * state management tool을 사용하지 않는다면 state를 관리하는 함수들은 App에 모으는 것이 최선
 */

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './components/pages/About';

import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';

import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null,
    };

    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const res = await axios.get(
    //         `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    //     );

    //     this.setState({ users: res.data, loading: false });
    // }

    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });

        setTimeout(() => this.setState({ alert: null }), 3000);
    };

    searchUsers = async (text) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        this.setState({ loading: false, users: res.data.items });
    };

    clearUsers = () => {
        this.setState({ loading: false, users: [] });
    };

    getUser = async (username) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        this.setState({ loading: false, user: res.data });
    };

    getUserRepos = async (username) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        this.setState({ loading: false, repos: res.data });
    };

    render() {
        const { users, user, repos, loading, alert } = this.state;

        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            users={users}
                                            loading={loading}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path="/about" component={About} />
                            <Route
                                exact
                                path="/user/:login"
                                render={(props) => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
