import {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
// import { auth, database } from "../../../firebase";

/** APP COMPONENTS**/
// import { AppLoader } from "../../../components/AppLoader";

/** ACTIONS **/
import { addPortfolio } from "../../../../store/actions/portfolios";
import { editPortfolio } from "../../../../store/actions/portfolios";

import './style.scss';

import portfolio from "../../../../assets/images/portfolio.png";

type PropsT = {
    showModal: ShowModalT
    closeModal: () => void
}

type ShowModalT = {
    show: boolean,
    action: string,
    title: string,
    portfolioId: string
}

export const PortfolioModal: React.FC<PropsT> = ({showModal, closeModal}) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('')

    useEffect(() => {
        if(showModal.action === 'edit') setTitle(showModal.title);
    }, [showModal])

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const handleAddPortfolio = () => {

        if(title.trim()){
            if(showModal.action === 'edit'){
                dispatch(editPortfolio({
                    id: showModal.portfolioId,
                    title
                }));
            }else{
                dispatch(addPortfolio({
                    id: showModal.portfolioId,
                    title
                }))
            }
            closeModal();
        }else {
            console.log('Too short')
        }
    }

    return (
        <>
            <Modal
                show={showModal.show}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> {showModal.action === 'edit' ? 'Edit title' : 'Add new'} investment portfolio</Modal.Title>
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
                    <button className="app-button" onClick={handleAddPortfolio}>{showModal.action === 'edit' ? 'Edit' : 'Add'}</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}