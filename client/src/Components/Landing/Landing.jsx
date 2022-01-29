import React from 'react';
import { createUseStyles } from "react-jss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landing() {
    const classes = useStyles();

    return (
       <Container className={classes.parentContainer}>
           <div className='d-flex justify-content-center align-items-center'>
               <Link to='/home/games' className='btn btn-primary'>Games</Link>
               <Link to='/auth' className='btn btn-primary'>Connexion</Link>
           </div>
       </Container>
    );
}

const useStyles = createUseStyles({
    parentContainer: {
        height: '100vh!important',
        alignItems: 'center',
    }
});

export default Landing;