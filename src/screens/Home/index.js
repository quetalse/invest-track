import { Fragment, useEffect } from 'react';

import { AppForm } from "../../components/AppForm";
import { AppList } from "../../components/AppList";
import { AppLoader } from "../../components/AppLoader";
import {useDispatch, useSelector} from "react-redux";

import { getAll, remove } from "../../store/actions/stocks";

export const Home = () => {

    // const {loading, stocks, fetchStocks, removeStock} = useContext(FirebaseContext);
    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.stocks);

    const getAllStocks = () => dispatch(getAll());
    const removeStock = id => dispatch(remove(id));

    useEffect(() => {
        getAllStocks()
        // eslint-disable-next-line
    }, []);


    return (
        <Fragment>
            <AppForm/>
            <hr/>
            {loading ? <AppLoader/> : <AppList stocks={data} onRemove={removeStock}/>}
        </Fragment>
    )
}