// import {useEffect} from "react";
import {useSelector } from "react-redux";
// import { auth, database } from "../../../firebase";

/** APP COMPONENTS**/
// import { AppLoader } from "../../../components/AppLoader";
import { AppButton } from "../../../../components/UI/AppButton";

/** ACTIONS **/
// import { getPortfolios, addPortfolio } from "../../../store/actions/portfolios";
import portfolio from "../../../../assets/images/portfolio.png";

import "./styles.scss";

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

export const PortfolioCard = ({title, onPickPortfolio}) => {

    // const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.portfolios);

    console.log('data, loading', data, loading)

    const handleOverview = () => {
        console.log('handleOverview')
    };
    const handleEdit = () => {
        console.log('handleEdit')
    };
    const handleDelete = () => {
        console.log('handleDelete')
    }

    return (
        <div className="portfolio-card">
            <div className="portfolio-card__body" onClick={() => onPickPortfolio()}>
                <img src={portfolio} alt="portfolio" className="portfolio-card__pic"/>
                <p className="portfolio-card__title">{title}</p>
            </div>
            <div className="portfolio-card__actions">
                <div className="portfolio-card__btn">
                    <AppButton className="portfolio-card__btn" title="Overview" handlerClick={handleOverview}/>
                </div>
                <div className="portfolio-card__btn">
                    <AppButton title={<i className="fa fa-pencil" aria-hidden="true"/>} handlerClick={handleEdit}/>
                </div>
                <div className="portfolio-card__btn">
                    <AppButton title={<i className="fa fa-trash" aria-hidden="true"/>} handlerClick={handleDelete}/>
                </div>
            </div>
        </div>
    )
}