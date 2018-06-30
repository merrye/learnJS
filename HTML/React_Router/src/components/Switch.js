import React from 'react';
import { Link, Route, Switch, Prompt, BrowserRouter as Router } from 'react-router-dom';

const Links = () => (
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/123">123</Link>
            <Link to="/456">456</Link>
        </div>
    ),
    Demo = () => (
        <Router>
            <div>
                <Links></Links>
                <Switch>
                    <Route exact path="/" render={() => (<h1>主页</h1>)}>
                        {/*
                            Prompt:
                                message: a tip
                        */}
                        <Prompt message="你确定要离开吗" />
                    </Route>
                    <Route path="/about" render={() => (<h2>About</h2>)}></Route>
                    <Route path="/:itemId" render={({ match }) => (
                        <h1>ItemId: {match.params.itemId}</h1>
                    )}></Route>
                    <Route render={() => (<h1>Page Not Found.</h1>)}></Route>
                </Switch>
            </div>
        </Router>
    );

export default Demo;