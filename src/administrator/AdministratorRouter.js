import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AdministratorRouter = ({ component: Component, ...rest }) => {
  const role = window.localStorage.getItem('role');
	
	return (
		<Route
      {...rest}
      render={(props) =>
        role === 'administrator' ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} /> }
    />
	)
}

export default AdministratorRouter;