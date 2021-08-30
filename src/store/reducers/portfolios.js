import {
    ADD_PORTFOLIO,
    SET_PORTFOLIOS,
    EDIT_PORTFOLIO,
    REMOVE_PORTFOLIO,
    LOADING_PORTFOLIOS,
    SET_ACTIVE_PORTFOLIO
} from "../types";

const handlers = {
    [REMOVE_PORTFOLIO]: (state, {payload}) => ({...state, data: state.data.filter(portfolio => portfolio.id !== payload), activePortfolio: state.activePortfolio === payload ? null : state.activePortfolio}),
    [SET_PORTFOLIOS]: (state, {payload}) => ({...state, data: payload, loading: false}),
    [EDIT_PORTFOLIO]: (state, {payload}) => ({...state, data: state.data.map(portfolio => {
           if(portfolio.id === payload.portfolioId) return { title: payload.title, id: portfolio.id};
           return portfolio;
        }), loading: false}),
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
    return handle(state, action);
}