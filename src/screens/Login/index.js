// import {Card} from "react-bootstrap";
// export { Form, Button, Card } from 'react-bootstrap';

export const Login = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;

    return(
        // <Card>
        //
        // </Card>
        // <div className="w-100 text-center mt-2">
        //     Already have an account? L
        // </div>
        <section className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="text" autoFocus required value={password} onChange={e => setPassword(e.target.value)}/>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button
                                onClick={handleLogin}
                            >Sign in</button>
                            <p>Don't have an account?
                                <span onClick={() => setHasAccount(!hasAccount)}>Sing up</span>
                            </p>
                        </>
                    ):(
                        <>
                            <button
                            onClick={handleSignup}
                            >Sign up</button>
                            <p>Have an account?
                                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}