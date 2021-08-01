import React from 'react';
import {Redirect} from 'react-router-dom';


const AuthRoute = props => {
    const {children} = props;

    if (!localStorage.getItem("token")) {
        console.log('No user detected, redirecting');
        return <Redirect to="/login"/>;
    } else {
        return (
            <div>{children}</div>
        );
    }

}

export default AuthRoute;