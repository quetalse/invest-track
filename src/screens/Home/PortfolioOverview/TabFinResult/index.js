import {useSelector} from "react-redux";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { auth, database } from "../../../firebase";

// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

/** APP COMPONENTS**/
import {AppLoader} from "../../../../components/AppLoader";

/** COMPONENTS **/
// import { PortfolioCard } from "../PortfolioCard";
// import { PortfolioModal } from "../PortfolioModal";




/** ACTIONS **/
// import { getPortfolios } from "../../../store/actions/portfolios";
// import portfolio from "../../../assets/images/portfolio.png";

// import "./styles.scss";

export const TabFinResult = () => {

    const {data, loading} = useSelector(state => state.stocks);

    const renderChart = (data) => {

        const hasData = !! data.length;

        if(hasData){

        }else{
            return <span>Not enough data</span>
        }
    }

    return (
        <div className="tab-finresult">
            {loading && <AppLoader modifier={"app-loader_center"}/>}
            {data ? renderChart(data) : <span>Choose portfolio</span>}
        </div>
    )
}