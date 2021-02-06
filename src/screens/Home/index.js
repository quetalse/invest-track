import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

/** APP COMPONENTS**/
import { AppForm } from "../../components/AppForm";
import { AppList } from "../../components/AppList";
import { AppLoader } from "../../components/AppLoader";

/** ACTIONS **/
import { getAll, remove } from "../../store/actions/stocks";

export const Home = () => {

    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.stocks);

    const getAllStocks = () => dispatch(getAll());
    const removeStock = id => dispatch(remove(id));

    useEffect(() => {
        getAllStocks()
        // eslint-disable-next-line
    }, []);


    return (
        <Fragment>
            <AppForm/>
            <hr/>
            {loading ? <AppLoader/> : <AppList listData={data} onRemove={removeStock}/>}
        </Fragment>
    )
}