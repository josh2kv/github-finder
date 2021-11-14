/**
 * state management tool을 사용하지 않는다면 state를 관리하는 함수들은 App에 모으는 것이 최선
 * <Route>의 render>props에는 history, location, match, staticContext가 들어있어 같이 넘긴다.
 */

import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './components/pages/About';

import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';

import './App.css';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const res = await axios.get(
    //         `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    //     );

    //     this.setState({ users: res.data, loading: false });
    // }

    const showAlert = (msg, type) => {
        setAlert({ msg, type });

        setTimeout(() => setAlert(null), 3000);
    };

    const searchUsers = async (text) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        setLoading(false);
        setUsers(res.data.items);
    };

    const clearUsers = () => {
        setLoading(false);
        setUsers([]);
    };

    const getUser = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        setLoading(true);
        setUser(res.data);
    };

    const getUserRepos = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        setLoading(false);
        setRepos(res.data);
    };

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
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        showAlert={showAlert}
                                    />
                                    <Users users={users} loading={loading} />
                                </Fragment>
                            )}
                        />
                        <Route exact path="/about" component={About} />
                        <Route
                            exact
                            path="/user/:login"
                            render={(props) => {
                                console.log('🚀 ~ props', props);
                                return (
                                    <User
                                        {...props}
                                        getUser={getUser}
                                        getUserRepos={getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
