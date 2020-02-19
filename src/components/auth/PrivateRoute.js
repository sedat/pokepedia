import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                currentUser ? (
                    <RouteComponent {...routeProps} user={currentUser} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

export default PrivateRoute;
