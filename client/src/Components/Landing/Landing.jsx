import React from 'react';
import { Col, Container, Figure, Row } from "react-bootstrap";
import { createUseStyles } from "react-jss";

function Landing() {
    const classes = useStyles();

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src="holder.js/171x180"
                        />
                        <Figure.Caption>
                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                        </Figure.Caption>
                    </Figure>
                </Col>
                <Col md={12} className='d-flex justify-content-end'>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src="holder.js/171x180"
                        />
                        <Figure.Caption>
                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                        </Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </Container>
    );
}

const useStyles = createUseStyles({
    container: {
        width: '100%',
    }
});

export default Landing;