import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

/** TYPES **/
import {rootStateT} from "../../store/reducers";

/** ACTIONS **/
import { hide } from "../../store/actions/alert";

import "./styles.scss";


export const AppAlert: React.FC = () => {

    const dispatch = useDispatch();
    const alert = useSelector((state: rootStateT) => state.alert)
    const hideAlert = () => dispatch(hide())

    return (
        <CSSTransition
            in={alert.visible}
            timeout={750}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
        >
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
                <strong>Warning!</strong>
                &nbsp; {alert.text}
                <button onClick={hideAlert} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>
    )
}