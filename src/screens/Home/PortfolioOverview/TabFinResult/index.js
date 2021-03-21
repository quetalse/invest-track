import {useDispatch, useSelector} from "react-redux";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { auth, database } from "../../../firebase";

// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

/** APP COMPONENTS**/
import {AppLoader} from "../../../../components/AppLoader";
import {useEffect} from "react";
import {getPortfolios} from "../../../../store/actions/portfolios";

/** COMPONENTS **/
// import { PortfolioCard } from "../PortfolioCard";
// import { PortfolioModal } from "../PortfolioModal";


/** ACTIONS **/
import { getPortfolioStocks } from "../../../../store/actions/stocks";
// import portfolio from "../../../assets/images/portfolio.png";

// import "./styles.scss";

export const TabFinResult = () => {

    const dispatch = useDispatch();
    const { activePortfolio } = useSelector(state => state.portfolios);
    const {data: stockList, loading} = useSelector(state => state.stocks);

    // Получаем список список ценых бумаг портфеля юзера когда выбран портфель
    useEffect(() => {
        if(!stockList && !loading && activePortfolio){
            dispatch(getPortfolioStocks(activePortfolio));
        }
    }, [activePortfolio, stockList, loading, dispatch])

    const renderChart = (data) => {

        const hasData = !! data.length;

        if(hasData){

        }else{
            return (
                <>
                    <b>Not enough data</b>
                    <div className="tab-fin-result__add-btn">
                        <button type="button" className="app-button" onClick={() => console.log('add')}>Add new stock</button>
                    </div>
                </>
            )
        }
    }

    return (
        <div className="tab-fin-result">
            {loading && <AppLoader modifier={"app-loader_center"}/>}
            {activePortfolio && stockList ? renderChart(stockList) : <em> Choose portfolio </em>}
        </div>
    )
}