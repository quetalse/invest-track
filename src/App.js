import { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { initFirebase } from "./firebaseConfig";

import { Login } from "./Login";
import { Home } from './screens/Home';
import { About } from "./screens/About";
import { Navbar } from "./components/Navbar";
import { AppAlert } from "./components/AppAlert";
import { AlertState } from "./context/alert/AlertState";
import { FirebaseState } from "./context/firebase/FirebaseState";

function App() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);


    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        initFirebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                switch (error.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(error.message)
                        break;
                    case "auth/wrong-password":
                        setPasswordError(error.message)
                        break;
                }
            })
    }

    const handleSignup = () => {
        clearErrors();
        initFirebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                switch (error.code) {
                    case "auth/email-already-use":
                    case "auth/invalid-email":
                        setEmailError(error.message)
                        break;
                    case "auth/weak-password":
                        setPasswordError(error.message)
                        break;
                }
            })
    }
    const handleLogout = () => {
        initFirebase
            .auth()
            .signOut();
    }

    const authListener = () => {
        initFirebase.auth().onAuthStateChanged(user => {
            if(user){
                clearInputs();
                setUser(user)
            }else{
                setUser('')
            }
        })
    }

    useEffect(() => {
        authListener()
    }, [])

    return (
        <Fragment>
            {user ? (
                <FirebaseState>
                    <AlertState>
                        <BrowserRouter>
                            <Navbar handleLogout={handleLogout}/>
                            <div className="container pt-4">
                                <AppAlert/>
                                <Switch>
                                    {/*<Route path={'/login'} rend={Login}/>*/}
                                    <Route path={'/'} exact component={Home}/>
                                    <Route path={'/about'} exact component={About}/>
                                </Switch>
                            </div>
                        </BrowserRouter>
                    </AlertState>
                </FirebaseState>
            ) : (
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignup={handleSignup}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                />
            )}
        </Fragment>
    );
}

export default App;
