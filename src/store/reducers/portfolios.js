import {ADD_PORTFOLIO, GET_PORTFOLIOS, REMOVE_PORTFOLIO, LOADING_PORTFOLIOS} from "../types";

const handlers = {
    [REMOVE_PORTFOLIO]: (state, {payload}) => ({...state, data: state.data.filter(stock => stock.id !== payload)}),
    [GET_PORTFOLIOS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [ADD_PORTFOLIO]: (state, {payload}) => ({...state, data: [...state.data, payload]}),
    [LOADING_PORTFOLIOS]: (state) => ({...state, loading: true}),
    DEFAULT: state => state
};

const initialState = {
    data: [],
    loading: false
};

export const portfolios = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);
}