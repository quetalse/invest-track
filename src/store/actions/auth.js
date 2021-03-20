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

export const setLoading = (status) => ({
    type: SET_LOADING,
    payload: status
})

export const setAccount = (account) => ({
    type: SET_ACCOUNT,
    payload: account
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const setEmail = (email) => ({
    type: SET_EMAIL,
    payload: email

});

export const setPassword = (password) => ({
    type: SET_PASSWORD,
    payload: password
});

export const clearInputs = () => ({
    type: CLEAR_INPUTS
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

const emailError = (msg) => ({
    type: EMAIL_ERROR,
    payload: msg
})

const passwordError = (msg) => ({
    type: PASSWORD_ERROR,
    payload: msg
})

export const signIn = ({email, password}) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoading(true));
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => dispatch(setUser(userCredential.user)))
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

export const signUp = ({email, password}) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoading());
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