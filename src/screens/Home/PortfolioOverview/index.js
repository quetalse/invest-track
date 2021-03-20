import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { auth, database } from "../../../firebase";

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

/** APP COMPONENTS**/
// import { AppLoader } from "../../../components/AppLoader";

/** COMPONENTS **/
import { TabFinResult } from "./TabFinResult";
import { TabStockList } from "./TabStockList";
import { TabTrackedList } from "./TabTrackedList";
// import { PortfolioModal } from "../PortfolioModal";


/** ACTIONS **/
// import { getPortfolios } from "../../../store/actions/portfolios";
// import portfolio from "../../../assets/images/portfolio.png";

import "./styles.scss";

export const PortfolioOverview = () => {

    const [key, setKey] = useState('FinResults');

    return (
        <div className="portfolio-overview">
            <div className="portfolio-overview__header">
                <h4 className="portfolio-overview__title">Portfolios overview</h4>
            </div>
            <div className="portfolio-overview__body">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="FinResults" title="Fin results">
                        <TabFinResult/>
                    </Tab>
                    <Tab eventKey="StocksList" title="Stocks list">
                        <TabStockList/>
                    </Tab>
                    <Tab eventKey="TrackedStocks" title="Tracked stocks">
                        <TabTrackedList/>
                    </Tab>
                </Tabs>
                {/*{loading && <AppLoader modifier={"app-loader--center"}/>}*/}
                {/*{data && renderPortfolios(data)}*/}
            </div>
            {/*<PortfolioModal showModal={showModal} closeModal={ () => setShowModal(false)}/>*/}
        </div>
    )
}