import React, {useState, useEffect} from "react";
import './App.css';
import Nav from "./Nav"
import HomePage from './components/Main/Main'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Main from "./components/Admin/Pages/main";
import {parse} from "dotenv";


const App = () => {
	const [isAuth, setAuth] = useState(false);

	const loginUser = async (data) => {
		try {
			const res = await fetch('/auth', {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(data),
			})
			const parseRes = await res.json()

			if (parseRes.token) {
				localStorage.setItem("token", parseRes.token)
				setAuth(true);
			}

		} catch (err) {
			console.error(err.message);
		}
	}

	const stayAuth = async () => {
		try {
			const res = await fetch('/auth/verify', {
				method: "GET",
				headers: {token: localStorage.token}
			});
			const parseRes = await res.json();
			parseRes === true ? setAuth(true) : setAuth(false);
		} catch (err) {
			console.error(err.message)
		}
	}

	const logout = () => {
		localStorage.removeItem("token");
		setAuth(false);
	}

	useEffect(() => {
		stayAuth()
	}, [])


	return (
		<Router>
			<Nav loginUser={loginUser} isAuth={isAuth} logout={logout}/>
			<Switch>
				<Route path="/" exact component={HomePage}/>
				{isAuth ? <Route path="/admin" component={Main}/> : <Redirect to="/"/>}
			</Switch>
		</Router>
	);
}

export default App;
