import firebase from "firebase";
import {auth, database} from "../../firebase";
import {Stock} from "../../@types/@stock";

import {
    LOADING_PORTFOLIO_STOCKS,
    ADD_PORTFOLIO_STOCK,
    GET_PORTFOLIO_STOCKS,
    // REMOVE_PORTFOLIO_STOCK,
} from "../types";



export const setPortfolioStocksLoading = (): {type: typeof LOADING_PORTFOLIO_STOCKS} => ({type: LOADING_PORTFOLIO_STOCKS});
export const setPortfolioStocks = (stocks: Array<Stock>): {
    type: typeof GET_PORTFOLIO_STOCKS
    payload: Array<Stock>
} => ({
    type: GET_PORTFOLIO_STOCKS,
    payload: stocks
})

export const addPortfolioStock = (stocks: Array<Stock>): {
    type: typeof ADD_PORTFOLIO_STOCK
    payload: Array<Stock>
} => ({
    type: ADD_PORTFOLIO_STOCK,
    payload: stocks
})

export const getPortfolioStocks = (portfolioId: string) => (dispatch: any): void => {

    const currentUser: firebase.User | null = auth.currentUser;

    if(currentUser) {
        dispatch(setPortfolioStocksLoading());

        const uid: string = currentUser.uid;
        const portfolioStocksRef = database.ref('profiles/' + uid + '/portfolios/' + portfolioId + '/stocks');

        portfolioStocksRef
            .on('value', snapshot => {
                if (snapshot.exists()) {
                    const stocks = snapshot.val();
                    const payload = Object.keys(stocks).map((id) => ({
                        id,
                        title: stocks[id].title,
                        date: stocks[id].date
                    }));
                    dispatch(setPortfolioStocks(payload))
                } else {
                    dispatch(setPortfolioStocks([]))
                }
            }, function (error) {
                console.error('error', error);
            })
    }
}

export const addPortfolioStockAC = (portfolioId: string, stockData: Stock) => (dispatch: any): void => {
    const currentUser: firebase.User | null = auth.currentUser;

    if(currentUser) {
        dispatch(setPortfolioStocksLoading());

        const uid: string = currentUser.uid;
        const portfolioStocksRef = database.ref('profiles/' + uid + '/portfolios/' + portfolioId + '/stocks');

        portfolioStocksRef
            .on('value', snapshot => {
                if(snapshot.exists()){
                    const stocks = snapshot.val();
                    const payload = Object.keys(stocks).map((id) => ({
                        id,
                        title: stocks[id].title,
                        date: stocks[id].date
                    }));
                    dispatch(addPortfolioStock(payload))
                }else{
                    dispatch(addPortfolioStock([]))
                }
            }, function(error) {
                console.error('error', error);
            })
    }
}

