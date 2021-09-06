import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { auth, database } from "../../../firebase";

/** APP COMPONENTS**/
import { AppLoader } from "../../../components/AppLoader";

/** COMPONENTS **/
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioModal } from "./PortfolioModal";

/** ACTIONS **/
import { getPortfolios } from "../../../store/actions/portfolios";
// import { getPortfolioStocks } from "../../../store/actions/stocks";
// import portfolio from "../../../assets/images/portfolio.png";

import "./styles.scss";
import {rootStateT} from "../../../store/reducers";
import {Portfolio} from "../../../@types/@portfolio";

// const PortfolioCard = ({title}) => {
//
//     const dispatch = useDispatch();
//
//     const addNewPortfolio = () => {
//         let uid  = auth.currentUser.uid;
//
//         dispatch(addPortfolio({uid, portfolio: {title: "Yaroslav"}}));
//         // let some = database.ref('users/' + currentUserId).set({
//         //     username: 'hi',
//         //     email: '1111',
//         //     profile_picture : "1122"
//         // });
//
//         // let ref = database.ref('portfolios/');
//         // ref.set('Hello')
//         //     .then(function() {
//         //         return ref.once("value");
//         //     })
//         //     .then((snapshot) => {
//         //         console.log('val', snapshot.val())
//         //     })
//         // ref.once("value")
//         //     .then(function(snapshot) {
//         //         // snapshot.forEach(function (childSnapshot) {
//         //         //     let key = childSnapshot.key; // "ada"
//         //         //     console.log('key', key)
//         //         //     console.log('key', childSnapshot.val())
//         //         //     // var key = snapshot.key; // "ada"
//         //         //     // var childKey = snapshot.child("name/last").key; // "last"
//         //         // });
//         //
//         //         console.log('key', snapshot.hasChildren())
//         //     })
//
//
//     }
//
//     return (
//         <div>
//             <img width="220" src={portfolio} alt="portfolio"/>
//             <p>{ title ||
//             (
//                 <button
//                     onClick={addNewPortfolio}
//                 > Добавить новый портфель</button>
//             )
//             }</p>
//         </div>
//     )
// }

type ShowModalT = {
    show: boolean,
    action: string,
    title: string,
    portfolioId: string
}

export const PortfoliosList = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<ShowModalT>({
        show: false,
        action: '',
        title: '',
        portfolioId: ''
    });

    const {portfoliosData, loading} = useSelector((state: rootStateT) => state.portfolios);


    // Получаем список портфелей юзера если они не загружены и не загружаются
    useEffect(() => {
        if(!portfoliosData && !loading) dispatch(getPortfolios());
    }, [dispatch, portfoliosData, loading])

    const addPortfolio = () => {
        setShowModal({
            show: true,
            action: 'add',
            title: '',
            portfolioId: ''
        });
    }

    const renderPortfolios = (data: Portfolio[]) => {

        const haveData = !!data.length;

        return (
            <ul className={`portfolios-list__list ${haveData ? '' : 'portfolios-list__list--center'}`}>
                {haveData ? (
                    data.map(({title, id}) => (
                        <li className="portfolios-list__card" key={`${id}`}>
                            <PortfolioCard title={title} portfolioId={id}/>
                        </li>
                    ))
                ) : (
                    <div>
                        <span>No portfolios yet</span>
                        <div className="portfolios-list__add-btn">
                            <button type="button" className="app-button" onClick={addPortfolio}>Add new</button>
                        </div>
                    </div>
                )}
            </ul>
        )
    }

    return (
        <div className="portfolios-list">
            <div className="portfolios-list__header">
                <h4 className="portfolios-list__title">Investment portfolios list</h4>
                <div className="portfolios-list__add-btn">
                    <button type="button" className="app-button" onClick={addPortfolio}>+</button>
                </div>
            </div>
            <div className="portfolios-list__body">
                {loading && <AppLoader modifier={"app-loader_center"}/>}
                {portfoliosData && renderPortfolios(portfoliosData)}
            </div>
            <PortfolioModal showModal={showModal} closeModal={ () => setShowModal({
                show: false,
                action: '',
                title: '',
                portfolioId: ''
            })}/>
        </div>
    )
}