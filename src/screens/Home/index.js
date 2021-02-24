import {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { auth, database } from "../../firebase";

/** COMPONENTS **/
import { PortfoliosList } from "./PortfoliosList/index";

/** APP COMPONENTS**/
import { AppForm } from "../../components/AppForm";
import { AppList } from "../../components/AppList";
import { AppLoader } from "../../components/AppLoader";

/** ACTIONS **/
import { getAll, remove } from "../../store/actions/stocks";

import "./styles.scss";


export const Home = () => {

    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.stocks);


    const getAllStocks = () => dispatch(getAll());
    const removeStock = id => dispatch(remove(id));

    useEffect(() => {
        getAllStocks()
        // eslint-disable-next-line
    }, []);

    const StockList = () => (
        <div className="home__list">
            {loading ? <AppLoader className="app-loader-light"/> : <AppList listData={data} onRemove={removeStock}/>}
        </div>
    )

    return (
        <section className="home">
            {/*<h1 className="home__title">Add new item (ETFs, stocks, bonds, etc). to portfolio</h1>*/}
            {/*<AppForm className="home__form"/>*/}
            {/*<StockList/>*/}
            <PortfoliosList/>
        </section>
    )
}