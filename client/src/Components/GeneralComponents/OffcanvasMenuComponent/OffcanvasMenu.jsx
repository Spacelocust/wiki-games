import React from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";

function OffcanvasMenu({ show, closeCallback, variants = 'bg-dark', position = 'start', children }) {
    return (
        <Offcanvas className={variants} show={show} onHide={closeCallback} placement={position} scroll style={{ paddingTop: '3.5rem' }}>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OffcanvasMenu;