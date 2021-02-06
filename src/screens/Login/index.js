// import {Card} from "react-bootstrap";
// export { Form, Button, Card } from 'react-bootstrap';
import {auth} from "../../firebase";
import {useEffect} from "react";
import Typewriter from 'typewriter-effect';

import { setUser, signIn, signUp, setEmail, setPassword, setAccount, clearInputs } from "../../store/actions/auth";
import {useDispatch, useSelector} from "react-redux";

import './styles.scss';
import {Redirect, useHistory} from "react-router-dom";

export const Login = (props) => {

    const history = useHistory();
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

    // console.log('user', user)
    // console.log('password', password)
    // console.log('emailError', emailError)
    // console.log(' passwordError ',  passwordError)
    // console.log('hasAccount',hasAccount)


    const authListener = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                // console.log('user', user)
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


    console.log('history', history)

    if(user) {
        const { from } = history.location.state || { from: { pathname: '/' } }

        return <Redirect to={from} />
    }

    return(
        <div className="login-page">
            <div className="login-page__logo app-logo">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString('<strong style="font-size: 3.9rem; text-align: left">Hello! it\'s </strong>')
                            .pauseFor(400)
                            .deleteAll(20)
                            .typeString('<strong class="mx-auto" >Invest Track</strong>')
                            .start();
                    }}
                    options={{
                        delay: 30,
                    }}
                />
            </div>
                <div className="login-page__form app-form">
                    <div className="app-form__header">{hasAccount ? 'Sign In' : 'Sign Up'}</div>
                    <div className="app-form__body">
                        <div className="app-form__input app-input">
                            <input
                                type="email"
                                id="inputEmail"
                                className={`app-input__input ${emailError && 'app-input__input_error'}`}
                                placeholder="Email address"
                                required
                                autoFocus
                                value={email}
                                onChange={e => dispatch(setEmail(e.target.value))}
                            />
                            <label
                                className="app-input__label"
                                htmlFor="inputEmail"
                            >Email address</label>
                            <p className="app-input__error-message">{emailError}</p>
                        </div>
                        <div className="app-form__input app-input">
                            <input
                                type="password"
                                id="inputPassword"
                                className={`app-input__input ${passwordError && 'error'}`}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={e => dispatch(setPassword(e.target.value))}
                            />
                            <label
                                className="app-input__label"
                                htmlFor="inputPassword"
                            >Password</label>
                            <p className="app-input__error-message">{passwordError}</p>
                        </div>
                        <button
                            className="app-button"
                            onClick={hasAccount ?
                                () => dispatch(signIn({email, password})) :
                                () => dispatch(signUp({email, password}))
                            }
                        >
                            {hasAccount ? 'Sign in' : 'Sign up'}
                        </button>
                    </div>
                    <div className="app-form__footer ">
                        {hasAccount ? 'Don\'t have an account?' : 'Have an account?'}
                        <label
                            className="app-form__footer-btn"
                            onClick={() => dispatch(setAccount(!hasAccount))}
                        >
                            {hasAccount ? 'Sing up' : 'Sign in'}
                        </label>
                    </div>
                </div>
            </div>
    )
}