import React from 'react';
import { Link, Route, Prompt, BrowserRouter as Router } from 'react-router-dom';

/**
 * BrowserRouter	一个包含HTML5的历史api
 * HashRouter		一个可以使用URL哈希值的Router
 * MemoryRouter		可以将URL的历史存放在内存中
 */

const App = () => (
		<Router>
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/topics">Topics</Link></li>
				</ul>
				<hr />
				{/*
					exact：匹配地址（path）与url地址（Link组件的to）完全相同，没有尾随字符
					strict：匹配地址（path）与url地址（Link组件的to）完全相同，可以有尾随字符
				*/}
				<Route exact path="/" component={Home}></Route>
				<Route path="/about" component={About}></Route>
				<Route path="/topics" component={Topics}></Route>
				<Prompt message="你确定要离开吗" />
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
			<Route exact path={match.url} render={() => (<h3>请选择一个主题</h3>)}></Route>
		</div>
	),
	Topic = ({ match }) => (
		<div>
			<h3>{match.params.topicId}</h3>
		</div>
	);

export default App;
