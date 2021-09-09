import {HIDE_ALERT, SHOW_ALERT} from "../types";


export const show = (text: string, type = 'warning') => (dispatch: any): void => {
    dispatch({
        type: SHOW_ALERT,
        payload: {text, type}
    })
};

export const hide = () => (dispatch: any): void => {
    dispatch({
        type: HIDE_ALERT
    })
}