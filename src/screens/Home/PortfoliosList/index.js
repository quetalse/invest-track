import {Fragment, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, database } from "../../../firebase";

/** APP COMPONENTS**/
import { AppLoader } from "../../../components/AppLoader";

/** ACTIONS **/
import { getPortfolios, addPortfolio } from "../../../store/actions/portfolios";
import portfolio from "../../../assets/images/portfolio.png";

import "./styles.scss";

const PortfolioCard = ({title}) => {

    const dispatch = useDispatch();

    const addNewPortfolio = () => {
        let uid  = auth.currentUser.uid;

        dispatch(addPortfolio({uid, portfolio: {title: "Yaroslav"}}));
        // let some = database.ref('users/' + currentUserId).set({
        //     username: 'hi',
        //     email: '1111',
        //     profile_picture : "1122"
        // });

        // let ref = database.ref('portfolios/');
        // ref.set('Hello')
        //     .then(function() {
        //         return ref.once("value");
        //     })
        //     .then((snapshot) => {
        //         console.log('val', snapshot.val())
        //     })
        // ref.once("value")
        //     .then(function(snapshot) {
        //         // snapshot.forEach(function (childSnapshot) {
        //         //     let key = childSnapshot.key; // "ada"
        //         //     console.log('key', key)
        //         //     console.log('key', childSnapshot.val())
        //         //     // var key = snapshot.key; // "ada"
        //         //     // var childKey = snapshot.child("name/last").key; // "last"
        //         // });
        //
        //         console.log('key', snapshot.hasChildren())
        //     })


    }

    return (
        <div>
            <img width="220" src={portfolio} alt="portfolio"/>
            <p>{ title ||
            (
                <button
                    onClick={addNewPortfolio}
                > Добавить новый портфель</button>
            )
            }</p>
        </div>
    )
}

export const PortfoliosList = () => {

    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.portfolios);

    console.log('data, loading', data, loading)

    // Получаем список портфелей юзера если они не загружены и не загружаются
    useEffect(() => {
        if(!data || !loading){
            dispatch(getPortfolios());
        }
    }, [])

    const renderPortfolios = () => {

        const pickPortfolio = (id) => {
            console.log('выбран портфель', id)
        }

        if(data.length){
           return data.map(({title, id}) => (
               <li key={`${id}`} onClick={() => pickPortfolio(id)}>
                   <div className="portfolio-card">
                       <img className="portfolio-card__pic" width="220" src={portfolio} alt="portfolio"/>
                       <p className="portfolio-card__title" >{title}</p>
                   </div>
               </li>
           ))
        }else{
            return (
                <div className="home__portfolio-list">
                    Портфелей нет, добавить новый
                    <PortfolioCard/>
                </div>
            )
        }
    }

    return (
        // <Fragment>
        //     {loading && <AppLoader/>}
        //     {data && renderPortfolios()}
        // </Fragment>

        <div className="portfolios-list">
            <div className="portfolios-list__header">
                Список портфелей
            </div>
            <div className="portfolios-list__body card-body">
                <div className="portfolio-card">
                    <img src={portfolio} alt="portfolio" className="portfolio-card__pic"/>
                    <p className="portfolio-card__pic">Портфель №1</p>
                </div>
                <h5 className="card-title">Специальный заголовок</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Переход куда-нибудь</a>
            </div>
            <div className="card-footer text-muted">
                2 days ago
            </div>
        </div>
    )
}