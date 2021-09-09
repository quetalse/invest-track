import { useState } from 'react';
import { useDispatch } from "react-redux";

import { show } from "../store/actions/alert";
//@ts-ignore
import { add } from "../store/actions/stocks";

type PropsT = {
    className: string
}

export const AppForm: React.FC<PropsT> = ({className}) => {

    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('');
    // const {data, loading} = useSelector(state => state.stock);

    const showAlert = (text: string, status?: string) => dispatch(show(text, status));
    const addStock = (title: string) => dispatch(add(title));

    const submitHandler: React.FormEventHandler<HTMLFormElement> = ((event) => {
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
    })

    return (
        <form
            className={`${className}`}
            onSubmit={submitHandler}>
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