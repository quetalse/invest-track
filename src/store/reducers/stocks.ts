import { Stock } from "../../@types/@stock";
import {
    LOADING_PORTFOLIO_STOCKS,
    ADD_PORTFOLIO_STOCK,
    GET_PORTFOLIO_STOCKS,
    REMOVE_PORTFOLIO_STOCK
} from "../types";

interface Handlers {
    [key: string]: (a: initialStateT, b?: any) => initialStateT
}

const handlers: Handlers = {
    [REMOVE_PORTFOLIO_STOCK]: (state, {payload}) => ({...state, data: state.data?.filter(stock => stock.id !== payload) || null} ),
    [GET_PORTFOLIO_STOCKS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [ADD_PORTFOLIO_STOCK]: (state, {payload}) => {
        return {
            ...state,
            data: [...state.data || [], payload]
        }
    },
    [LOADING_PORTFOLIO_STOCKS]: (state) => ({...state, loading: true}),
    DEFAULT: state => state
};

const initialState = {
    data: null as Array<Stock> | null,
    loading: false
};

type initialStateT = typeof initialState;


export const stocks = (state: initialStateT = initialState, action: any) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);
}