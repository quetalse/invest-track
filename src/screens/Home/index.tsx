/** APP COMPONENTS **/
import { PortfoliosList } from "./PortfoliosList";
import { PortfolioOverview } from "./PortfolioOverview";

/** ACTIONS **/

import "./styles.scss";

export const Home = () => {

    // const dispatch = useDispatch();
    // const {data, loading} = useSelector(state => state.stocks);

    // const getAllStocks = () => dispatch(getAll());
    // const removeStock = id => dispatch(remove(id));

    // useEffect(() => {
    //     getAllStocks()
    //     // eslint-disable-next-line
    // }, []);

    // const StockList = () => (
    //     <div className="home__list">
    //         {loading ? <AppLoader className="app-loader-light"/> : <AppList listData={data} onRemove={removeStock}/>}
    //     </div>
    // )

    return (
        <section className="home">
            {/*<h1 className="home__title">Add new item (ETFs, stocks, bonds, etc). to portfolio</h1>*/}
            {/*<AppForm className="home__form"/>*/}
            {/*<StockList/>*/}
            <PortfoliosList/>
            <PortfolioOverview/>
        </section>
    )
}