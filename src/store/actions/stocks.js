import {
    LOADING_PORTFOLIO_STOCKS,
    // ADD_PORTFOLIO_STOCK,
    GET_PORTFOLIO_STOCKS,
    // REMOVE_PORTFOLIO_STOCK,
} from "../types";

import {auth, database} from "../../firebase";

export const setPortfolioStocksLoading = () => ({type: LOADING_PORTFOLIO_STOCKS});

export const getPortfolioStocks = (portfolioId) => dispatch => {
    const uid = auth.currentUser.uid;
    const portfolioStocksRef = database.ref('profiles/' + uid + '/portfolios/' + portfolioId + '/stocks');

    dispatch(setPortfolioStocksLoading());

    portfolioStocksRef
        .on('value', snapshot => {
            if(snapshot.exists()){
                const stocks = snapshot.val();
                console.log('stocks', stocks)
                const payload = Object.keys(stocks).map((id) => ({
                    id,
                    title: stocks[id].title
                }));
                dispatch({
                    type: GET_PORTFOLIO_STOCKS,
                    payload
                })
            }else{
                dispatch({
                    type: GET_PORTFOLIO_STOCKS,
                    payload: []
                })
            }
        }, function(error) {
            console.error('error', error);
        })
}
