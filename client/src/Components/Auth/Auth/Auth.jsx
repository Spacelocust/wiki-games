import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { Form, Container, Button } from 'react-bootstrap';

import { setUser } from '../Selector/AuthSelector';

function Auth() {
    const [newUser, setNewUser] = useRecoilState(setUser);
    const [user, createUser] = useState({ name: '' });

    useEffect(() => {
        console.log(newUser);
    }, []);

    const createNewUser = (value) => {
        createUser({ ...user, name: value });
    }

    return (
        <Container>
            <div>Auth</div>
            <div>current user: { newUser.name }</div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="create user" onInput={(e) => createNewUser(e.target.value)}/>
            </Form.Group>
            <Button onClick={() => setNewUser(user)}>Add</Button>
        </Container>
    );
}

export default Auth;