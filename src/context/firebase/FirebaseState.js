import { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {ADD_STOCK, FETCH_STOCKS, REMOVE_STOCK, SHOW_LOADER} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {

    const initialState = {
        stocks: [],
        loading: false
    };

    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER});
    const fetchStocks = async () => {
        showLoader();
        const result = await axios.get(`${url}/stocks.json`);
        const payload = Object.keys(result.data).map(key => ({
            ...result.data[key],
            id: key
        }))

        dispatch({
            type: FETCH_STOCKS,
            payload
        })
    };
    const addStock = async title => {
        const stock = {
            title, date: new Date().toJSON()
        }
       try{
           const result = await axios.post(`${url}/stocks.json`, stock);
           const payload = {
               ...stock,
               id: result.data.name
           };

           dispatch({
               type: ADD_STOCK,
               payload
           })

       }catch (e) {
            throw new Error(e.message)
       }
    };
    const removeStock = async id => {
        await axios.delete(`${url}/stocks/${id}.json`);
        dispatch({
            type: REMOVE_STOCK,
            payload: id
        })
    }

    return  (
        <FirebaseContext.Provider value={{ showLoader, addStock, fetchStocks, removeStock, loading: state.loading, stocks: state.stocks}}>
            {children}
        </FirebaseContext.Provider>
    )
}