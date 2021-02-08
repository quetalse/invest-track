import {ADD_STOCK, GET_STOCKS, REMOVE_STOCK, SHOW_LOADER} from "../types";
import { getRequest, postRequest, deleteRequest} from "../api";

const url = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const showLoader = () => ({type: SHOW_LOADER});

export const getAll = () => async dispatch => {

    dispatch(showLoader());

    const data = await getRequest(`${url}/stocks.json`);

    const payload = Object.keys(data).map(key => ({
        ...data[key],
        id: key
    }))

    dispatch({
        type: GET_STOCKS,
        payload
    })
};
export const add = title => async dispatch => {
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
export const remove = id => async dispatch => {
    await deleteRequest(`${url}/stocks/${id}.json`);
    dispatch({
        type: REMOVE_STOCK,
        payload: id
    })
}