import {useDispatch, useSelector} from "react-redux";
/** SIDE COMPONENTS **/
import { Line } from 'react-chartjs-2'

/** APP COMPONENTS**/
import {AppLoader} from "../../../../components/AppLoader";
import {useEffect} from "react";

/** ACTIONS **/
import { getPortfolioStocks } from "../../../../store/actions/stocks";
import {rootStateT} from "../../../../store/reducers";

/** TYPES **/
import {Stock} from "../../../../@types/@stock";

export const TabFinResult = () => {

    const dispatch = useDispatch();
    const { activePortfolioId } = useSelector((state: rootStateT) => state.portfolios);
    const {data: stockList, loading} = useSelector((state: rootStateT) => state.stocks);

    // Получаем список список ценых бумаг портфеля юзера когда выбран портфель
    useEffect(() => {
        if(!stockList && !loading && activePortfolioId){
            dispatch(getPortfolioStocks(activePortfolioId));
        }
    }, [activePortfolioId, stockList, loading, dispatch])

    const renderChart = (data: Array<Stock>) => {

        const hasData = ! data.length;

        if(hasData){
            return <Line
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                            datasets: [
                                {
                                    data: [65, 59, 80, 81, 56, 55, 40]
                                }
                            ]
                        }}
                    />
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
            {activePortfolioId && stockList ? renderChart(stockList) : <em> Choose portfolio </em>}
        </div>
    )
}