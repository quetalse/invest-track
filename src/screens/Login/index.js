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
        <div className="col-sm-9 col-md-7 col-lg-6 mx-auto">
            <div className="login-logo my-3">
                <Typewriter
                    // options={{
                    //     // wrapperClassName: 'login-logo my-3',
                    //     strings: ['Hello', 'it\'s Invest Track'],
                    //     autoStart: true,
                    //     delay: 30,
                    //     deleteSpeed: 30,
                    //     // onCreateTextNode: () => {return '<p>Invest Track</p>p>'}
                    //     // loop: true,
                    // }}
                    onInit={(typewriter) => {
                        typewriter.typeString('<strong style="font-size: 3.9rem; text-align: left">Hello! it\'s </strong>')
                            // .callFunction(() => {
                            //     console.log('String typed out!');
                            // })
                            .pauseFor(400)
                            .deleteAll(20)
                            .typeString('<strong class="mx-auto" >Invest Track</strong>')
                            // .callFunction(() => {
                            //     console.log('All strings were deleted');
                            // })
                            .start();
                    }}
                    options={{
                        delay: 30,
                    }}
                />
            </div>
                <div className="card card-login my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">{hasAccount ? 'Sign In' : 'Sign Up'}</h5>
                        <div className="form-login">
                            <div className="form-label-group">
                                <input
                                    type="email"
                                    id="inputEmail"
                                    className={`form-control ${emailError && 'error'}`}
                                    placeholder="Email address"
                                    required
                                    autoFocus
                                    value={email}
                                    onChange={e => dispatch(setEmail(e.target.value))}
                                />
                                <label htmlFor="inputEmail">Email address</label>
                                <p className="error-message">{emailError}</p>
                            </div>
                            <div className="form-label-group">
                                <input
                                    type="password"
                                    id="inputPassword"
                                    className={`form-control ${passwordError && 'error'}`}
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={e => dispatch(setPassword(e.target.value))}
                                />
                                <label htmlFor="inputPassword">Password</label>
                                <p className="error-message">{passwordError}</p>
                            </div>
                            {/*<div className="btnContainer">*/}
                                <button
                                    className="btn btn-lg btn-activity btn-block text-uppercase"
                                    onClick={hasAccount ?
                                        () => dispatch(signIn({email, password})) :
                                        () => dispatch(signUp({email, password}))
                                    }
                                >
                                    {hasAccount ? 'Sign in' : 'Sign up'}
                                </button>
                            {/*</div>*/}
                            <div className="form-login-reverse mt-1">
                                {hasAccount ? 'Don\'t have an account?' : 'Have an account?'}
                                <label
                                    className="float-right"
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