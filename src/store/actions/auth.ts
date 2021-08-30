import {
    SET_LOADING,
    SET_USER,
    SET_EMAIL,
    SET_PASSWORD,
    CLEAR_INPUTS,
    CLEAR_ERRORS,
    EMAIL_ERROR,
    PASSWORD_ERROR,
    SET_ACCOUNT
} from "../types";

import { auth } from "../../firebase";
import firebase from "firebase/app";

export const setLoading = (status: boolean): {type: typeof SET_LOADING, payload: boolean} => ({
    type: SET_LOADING,
    payload: status
})

export const setHasAccount = (account: boolean): {type: typeof SET_ACCOUNT, payload: boolean} => ({
    type: SET_ACCOUNT,
    payload: account
});

export const setUser = (user: firebase.User | null): {type: typeof SET_USER, payload: firebase.User | null} => ({
    type: SET_USER,
    payload: user
});

export const setEmail = (email: string): {type: typeof SET_EMAIL, payload: string} => ({
    type: SET_EMAIL,
    payload: email

});

export const setPassword = (password: string): {type: typeof SET_PASSWORD, payload: string} => ({
    type: SET_PASSWORD,
    payload: password
});

export const clearInputs = (): {type: typeof CLEAR_INPUTS} => ({
    type: CLEAR_INPUTS
});

export const clearErrors = (): {type: typeof CLEAR_ERRORS} => ({
    type: CLEAR_ERRORS
});

const emailError = (msg: string): {type: typeof EMAIL_ERROR, payload: string} => ({
    type: EMAIL_ERROR,
    payload: msg
})

const passwordError = (msg: string): {type: typeof PASSWORD_ERROR, payload: string} => ({
    type: PASSWORD_ERROR,
    payload: msg
})

export const signIn = ({email, password}: {email: string, password: string}) => (dispatch: any): void => {
    dispatch(clearErrors());
    dispatch(setLoading(true));
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => dispatch(setUser(userCredential.user)))
        .catch(error => {
            switch (error.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    dispatch(emailError(error.message));
                    break;
                case "auth/wrong-password":
                    dispatch(passwordError(error.message));
                    break;
                default:
            }
            dispatch(setLoading(false))
        })
}

export const signUp = ({email, password}: {email: string, password: string}) => (dispatch: any): void => {
    dispatch(clearErrors());
    dispatch(setLoading(true))
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => dispatch(setUser(userCredential.user)))
        .catch(error => {
            switch (error.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    dispatch(emailError(error.message));
                    break;
                case "auth/weak-password":
                    dispatch(passwordError(error.message));
                    break;
                default:
            }
            dispatch(setLoading(false))
        })
}

export const logOut = () => {
    auth.signOut()
        .catch((error) => {
            console.log(error)
        });
}