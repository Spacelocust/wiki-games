import React from 'react';
import { Modal } from 'react-bootstrap';

function TwitchComponent({ url, show, onHide }) {
    return (
    <Modal
        show={show}
        onHide={() => onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Small Modal
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <iframe
                src={url}
                height="300"
                width="40"
                allowFullScreen="true">
            </iframe>
        </Modal.Body>
    </Modal>
    );
}

export default TwitchComponent;
