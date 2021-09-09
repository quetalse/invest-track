import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
/** SIDE COMPONENTS **/

/** APP COMPONENTS**/
import {AppLoader} from "../../../../components/AppLoader";

/** ACTIONS **/
import {getPortfolioStocks} from "../../../../store/actions/stocks";

/** TYPES **/
import {rootStateT} from "../../../../store/reducers";
import {Stock} from "../../../../@types/@stock";


export const TabStockList = () => {

    const dispatch = useDispatch();
    const { activePortfolioId } = useSelector((state: rootStateT) => state.portfolios);
    const { data: stockList, loading } = useSelector((state: rootStateT) => state.stocks);

    // Получаем список список ценых бумаг портфеля юзера когда выбран портфель
    useEffect(() => {
        if(!stockList && !loading && activePortfolioId){
            dispatch(getPortfolioStocks(activePortfolioId));
        }
    }, [activePortfolioId, stockList, loading, dispatch])

    const renderTable = (data: Array<Stock>) => {

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
            {activePortfolioId && stockList ? renderTable(stockList) : <em> Choose portfolio </em>}
        </div>
    )
}