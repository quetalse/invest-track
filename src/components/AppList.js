import { TransitionGroup, CSSTransition } from "react-transition-group";

export const AppList = ({stocks, onRemove}) => {
    return (
        <TransitionGroup component="ul" className="list-group">
                {stocks.map( stock => (
                    <CSSTransition
                        key={`${stock.id}`}
                        classNames={'stock'}
                        timeout={800}
                    >
                        <li className="list-group-item stock">
                            <div>
                                <strong>{stock.title}</strong>
                                <small>{stock.date}</small>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => onRemove(stock.id)}
                            >&times;
                            </button>
                        </li>
                    </CSSTransition>
                ))}
        </TransitionGroup>
    )
}