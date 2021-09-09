import { BrowserRouter, Route, Switch } from "react-router-dom";

/** APP COMPONENTS**/
import { Navbar } from "../components/Navbar";
import { AppAlert } from "../components/AppAlert";
import { ProtectedRoute } from "../components/ProtectedRoute";

/** SCREENS **/
import { Login } from "../screens/Login";
import { Home } from '../screens/Home';
import { About } from "../screens/About";
import { NotFound } from "../screens/NotFound";

import './styles.scss';

type Props = {
    init?: string
}

export const App: React.FC<Props> = () => {
    return (
        <div className="application">
            <BrowserRouter>
                <Navbar/>
                <AppAlert/>
                <Switch>
                    <Route path={'/login'} component={Login}/>
                    <ProtectedRoute path={'/'} exact component={Home}/>
                    <ProtectedRoute path={'/overview'} exact component={About}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};
