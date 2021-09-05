import { combineReducers } from "redux";

import { auth } from "./auth";
import { alert } from "./alert";
import { portfolios } from "./portfolios";
import { stocks } from "./stocks";
import { trackedStocks } from "./trackedStocks";


export const rootReducer = combineReducers({
    auth, // Firebase auth
    alert, // Notifications
    portfolios, // Users portfolios list
    stocks, // Stocks in chosen portfolio
    trackedStocks, // Tracked stocks in chosen portfolio
});

type rootReducerT = typeof rootReducer;
export type rootStateT = ReturnType<rootReducerT>;