import {Stock} from "../../@types/@stock";
import {
    LOADING_PORTFOLIO_TRACKED_STOCKS,
    ADD_PORTFOLIO_TRACKED_STOCK,
    GET_PORTFOLIO_TRACKED_STOCKS,
    REMOVE_PORTFOLIO_TRACKED_STOCK
} from "../types";

interface Handlers {
    [key: string]: (a: initialStateT, b?: any) => initialStateT
}

const handlers: Handlers = {
    [LOADING_PORTFOLIO_TRACKED_STOCKS]: (state) => ({...state, loading: true}),
    [ADD_PORTFOLIO_TRACKED_STOCK]: (state, {payload}) => ({...state, data: [...state.data || [], payload]}),
    [GET_PORTFOLIO_TRACKED_STOCKS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [REMOVE_PORTFOLIO_TRACKED_STOCK]: (state, {payload}) => ({...state, data: state.data?.filter(stock => stock.id !== payload) || null}),
    DEFAULT: state => state
};

const initialState = {
    data: null as Array<Stock> | null,
    loading: false
};

type initialStateT = typeof initialState;


export const trackedStocks = (state: initialStateT = initialState, action: any) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}