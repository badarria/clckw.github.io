import React, {useEffect} from "react";
import './App.css';
import Navigation from "./components/Containers/HomePage/navigation"
import {HomePage} from './components/Containers/home-page'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import AdminPage from "./components/Containers/admin-page";
import {compose} from "redux";
import {connect} from "react-redux";
import {getAuthState} from "./middleware/state-selectors";
import {getAdminInitState, getInitState} from "./middleware/thunks";


const App = ({isAuth, getInitState, getAdminInitState}) => {

	useEffect(() => {
		getInitState()
		const token = localStorage.getItem('token');
		if (token) {
			getAdminInitState()
		}
	}, [])

	return (
		<Router>
			<Navigation/>
			<Switch>
				<Route path="/" exact component={HomePage}/>
				{isAuth ? <Route path="/admin" component={AdminPage}/> : <Redirect to="/"/>}
			</Switch>
		</Router>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuth: getAuthState(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInitState: () => dispatch(getInitState),
		getAdminInitState: () => dispatch(getAdminInitState),
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(App);
