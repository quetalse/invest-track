import { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { app, auth } from "./firebase";

import { Login } from "./screens/Login";
import { Home } from './screens/Home';
import { About } from "./screens/About";
import { Navbar } from "./components/Navbar";
import { AppAlert } from "./components/AppAlert";

function App() {
    // const [user, setUser] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    // const [hasAccount, setHasAccount] = useState(false);

    // console.log('auth', auth.settings)
    //
    // const clearInputs = () => {
    //     setEmail('');
    //     setPassword('');
    // }
    //
    // const clearErrors = () => {
    //     setEmailError('');
    //     setPasswordError('');
    // }
    //
    // const handleLogin = () => {
    //     clearErrors();
    //     auth.signInWithEmailAndPassword(email, password)
    //         .catch(error => {
    //             switch (error.code) {
    //                 case "auth/invalid-email":
    //                 case "auth/user-disabled":
    //                 case "auth/user-not-found":
    //                     setEmailError(error.message)
    //                     break;
    //                 case "auth/wrong-password":
    //                     setPasswordError(error.message)
    //                     break;
    //             }
    //         })
    // }
    //
    // const handleSignup = () => {
    //     clearErrors();
    //     auth.createUserWithEmailAndPassword(email, password)
    //         .catch(error => {
    //             switch (error.code) {
    //                 case "auth/email-already-use":
    //                 case "auth/invalid-email":
    //                     setEmailError(error.message)
    //                     break;
    //                 case "auth/weak-password":
    //                     setPasswordError(error.message)
    //                     break;
    //             }
    //         })
    // }
    // const handleLogout = () => {
    //     auth.signOut();
    // }

    // const authListener = () => {
    //     auth.onAuthStateChanged(user => {
    //         if(user){
    //             clearInputs();
    //             setUser(user)
    //         }else{
    //             setUser('')
    //         }
    //     })
    // }

    // useEffect(() => {
    //     authListener()
    // }, [])

    return (
        <Fragment>
                <BrowserRouter>
                    {/*<Navbar handleLogout={handleLogout}/>*/}
                    <div className="container pt-4">
                        <AppAlert/>
                        <Switch>
                            <Route path={'/login'} component={Login}/>
                            <Route path={'/'} exact component={Home}/>
                            <Route path={'/about'} exact component={About}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                {/*<Login*/}
                {/*    email={email}*/}
                {/*    setEmail={setEmail}*/}
                {/*    password={password}*/}
                {/*    setPassword={setPassword}*/}
                {/*    handleLogin={handleLogin}*/}
                {/*    handleSignup={handleSignup}*/}
                {/*    hasAccount={hasAccount}*/}
                {/*    setHasAccount={setHasAccount}*/}
                {/*    emailError={emailError}*/}
                {/*    passwordError={passwordError}*/}
                {/*/>*/}
        </Fragment>
    );
}

export default App;
