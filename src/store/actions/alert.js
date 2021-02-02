import {HIDE_ALERT, SHOW_ALERT} from "../types";


export const show = (text, type = 'warning') => dispatch => {
    dispatch({
        type: SHOW_ALERT,
        payload: {text, type}
    })
};

export const hide = () => dispatch => {
    dispatch({
        type: HIDE_ALERT
    })
}