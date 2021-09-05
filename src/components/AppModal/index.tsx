import Modal from 'react-bootstrap/Modal';

type PropsT = {
    title: string
    showModal: {show: boolean}
    closeModal: () => void
}

export const AppModal: React.FC<PropsT> = ({title, showModal, closeModal}) => {
    return (
        <Modal
            show={showModal.show}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="portfolio-modal">

                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="app-button" onClick={() => console.log('clic')}>Click</button>
            </Modal.Footer>
        </Modal>
    );
}