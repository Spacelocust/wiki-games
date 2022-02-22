import React from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";

function OffcanvasMenu({ show, closeCallback, variants = '#171717', position = 'start', children }) {
    return (
        <Offcanvas show={show} onHide={closeCallback} placement={position} scroll style={{ paddingTop: '3.5rem', backgroundColor: variants }}>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OffcanvasMenu;
