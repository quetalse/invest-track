import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles.scss";


export const AppList = ({listData, onRemove}) => {
    return (
        <TransitionGroup component="ul" className="app-list">
                {listData.map( stock => (
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
                                onClick={() => onRemove(stock.id)}
                            >&times;
                            </button>
                        </li>
                    </CSSTransition>
                ))}
        </TransitionGroup>
    )
}