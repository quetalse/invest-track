// import {useDispatch} from "react";
import { useDispatch } from "react-redux";
// import { auth, database } from "../../../firebase";

/** APP COMPONENTS**/
// import { AppLoader } from "../../../components/AppLoader";
import { AppButton } from "../../../../components/UI/AppButton";

/** ACTIONS **/
// import { getPortfolios, addPortfolio } from "../../../store/actions/portfolios";

import portfolio from "../../../../assets/images/portfolio.png";

import "./styles.scss";
import {PortfolioModal} from "../PortfolioModal";
import {useState} from "react";
import {deletePortfolio, setActivePortfolio} from "../../../../store/actions/portfolios";

type PropsT = {
    title: string
    portfolioId: string
}

type ShowModalT = {
    show: boolean,
    action: string,
    title: string,
    portfolioId: string
}

export const PortfolioCard: React.FC<PropsT> = ({title, portfolioId}) => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<ShowModalT>({} as ShowModalT);

    const handleOverview = () => {
        dispatch(setActivePortfolio(portfolioId));
    };

    const handleEdit = () => {
        setShowModal({
            show: true,
            action: 'edit',
            title: title,
            portfolioId
        });
    };
    const handleDelete = () => {
        dispatch(deletePortfolio(portfolioId))
    }

    return (
        <div className="portfolio-card">
            <div className="portfolio-card__body" onClick={handleOverview}>
                <img src={portfolio} alt="portfolio" className="portfolio-card__pic"/>
                <p className="portfolio-card__title">{title}</p>
            </div>
            <div className="portfolio-card__actions">
                <div className="portfolio-card__btn">
                    <AppButton className="portfolio-card__btn" modifier='' title="Overview" handlerClick={handleOverview}/>
                </div>
                <div className="portfolio-card__btn">
                    <AppButton title={(<i className="fa fa-pencil" aria-hidden="true"/>)} handlerClick={handleEdit}/>
                </div>
                <div className="portfolio-card__btn">
                    <AppButton title={<i className="fa fa-trash" aria-hidden="true"/>} handlerClick={handleDelete}/>
                </div>
            </div>
            <PortfolioModal showModal={showModal} closeModal={ () => setShowModal({
                show: false,
                action: '',
                title: title,
                portfolioId
            })}/>
        </div>
    )
}