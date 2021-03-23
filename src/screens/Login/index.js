import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";

/** COMPONENTS**/
import { AppLoader } from "../../components/AppLoader";
import { AppLogo } from "../../components/AppLogo";

/** ACTIONS **/
import {signIn, signUp, setUser, setEmail, setPassword, setAccount} from "../../store/actions/auth";

/** FIREBASE **/
import { auth } from "../../firebase";

import './styles.scss';

export const Login = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {loading, user, email, password, emailError, passwordError, hasAccount} = useSelector(state => {
        const auth = state.auth;

        return {
            user: auth.user,
            email: auth.email,
            password: auth.password,
            emailError: auth.emailError,
            passwordError: auth.passwordError,
            hasAccount: auth.hasAccount,
            loading: auth.loading
        }
    });
    let [isCheckUser, setCheckUser] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                // dispatch(clearInputs());
                dispatch(setUser(user));
            }else{
                setCheckUser(false);
                dispatch(setUser(''));
            }
            // dispatch(setLoading(false))
        })
    }, [dispatch])

    if(user) {
        const { from } = history.location.state || { from: { pathname: '/' } }
        return <Redirect to={from} />
    }

    return(
        <div className="login-page">
            {isCheckUser ? <AppLoader/> :
                <>
                    <AppLogo modifier="login-page__logo" isTyping={true}/>
                    <div className="login-page__form app-form">
                        <div className="app-form__header">{hasAccount ? 'Sign In' : 'Sign Up'}</div>
                        <div className="app-form__body">
                            <div className={`app-form__input ${emailError ? 'app-form__input_error' : ''} app-input`}>
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
                            <div className={`app-form__input ${passwordError ? 'app-form__input_error' : ''} app-input`}>
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
                                className="app-form__button"
                                onClick={hasAccount ?
                                    () => dispatch(signIn({email, password})) :
                                    () => dispatch(signUp({email, password}))
                                }
                            >
                                {hasAccount ? 'Sign in' : 'Sign up'}
                                {loading && <AppLoader modifier="app-loader_sm" />}
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
                </>
            }
        </div>
    )
}