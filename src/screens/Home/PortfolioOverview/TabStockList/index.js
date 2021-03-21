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
import {useEffect} from "react";
import {getPortfolioStocks} from "../../../../store/actions/stocks";

/** ACTIONS **/
// import { getPortfolios } from "../../../store/actions/portfolios";
// import portfolio from "../../../assets/images/portfolio.png";

// import "./styles.scss";

export const TabStockList = () => {

    const dispatch = useDispatch();
    const { activePortfolio } = useSelector(state => state.portfolios);
    const { data: stockList, loading } = useSelector(state => state.stocks);

    // Получаем список список ценых бумаг портфеля юзера когда выбран портфель
    useEffect(() => {
        if(!stockList && !loading && activePortfolio){
            dispatch(getPortfolioStocks(activePortfolio));
        }
    }, [activePortfolio, stockList, loading, dispatch])

    const renderTable = (data) => {

        const hasData = !! data.length;

        if(hasData){

        }else{
            return (
                <>
                    <b>Not enough data</b>
                    <div className="tab-stock-list__add-btn">
                        <button type="button" className="app-button" onClick={() => console.log('add')}>Add new stock</button>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="tab-stock-list">
            {loading && <AppLoader modifier={"app-loader_center"}/>}
            {activePortfolio && stockList ? renderTable(stockList) : <em> Choose portfolio </em>}
        </div>
    )
}