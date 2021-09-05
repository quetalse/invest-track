import { useState } from "react";
import { useSelector } from "react-redux";

/** SIDE COMPONENTS **/
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

/** APP COMPONENTS**/
import { TabFinResult } from "./TabFinResult";
import { TabStockList } from "./TabStockList";
import { TabTrackedList } from "./TabTrackedList";

/** ACTIONS **/

/** TYPES **/
import {rootStateT} from "../../../store/reducers";
import {Portfolio} from "../../../@types/@portfolio";

import "./styles.scss";

export const PortfolioOverview = () => {

    const [key, setKey] = useState('FinResults');
    const { activePortfolioId, portfoliosData: portfoliosList } = useSelector((state: rootStateT) => state.portfolios);

    // // Получаем список список ценых бумаг портфеля юзера когда выбран портфель
    // useEffect(() => {
    //     if(!stockList && !loading && activePortfolio){
    //         dispatch(getPortfolioStocks(activePortfolio));
    //     }
    // }, [activePortfolio, stockList, loading, dispatch])

    const portfolioTitle = (portfoliosList: Array<Portfolio> | null) => {
        if(activePortfolioId && portfoliosList){
            let portfolio = portfoliosList.find(portfolio => portfolio.id === activePortfolioId)
            return portfolio ? portfolio.title : ''
        }else{
            return ''
        }
    }

    return (
        <div className="portfolio-overview">
            <div className="portfolio-overview__header">
                <h4 className="portfolio-overview__title">{activePortfolioId ? `Portfolio ${portfolioTitle(portfoliosList)} overview` : <em> Choose portfolio </em>}</h4>
            </div>
            <div className="portfolio-overview__body">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => { if(k) setKey(k) }}
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