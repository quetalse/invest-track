
import "./styles.scss";

export const AppLoader = ({modifier}) => {

    return (
    // <div className="text-center">
        <span className={`app-loader ${modifier}`} role="status">
            <span className="sr-only">Loading...</span>
        </span>
    // </div>
    )
}