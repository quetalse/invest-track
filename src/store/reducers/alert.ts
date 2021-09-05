import {HIDE_ALERT, SHOW_ALERT} from "../types";

interface Handlers {
    [key: string]: (a: initialStateT, b?: any) => initialStateT
}

const handlers: Handlers = {
    [SHOW_ALERT]: (state, {payload}) => ({...payload, visible: true}),
    [HIDE_ALERT]: state => ({...state, visible: false}),
    DEFAULT: state => state
};

const initialState = {
    visible: false,
    type: null as string | null,
    text: null as string | null
}
type initialStateT = typeof initialState;

export const alert = (state = initialState, action: any) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}