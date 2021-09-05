import {
    ADD_PORTFOLIO,
    SET_PORTFOLIOS,
    EDIT_PORTFOLIO,
    REMOVE_PORTFOLIO,
    LOADING_PORTFOLIOS,
    SET_ACTIVE_PORTFOLIO_ID
} from "../types";

import { Portfolio } from "../../@types/@portfolio";

interface Handlers {
    [key: string]: (a: initialStateT, b?: any) => initialStateT
}

const handlers: Handlers = {
    [REMOVE_PORTFOLIO]: (state, {payload}) => ({
        ...state,
        portfoliosData: state.portfoliosData?.filter(portfolio => portfolio.id !== payload),
        activePortfolioIds: state.activePortfolioId === payload ? null : state.activePortfolioId
    } as initialStateT),

    [SET_PORTFOLIOS]: (state, {payload}) => ({...state, portfoliosData: payload, loading: false}),

    [EDIT_PORTFOLIO]: (state, {payload}) => ({
        ...state,
        portfoliosData: state.portfoliosData?.map(portfolio => {
           if(portfolio.id === payload.portfolioId) return { title: payload.title, id: portfolio.id};
           return portfolio;
        }),
        loading: false
    } as initialStateT),

    [ADD_PORTFOLIO]: (state, {payload}) => ({
        ...state,
        portfoliosData: state.portfoliosData !== null ? [...state.portfoliosData, payload] : state.portfoliosData
    }),
    [LOADING_PORTFOLIOS]: (state) => ({...state, loading: true}),
    [SET_ACTIVE_PORTFOLIO_ID]: (state, {payload}) => ({...state, activePortfolioId: payload} as initialStateT),

    DEFAULT: state => state
};

const initialState = {
    activePortfolioId: null as string | null,
    portfoliosData: null as Array<Portfolio> | null,
    loading: false
};

type initialStateT = typeof initialState;

export const portfolios = (state: initialStateT = initialState, action: any) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}