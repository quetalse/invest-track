import {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { auth, database } from "../../firebase";

/** APP COMPONENTS**/
import { AppForm } from "../../components/AppForm";
import { AppList } from "../../components/AppList";
import { AppLoader } from "../../components/AppLoader";

/** ACTIONS **/
import { getAll, remove } from "../../store/actions/stocks";

import "./styles.scss";

import portfolio from "../../assets/images/portfolio.png";
// assets
const AppPortfolioCard = ({title}) => {

    const addNewPortfolio = () => {
        let currentUserId  = auth.currentUser.uid;

       // let some = database.ref('users/' + currentUserId).set({
       //     username: 'hi',
       //     email: '1111',
       //     profile_picture : "1122"
       // });

        let ref = database.ref('portfolios/');
        ref.set('Hello')
            .then(function() {
                return ref.once("value");
            })
            .then((snapshot) => {
                console.log('val', snapshot.val())
            })
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

export const Home = () => {

    const dispatch = useDispatch();
    const {data, loading} = useSelector(state => state.stocks);
    const [portfolios, setPortfolios] = useState([])

    const getAllStocks = () => dispatch(getAll());
    const removeStock = id => dispatch(remove(id));

    useEffect(() => {
        getAllStocks()
        // eslint-disable-next-line
    }, []);



    const StockList = () => (
        <div className="home__list">
            {loading ? <AppLoader className="app-loader-light"/> : <AppList listData={data} onRemove={removeStock}/>}
        </div>
    )

    const PortfoliosList = () => {
        if(portfolios.length){

        }else{
            return (
                <div className="home__portfolio-list">
                    Портфелей нет, добавить новый
                    <AppPortfolioCard/>
                </div>
            )
        }
    }

    return (
        <section className="home">
            <h1 className="home__title">Add new item (ETFs, stocks, bonds, etc). to portfolio</h1>
            <AppForm className="home__form"/>
            <StockList/>
            <PortfoliosList/>
        </section>
    )
}