import {auth, database} from "../../firebase";
import firebase from "firebase";
import {Stock} from "../../@types/@stock";

import {
    LOADING_PORTFOLIO_TRACKED_STOCKS,
    // ADD_PORTFOLIO_TRACKED_STOCK,
    GET_PORTFOLIO_TRACKED_STOCKS,
    // REMOVE_PORTFOLIO_TRACKED_STOCK,
} from "../types";


export const setPortfolioTrackedStocksLoading = (): {type: typeof LOADING_PORTFOLIO_TRACKED_STOCKS} => ({type: LOADING_PORTFOLIO_TRACKED_STOCKS});
export const setPortfolioTrackedStocks = (payload: Array<Stock>): {
    type: typeof GET_PORTFOLIO_TRACKED_STOCKS
    payload: Array<Stock>
} => ({
    type: GET_PORTFOLIO_TRACKED_STOCKS,
    payload: payload
});

export const getPortfolioTrackedStocks = (portfolioId: string) => (dispatch: any): void => {

    const currentUser: firebase.User | null = auth.currentUser;

    if(currentUser) {
        dispatch(setPortfolioTrackedStocksLoading());

        const uid: string = currentUser.uid;
        const portfolioTrackedStocksRef = database.ref('profiles/' + uid + '/portfolios/' + portfolioId + '/trackedStocks');

        portfolioTrackedStocksRef
            .on('value', snapshot => {

                if (snapshot.exists()) {
                    const trackedStocks = snapshot.val();
                    const payload = Object.keys(trackedStocks).map((id) => ({
                        id,
                        title: trackedStocks[id].title,
                        date: trackedStocks[id].date
                    }));
                    dispatch(setPortfolioTrackedStocks(payload))
                } else {
                    dispatch(setPortfolioTrackedStocks([]))
                }
            }, function (error) {
                console.error('error', error);
            })
    }
}
