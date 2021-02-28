import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from "react-redux";
// import { auth, database } from "../../../firebase";

/** APP COMPONENTS**/
// import { AppLoader } from "../../../components/AppLoader";

/** ACTIONS **/
import { addPortfolio } from "../../../../store/actions/portfolios";

import './style.scss';

import portfolio from "../../../../assets/images/portfolio.png";

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

export const PortfolioModal = ({showModal, closeModal}) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('')

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleAddPortfolio = () => {

        if(title.trim()){
            dispatch(addPortfolio({
                title
            }))
        }else {
            console.log('Too short')
        }
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new investment portfolio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="portfolio-modal">
                        <img className="portfolio-modal__pic" src={portfolio} alt="portfolio"/>
                        <input className="portfolio-modal__input" type="text"  id="exampleInputEmail1"
                               aria-describedby="portfolioTitle" placeholder="Enter title" onChange={handleChangeTitle} value={title}/>
                        <small id="portfolioTitle" className="">We'll never share your email with anyone else.</small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={closeModal}>*/}
                    {/*    Close*/}
                    {/*</Button>*/}
                    <button className="app-button" onClick={handleAddPortfolio}>Add</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}