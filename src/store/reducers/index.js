import { combineReducers } from "redux";

import { alert } from "./alert";
import { stocks } from "./stocks";

export default combineReducers({
    alert,
    stocks
})