import React from 'react';
import { Route, Redirect } from "react-router-dom";

const CoordinatorRouter = ({ component: Component, ...rest }) => {
  const role = window.localStorage.getItem('role');

	return (
    <Route
      {...rest}
      render={(props) =>
        role === 'coordinator' ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} /> }
    />
  );
}

export default CoordinatorRouter;