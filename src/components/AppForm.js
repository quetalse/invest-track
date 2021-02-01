import { useState, useContext } from 'react';
import {useDispatch, useSelector} from "react-redux";

import { show } from "../store/actions/alert";
import { add } from "../store/actions/stocks";

export const AppForm = () => {

    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    // const {data, loading} = useSelector(state => state.stock);

    const showAlert = (text, status) => show(dispatch)(text, status);
    const addStock = title => add(dispatch)(title);

    const submitHandler = event => {
        event.preventDefault();

        if (value.trim()){
            addStock(value.trim())
            .then(() => {
                showAlert('stock added', 'success');
            }).catch(() => {
                showAlert('error stock added', 'success');
            }).finally(() => {
                setValue('')
            })
        }else{
            showAlert('Insert ticker or title stock', 'warning');
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="insert ticker"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
}