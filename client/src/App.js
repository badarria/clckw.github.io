import React from "react";
import './App.css';
import Nav from "./Nav"
import HomePage from './components/HomePage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AdminMain from "./components/Admin/admin-main";



function App() {
	return (
		<Router>
			<Nav/>
			<Switch>
				<Route path="/" exact component={HomePage}/>
				<Route path="/admin" component={AdminMain}/>
				</Switch>
		</Router>
	);
}

export default App;
