
import "./styles.scss";

export const AppLoader = ({modifier}) => {

    return (
        <span className={`app-loader ${modifier || ''}`} role="status">
            <span className="sr-only">Loading...</span>
        </span>
    )
}