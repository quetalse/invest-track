import "./styles.scss";

type PropsT = {
    modifier: string
}

export const AppLoader: React.FC<PropsT & React.HTMLAttributes<HTMLDivElement>> = ({modifier}) => {

    return (
        <span className={`app-loader ${modifier || ''}`} role="status">
            <span className="sr-only">Loading...</span>
        </span>
    )
}