
import "./styles.scss";

export const AppLoader = ({className}) => {

    return (
    // <div className="text-center">
        <span className={`app-loader ${className}`} role="status">
            <span className="sr-only">Loading...</span>
        </span>
    // </div>
    )
}