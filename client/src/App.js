import React, {Fragment} from "react";
import './App.css';
import Nav from "./Nav"
import HomePage from './components/HomePage'
import AdminPage from './components/AdminPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'



function App() {
	return (
		<Router>
			<Nav/>
			<Switch>
				<Route path="/" exact component={HomePage}/>
				<Route path="/admin" component={AdminPage}/>
				</Switch>
		</Router>
	);
}

export default App;
