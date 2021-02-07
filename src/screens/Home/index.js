import {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

/** APP COMPONENTS**/
import { AppForm } from "../../components/AppForm";
import { AppList } from "../../components/AppList";
import { AppLoader } from "../../components/AppLoader";

/** ACTIONS **/
import { getAll, remove } from "../../store/actions/stocks";

import "./styles.scss";

import portfel from "../../assets/images/portfel.png";

const AppPortfelCard = ({title}) => {
    return (
        <div>
            <img width="220" src={portfel} alt="portfel"/>
            <p>{ title || <button > Добавить новый портфель</button> }</p>
        </div>
    )
}

export const Home = () => {

    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.stocks);
    const [portfelArray, setPortfelArray] = useState([])

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

    const PortfelList = () => {
        if(portfelArray.length){

        }else{
            return (
                <div className="home__portfel-list">
                    Портфелей нет, добавить новый
                    <AppPortfelCard/>
                </div>
            )
        }
    }

    return (
        <section className="home">
            <h1 className="home__title">Add new item (ETFs, stocks, bonds, etc). to portfel</h1>
            <AppForm className="home__form"/>
            <StockList/>
            <PortfelList/>
        </section>
    )
}