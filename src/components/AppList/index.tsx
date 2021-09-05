import { TransitionGroup, CSSTransition } from "react-transition-group";

/** TYPES **/
import {Stock} from "../../@types/@stock";

import "./styles.scss";

type PropsT = {
    listData: Array<Stock>
    onRemove: (id: string) => void
}

export const AppList: React.FC<PropsT> = ({listData, onRemove}) => {
    return (
        //@ts-ignore
        <TransitionGroup component="ul" className="app-list">
                {listData.length > 0 && listData.map(stock => (
                    <CSSTransition
                        key={`${stock.id}`}
                        classNames={'app-list__item'}
                        timeout={800}
                    >
                        <li className="app-list__item">
                            <div>
                                <strong className="app-list__title">{stock.title}</strong>
                                <small>{stock.date}</small>
                            </div>
                            <button
                                type="button"
                                className="app-list__button"
                                onClick={() => { if(stock.id) onRemove(stock.id)}}
                            >&times;
                            </button>
                        </li>
                    </CSSTransition>
                ))}
        </TransitionGroup>
    )
}