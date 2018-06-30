import React from 'react';
import { Link, Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

let logined = false;

const Demo = () => (
    <Router>
        <div>
            <Link to="/">Home</Link>{' '}
            <Link to="/old/123">Old</Link>{' '}
            <Link to="/new/456">New</Link>{' '}
            <Link to="/redirect/789">Redirect</Link>{' '}
            <Link to="/login">Login</Link>
            <Route exact path="/" render={() => (<h1>Home</h1>)}></Route>
            {/*
                <Route path="/old" render={() => (<h1>Old</h1>)}></Route>
                <Route path="/new" render={() => (<h1>New</h1>)}></Route>
                <Route path="/redirect" render={() => (<h1>Redirect</h1>)}></Route>
            */}
            <Route path="/login" render={() => (
                logined
                    ? <h1>Login success</h1>
                    : <Redirect to="/redirect">Login faild</Redirect>
            )}></Route>
            {/* 适用于需要传参的重定向需求 */}
            <Route path="/redirect/:str" render={
                ({ match }) => (<Redirect push to={`/new/${match.params.str}`}></Redirect>)
            }></Route>
            {/* 需要重定向的路径，可以结合Switch，适用于不需要传参的重定向需求 */}
            <Switch>
                <Route path="/new/:str" render={
                    ({ match }) => (<h1>New: {match.params.str}</h1>)
                }></Route>
                <Redirect from="/old/:str" to="/new/123" />
            </Switch>
        </div>
    </Router>
);

export default Demo;
