import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../firebase";
import {clearInputs, setLoading, setUser} from "../store/actions/auth";
import {useEffect, useState} from "react";
import {AppLoader} from "./AppLoader";
import {rootStateT} from "../store/reducers";

type PropsT = {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    path: string
    exact: boolean
}

export const ProtectedRoute: React.FC<PropsT> = ({component: Component, ...rest }) => {

    let dispatch = useDispatch();
    let [loadingAuth, setLoadingAuth] = useState(true);
    let user = useSelector((state: rootStateT) => state.auth.user)

    // console.log('user', user)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                dispatch(clearInputs());
                dispatch(setUser(user));
            }else{
                dispatch(setUser(null));
            }
            dispatch(setLoading(false));
            setLoadingAuth(false);
        })
    }, [dispatch])

    if(loadingAuth) return (
        <div className="login-page login-page-center">
            <AppLoader modifier={"test"} className="app-loader-light"/>
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