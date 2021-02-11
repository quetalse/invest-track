import { combineReducers } from "redux";

import { auth } from "./auth";
import { alert } from "./alert";
import { stocks } from "./stocks";
import { portfolios } from "./portfolios";

export const rootReducer = combineReducers({
    auth,
    alert,
    stocks,
    portfolios
})