import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { auth, database } from "../../../firebase";

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

/** APP COMPONENTS**/
// import { AppLoader } from "../../../components/AppLoader";

/** COMPONENTS **/
// import { PortfolioCard } from "../PortfolioCard";
// import { PortfolioModal } from "../PortfolioModal";


/** ACTIONS **/
// import { getPortfolios } from "../../../store/actions/portfolios";
// import portfolio from "../../../assets/images/portfolio.png";

import "./styles.scss";

export const PortfolioOverview = () => {

    const [key, setKey] = useState('home');

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
                        Line Chart
                    </Tab>
                    <Tab eventKey="StocksList" title="Stocks list">
                        List
                    </Tab>
                    <Tab eventKey="TrackedStocks" title="Tracked stocks">
                       List
                    </Tab>
                </Tabs>
                {/*{loading && <AppLoader modifier={"app-loader--center"}/>}*/}
                {/*{data && renderPortfolios(data)}*/}
            </div>
            {/*<PortfolioModal showModal={showModal} closeModal={ () => setShowModal(false)}/>*/}
        </div>
    )
}