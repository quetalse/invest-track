import {
    LOADING_PORTFOLIO_TRACKED_STOCKS,
    ADD_PORTFOLIO_TRACKED_STOCK,
    GET_PORTFOLIO_TRACKED_STOCKS,
    REMOVE_PORTFOLIO_TRACKED_STOCK
} from "../types";

const handlers = {
    [LOADING_PORTFOLIO_TRACKED_STOCKS]: (state) => ({...state, loading: true}),
    [ADD_PORTFOLIO_TRACKED_STOCK]: (state, {payload}) => ({...state, data: [...state.data, payload]}),
    [GET_PORTFOLIO_TRACKED_STOCKS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [REMOVE_PORTFOLIO_TRACKED_STOCK]: (state, {payload}) => ({...state, data: state.data.filter(stock => stock.id !== payload)}),
    DEFAULT: state => state
};

const initialState = {
    data: null,
    loading: false
};

export const trackedStocks = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}