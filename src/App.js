/**
 * state management tool을 사용하지 않는다면 state를 관리하는 함수들은 App에 모으는 것이 최선
 * <Route>의 render>props에는 history, location, match, staticContext가 들어있어 같이 넘긴다.
 */

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './components/pages/About';

import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const res = await axios.get(
    //         `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    //     );

    //     this.setState({ users: res.data, loading: false });
    // }

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar />
                        <div className="container">
                            <Alert />
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={(props) => (
                                        <Fragment>
                                            <Search />
                                            <Users />
                                        </Fragment>
                                    )}
                                />
                                <Route exact path="/about" component={About} />
                                <Route
                                    exact
                                    path="/user/:login"
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
