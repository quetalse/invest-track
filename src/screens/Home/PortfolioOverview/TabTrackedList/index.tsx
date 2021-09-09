import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

/** APP COMPONENTS**/
import {AppLoader} from "../../../../components/AppLoader";
import {StockModal} from "../Modal";

/** SIDE COMPONENTS **/

/** ACTIONS **/
import {getPortfolioTrackedStocks} from "../../../../store/actions/trackedStocks";

/** TYPES **/
import {rootStateT} from "../../../../store/reducers";
import { Stock } from "../../../../@types/@stock";

export const TabTrackedList = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const { activePortfolioId } = useSelector((state: rootStateT) => state.portfolios);
    const {data: trackedStockList, loading} = useSelector((state: rootStateT) => state.trackedStocks);

    // Получаем список список ценых бумаг портфеля юзера когда выбран портфель
    useEffect(() => {
        if(!trackedStockList && !loading && activePortfolioId){
            dispatch(getPortfolioTrackedStocks(activePortfolioId));
        }
    }, [activePortfolioId, trackedStockList, loading, dispatch])

    const addStock = () => {
        setShowModal(true);
    }

    const renderTable = (data: Array<Stock>) => {

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
            <StockModal showModal={{show: showModal}} closeModal={ () => setShowModal(false)}/>
        </div>
    )
}