import {SET_LOADING, SET_USER, SET_EMAIL, SET_PASSWORD, CLEAR_INPUTS, CLEAR_ERRORS, EMAIL_ERROR, PASSWORD_ERROR, SET_ACCOUNT} from "../types";
import firebase from "firebase/app";

interface Handlers {
    [key: string]: (a: initialStateT, b?: any) => initialStateT
}

const handlers: Handlers = {
    [SET_LOADING]: (state, {payload}) => {return {...state, loading: payload}},
    [SET_ACCOUNT]: (state, {payload}) => ({...state, hasAccount: payload}),
    [SET_EMAIL]: (state, {payload}) => ({...state, email: payload}),
    [SET_PASSWORD]: (state, {payload}) => ({...state, password: payload}),
    [SET_USER]: (state, {payload}) => ({...state, user: payload}),
    [PASSWORD_ERROR]: (state, {payload}) => ({...state, passwordError: payload}),
    [EMAIL_ERROR]: (state, {payload}) => ({...state, emailError: payload}),
    [CLEAR_ERRORS]: state => ({...state, emailError: '', passwordError: ''}),
    [CLEAR_INPUTS]: state => ({...state, email: '', password: ''}),
    DEFAULT: state => state,
};

const initialState = {
    loading: false,
    user: null as firebase.User | null,
    email: null as string | null,
    password: null as string | null,
    emailError: null as string | null,
    passwordError: null as string | null,
    hasAccount: false
};

type initialStateT = typeof initialState;

export const auth = (state: initialStateT = initialState, action: any): initialStateT => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}