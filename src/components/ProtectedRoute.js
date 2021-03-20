import { Route, Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../firebase";
import {clearInputs, setLoading, setUser} from "../store/actions/auth";
import {useEffect, useState} from "react";
import {AppLoader} from "./AppLoader";

export const ProtectedRoute = ({component: Component, ...rest }) => {

    let dispatch = useDispatch();
    let [loadingAuth, setLoadingAuth] = useState(true);
    let user = useSelector(state => state.auth.user)

    // console.log('user', user)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                dispatch(clearInputs());
                dispatch(setUser(user));
            }else{
                dispatch(setUser(''));
            }
            dispatch(setLoading(false));
            setLoadingAuth(false);
        })
    }, [dispatch])

    if(loadingAuth) return (
        <div className="login-page login-page-center">
            <AppLoader className="app-loader-light"/>
        </div>
    )

    return <Route {...rest} render={(props) => (
        user
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />

    )} />
}