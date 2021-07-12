import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isAuthenticated } from '../../services/auth';


interface PrivateRouteProps extends RouteProps { }

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
    const { user } = useAuth();
    // if (isAuthenticated() === undefined) return <Redirect to="/auth" />
    // return(
    //     <Route { ...rest }  />
    // );

    //----------------------   2

    //     if (!isAuthenticated()) return <Redirect to="/auth" />
    // return(
    //     <Route { ...rest }  />
    // );

    //----------------------   3
    // if (isAuthenticated() && rest.path === '/auth') {
    //     console.log('primeiro if')
    //     return (<Redirect to="/" />)
    // } else if (!isAuthenticated() && rest.path === '/auth') {
    //     console.log('segundo if')
    //     // return (<Redirect to="/auth" />)
    //     return (<Route {...rest} />)

    //     // }else if(!isAuthenticated() && rest.path === '/'){
    // } else if (!isAuthenticated()) {

    //     console.log('terceiro if', rest.path)
    //     // return (<Route {...rest} />)
    //     return (<Redirect to="/auth" />)

    // } else {
    //     return (<Route {...rest} />)

    // }

    if (!user && rest.path === "/auth") {
        return (
            <Route {...rest} />
        )
    } else if (user && rest.path === "/auth") {
        return (
            <Redirect to="/" />
        )
    } else if (!user && rest.path === "/") {
        return (
            <Redirect to="/auth" />
        )
    }
    else if (!user) {
        return (
            <Redirect to="/auth" />
        )
    } else {
        return (
            <Route {...rest} />
        )
    }

}

export default PrivateRoute;
