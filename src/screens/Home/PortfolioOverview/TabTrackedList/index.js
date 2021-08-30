// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { auth, database } from "../../../firebase";

// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

/** APP COMPONENTS**/
// import { AppLoader } from "../../../components/AppLoader";

/** COMPONENTS **/
// import { PortfolioCard } from "../PortfolioCard";
// import { PortfolioModal } from "../PortfolioModal";


import {AppLoader} from "../../../../components/AppLoader";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


/** ACTIONS **/
import {getPortfolioTrackedStocks} from "../../../../store/actions/trackedStocks";
import {StockModal} from "../Modal";
// import { getPortfolios } from "../../../store/actions/portfolios";
// import portfolio from "../../../assets/images/portfolio.png";

// import "./styles.scss";

export const TabTrackedList = () => {

    const dispatch = useDispatch();
    const { activePortfolio } = useSelector(state => state.portfolios);
    const [showModal, setShowModal] = useState(false);
    const {data: trackedStockList, loading} = useSelector(state => state.trackedStocks);

    // Получаем список список ценых бумаг портфеля юзера когда выбран портфель
    useEffect(() => {
        if(!trackedStockList && !loading && activePortfolio){
            dispatch(getPortfolioTrackedStocks(activePortfolio));
        }
    }, [activePortfolio, trackedStockList, loading, dispatch])

    const addStock = () => {
        setShowModal(true);
    }

    const renderTable = (data) => {

        const hasData = !! data.length;

        if(hasData){

        }else{
            return (
                <>
                    <b>Not enough data</b>
                    <div className="tab-tracked-list__add-btn">
                        <button type="button" className="app-button" onClick={addStock}>Add new tracked stock</button>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="tab-tracked-list">
            {loading && <AppLoader modifier={"app-loader_center"}/>}
            {trackedStockList ? renderTable(trackedStockList) : <em> Choose portfolio </em>}
            <StockModal showModal={showModal} closeModal={ () => setShowModal(false)}/>
        </div>
    )
}