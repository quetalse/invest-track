import {SET_LOADING, SET_USER, SET_EMAIL, SET_PASSWORD, CLEAR_INPUTS, CLEAR_ERRORS, EMAIL_ERROR, PASSWORD_ERROR, SET_ACCOUNT} from "../types";

const handlers = {
    [SET_LOADING]: (state, {payload}) => ({...state, loading: payload}),
    [SET_ACCOUNT]: (state, {payload}) => ({...state, hasAccount: payload}),
    [SET_EMAIL]: (state, {payload}) => ({...state, email: payload}),
    [SET_PASSWORD]: (state, {payload}) => ({...state, password: payload}),
    [SET_USER]: (state, {payload}) => ({...state, user: payload}),
    [PASSWORD_ERROR]: (state, {payload}) => ({...state, passwordError: payload}),
    [EMAIL_ERROR]: (state, {payload}) => ({...state, emailError: payload}),
    [CLEAR_ERRORS]: state => ({...state, emailError: '', passwordError: ''}),
    [CLEAR_INPUTS]: state => ({...state, email: '', password: ''}),
    DEFAULT: state => state
};

const initialState = {
    loading: false,
    user: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    hasAccount: false
};

export const auth = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}