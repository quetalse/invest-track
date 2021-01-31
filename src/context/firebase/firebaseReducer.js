import {ADD_STOCK, FETCH_STOCKS, REMOVE_STOCK, SHOW_LOADER} from "../types";

const handlers = {
    [REMOVE_STOCK]: (state, {payload}) => ({...state, stocks: state.stocks.filter(stock => stock.id !== payload)}),
    [FETCH_STOCKS]: (state, {payload}) => ({...state, stocks: payload, loading: false}),
    [ADD_STOCK]: (state, {payload}) => ({...state, stocks: [...state.stocks, payload]}),
    [SHOW_LOADER]: (state) => ({...state, loading: true}),
    DEFAULT: state => state
};

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);
}