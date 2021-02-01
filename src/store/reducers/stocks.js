import {ADD_STOCK, FETCH_STOCKS, REMOVE_STOCK, SHOW_LOADER} from "../types";

const handlers = {
    [REMOVE_STOCK]: (state, {payload}) => ({...state, data: state.data.filter(stock => stock.id !== payload)}),
    [FETCH_STOCKS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [ADD_STOCK]: (state, {payload}) => ({...state, data: [...state.data, payload]}),
    [SHOW_LOADER]: (state) => ({...state, loading: true}),
    DEFAULT: state => state
};

const initialState = {
    data: [],
    loading: false
};

export const stocks = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);
}