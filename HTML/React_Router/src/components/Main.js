import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

const App = () => (
		<Router>
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/topics">Topics</Link></li>
				</ul>
				<hr />
				<Route path="/" component={Home}></Route>
				<Route path="/about" component={About}></Route>
				<Route path="/topics" component={Topics}></Route>
			</div>
		</Router>
	),
	Home = () => (
		<div>
			<h2>Home</h2>
		</div>
	),
	About = () => (
		<div>
			<h2>About</h2>
		</div>
	),
	Topics = ({ match }) => (
		<div>
			<h2>Topics</h2>
			<ul>
				<li><Link to={`${match.url}/rendering`}>Rendering</Link></li>
				<li><Link to={`${match.url}/components`}>Components</Link></li>
				<li><Link to={`${match.url}/text`}>Text</Link></li>
			</ul>
			<Route path={`${match.url}/:topicId`} component={Topic}></Route>
		</div>
	),
	Topic = ({ match }) => (
		<div>
			<h3>{match.params.topicId}</h3>
		</div>
	);

export default App;
