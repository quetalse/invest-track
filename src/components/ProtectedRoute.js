import { Route, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoute = ({component: Component, ...rest }) => {

    let user = useSelector(state => state.auth.user)
    console.log('user', user)

    // user = true

    return <Route {...rest} render={(props) => (
        user
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />

    )} />
}