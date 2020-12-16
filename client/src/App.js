import React, {useEffect} from "react";
import Navigation from "./components/Containers/HomePage/navigation"
import HomePage from './components/Containers/HomePage/home-page'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import AdminPage from "./components/Containers/Admin/admin-page";
import {compose} from "redux";
import {connect} from "react-redux";
import {getAuthState} from "./middleware/state-selectors";
import {getAdminInitState, getInitState} from "./middleware/home-page-thunks";


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
