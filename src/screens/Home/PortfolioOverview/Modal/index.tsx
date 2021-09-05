import {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
// import { auth, database } from "../../../firebase";

/** APP COMPONENTS**/

/** ACTIONS **/
import { addPortfolioStockAC } from "../../../../store/actions/stocks";
// import { editPortfolio } from "../../../../store/actions/portfolios";

import './style.scss';

import portfolio from "../../../../assets/images/portfolio.png";

type PropsT = {
    showModal: {show: boolean}
    closeModal: () => void
}

export const StockModal: React.FC<PropsT> = ({showModal, closeModal}) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('')

    const handleChangeTitle:  React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setTitle(event.target.value)
    }

    const handleAddPortfolioStock = () => {

        if(title.trim()){
            dispatch(addPortfolioStockAC('11', {
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
                    <Modal.Title> Add stcok</Modal.Title>
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
                    <button className="app-button" onClick={handleAddPortfolioStock}>Add</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}