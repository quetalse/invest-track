import { useState, useContext } from 'react';
import { AlertContext } from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const AppForm = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext);

    const submitHandler = event => {
        event.preventDefault();

        if (value.trim()){
            firebase.addStock(value.trim())
            .then(() => {
                alert.show('stock added', 'success');
            }).catch(() => {
                alert.show('error stock added', 'success');
            }).finally(() => {
                setValue('')
            })
        }else{
            alert.show('Insert ticker or title stock')
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