import {
    LOADING_PORTFOLIO_STOCKS,
    ADD_PORTFOLIO_STOCK,
    GET_PORTFOLIO_STOCKS,
    REMOVE_PORTFOLIO_STOCK
} from "../types";

const handlers = {
    [REMOVE_PORTFOLIO_STOCK]: (state, {payload}) => ({...state, data: state.data.filter(stock => stock.id !== payload)}),
    [GET_PORTFOLIO_STOCKS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [ADD_PORTFOLIO_STOCK]: (state, {payload}) => ({...state, data: [...state.data, payload]}),
    [LOADING_PORTFOLIO_STOCKS]: (state) => ({...state, loading: true}),
    DEFAULT: state => state
};

const initialState = {
    data: null,
    loading: false
};

export const stocks = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);
}