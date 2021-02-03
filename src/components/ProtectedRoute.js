import { Route, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoute = ({component: Component, ...rest }) => {

    const user = useSelector(state => state.auth.user)

    console.log('user', user)

    return <Route {...rest} render={(props) => (
        user
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />

    )} />
}