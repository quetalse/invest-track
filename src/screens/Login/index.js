// import {Card} from "react-bootstrap";
// export { Form, Button, Card } from 'react-bootstrap';

import {auth} from "../../firebase";
import {useEffect} from "react";

import { setUser, signIn, signUp, setEmail, setPassword, setAccount, clearInputs } from "../../store/actions/auth";
import {useDispatch, useSelector} from "react-redux";

import './styles.scss';

export const Login = () => {

    const dispatch = useDispatch();
    const {user, email, password, emailError, passwordError, hasAccount} = useSelector(state => {
        const auth = state.auth;

        return {
            user: auth.user,
            email: auth.email,
            password: auth.password,
            emailError: auth.emailError,
            passwordError: auth.passwordError,
            hasAccount: auth.hasAccount
        }
    })

    console.log('email, password, emailError, passwordError, hasAccount', email, password, emailError, passwordError, hasAccount)

    const authListener = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                dispatch(clearInputs());
                dispatch(setUser(user));
            }else{
                dispatch(setUser(''));
            }
        })
    }

    useEffect(() => {
        authListener()
    }, [])

    return(
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign In</h5>
                        <div className="form-signin">
                            <div className="form-label-group">
                                <input
                                    type="email"
                                    id="inputEmail"
                                    className="form-control"
                                    placeholder="Email address"
                                    required
                                    autoFocus
                                    value={email}
                                    onChange={e => dispatch(setEmail(e.target.value))}
                                />
                                <label htmlFor="inputEmail">Email address</label>
                                <p className="errorMsg">{emailError}</p>
                            </div>
                            <div className="form-label-group">
                                <input
                                    type="password"
                                    id="inputPassword"
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={e => dispatch(setPassword(e.target.value))}
                                />
                                <label htmlFor="inputPassword">Password</label>
                                <p className="errorMsg">{passwordError}</p>
                            </div>
                            <div className="btnContainer">
                                <button
                                    className="btn btn-lg btn-dark btn-block text-uppercase"
                                    onClick={hasAccount ?
                                        () => dispatch(signIn({email, password})) :
                                        () => dispatch(signUp({email, password}))
                                    }
                                >
                                    {hasAccount ? 'Sign in' : 'Sign up'}
                                </button>
                            </div>
                            <div className="custom-control mb-3">
                                {hasAccount ? 'Don\'t have an account?' : 'Have an account?'}
                                <label
                                    className=""
                                    htmlFor="customCheck1"
                                    onClick={() => dispatch(setAccount(!hasAccount))}
                                >
                                    {hasAccount ? 'Sing up' : 'Sign in'}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}