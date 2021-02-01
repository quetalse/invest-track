import {ADD_STOCK, FETCH_STOCKS, REMOVE_STOCK, SHOW_LOADER} from "../types";
import { getRequest, postRequest, deleteRequest} from "../api";

const url = process.env.REACT_APP_DB_URL;

export const showLoader = dispatch => dispatch({type: SHOW_LOADER});

export const getAll = dispatch => async () => {
    showLoader(dispatch);
    const data = await getRequest(`${url}/stocks.json`);
    const payload = Object.keys(data).map(key => ({
        ...data[key],
        id: key
    }))

    dispatch({
        type: FETCH_STOCKS,
        payload
    })
};
export const add = dispatch => async title => {
    const stock = {
        title, date: new Date().toJSON()
    }
    try{
        const data = await postRequest({
            url: `${url}/stocks.json`,
            stock
        })

        const payload = {
            ...stock,
            id: data.name
        };

        dispatch({
            type: ADD_STOCK,
            payload
        })

    }catch (e) {
        throw new Error(e.message)
    }
};
export const remove = dispatch => async id => {
    await deleteRequest(`${url}/stocks/${id}.json`);
    dispatch({
        type: REMOVE_STOCK,
        payload: id
    })
}