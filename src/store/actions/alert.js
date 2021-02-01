import {HIDE_ALERT, SHOW_ALERT} from "../types";


export const show = dispatch => (text, type = 'warning') => {
    dispatch({
        type: SHOW_ALERT,
        payload: {text, type}
    })
};

export const hide = dispatch => () => {
    dispatch({
        type: HIDE_ALERT
    })
}