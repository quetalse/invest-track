import { Fragment, useContext, useEffect } from 'react';

import { AppForm } from "../../components/AppForm";
import { AppList } from "../../components/AppList";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import {AppLoader} from "../../components/AppLoader";

export const Home = () => {

    const {loading, stocks, fetchStocks, removeStock} = useContext(FirebaseContext);

    useEffect(() => {
        fetchStocks();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <AppForm/>
            <hr/>
            {loading ? <AppLoader/> : <AppList stocks={stocks} onRemove={removeStock}/>}
        </Fragment>
    )
}