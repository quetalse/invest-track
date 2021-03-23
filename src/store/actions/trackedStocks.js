import {
    LOADING_PORTFOLIO_TRACKED_STOCKS,
    // ADD_PORTFOLIO_TRACKED_STOCK,
    GET_PORTFOLIO_TRACKED_STOCKS,
    // REMOVE_PORTFOLIO_TRACKED_STOCK,
} from "../types";

import {auth, database} from "../../firebase";

export const setPortfolioTrackedStocksLoading = () => ({type: LOADING_PORTFOLIO_TRACKED_STOCKS});

export const getPortfolioTrackedStocks = (portfolioId) => dispatch => {
    const uid = auth.currentUser.uid;
    const portfolioTrackedStocksRef = database.ref('profiles/' + uid + '/portfolios/' + portfolioId + '/trackedStocks');

    dispatch(setPortfolioTrackedStocksLoading());

    portfolioTrackedStocksRef
    .on('value', snapshot => {

        if(snapshot.exists()){
            const trackedStocks = snapshot.val();
            console.log('tracked stocks', trackedStocks)
            const payload = Object.keys(trackedStocks).map((id) => ({
                id,
                title: trackedStocks[id].title
            }));
            dispatch({
                type: GET_PORTFOLIO_TRACKED_STOCKS,
                payload
            })
        }else{
            dispatch({
                type: GET_PORTFOLIO_TRACKED_STOCKS,
                payload: []
            })
        }
    }, function(error) {
        console.error('error', error);
    })
}
