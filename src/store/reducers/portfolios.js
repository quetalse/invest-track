import {ADD_PORTFOLIO, GET_PORTFOLIOS, REMOVE_PORTFOLIO, LOADING_PORTFOLIOS, SET_ACTIVE_PORTFOLIO} from "../types";

const handlers = {
    [REMOVE_PORTFOLIO]: (state, {payload}) => ({...state, data: state.data.filter(stock => stock.id !== payload)}),
    [GET_PORTFOLIOS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [ADD_PORTFOLIO]: (state, {payload}) => ({...state, data: [...state.data, payload]}),
    [LOADING_PORTFOLIOS]: (state) => ({...state, loading: true}),

    [SET_ACTIVE_PORTFOLIO]: (state, {payload}) => ({...state, activePortfolio: payload}),
    DEFAULT: state => state
};

const initialState = {
    activePortfolio: null,
    data: null,
    loading: false
};

export const portfolios = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    // console.log('state, action', state, action)

    return handle(state, action);
}