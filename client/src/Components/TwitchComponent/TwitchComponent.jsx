import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy';

function TwitchComponent({ match, show, onHide }) {
    return (
    <Modal
        show={show}
        onHide={() => onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title className='font-secular'>
                { match.name }
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ReactPlayer url={match.streams.english.raw_url} controls playing className='w-100'/>
        </Modal.Body>
    </Modal>
    );
}

export default TwitchComponent;
