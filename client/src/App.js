import React, {useEffect} from "react";
import Navigation from "./components/Containers/HomePage/navigation"
import HomePage from './components/Containers/HomePage/home-page'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AdminPage from "./components/Containers/AdminPage/admin-page";
import {compose} from "redux";
import {connect} from "react-redux";
import {getAuthState} from "./middleware/state-selectors";
import {AdminPageRoute} from "./components/Common/route/admin-page-route";


const App = ({isAuth}) => {

	useEffect(() => {
		localStorage.removeItem('token')
	}, [])


	return (
		<Router>
			<Navigation/>
			<Switch>
				<Route path="/" exact component={HomePage}/>
				<AdminPageRoute isAuth={isAuth} path="/admin" component={AdminPage}/>
			</Switch>
		</Router>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuth: getAuthState(state),
	}
}


export default compose(
	connect(mapStateToProps, null))(App);
