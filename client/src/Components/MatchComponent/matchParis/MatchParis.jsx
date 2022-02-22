import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { AuthCoins } from '../../AuthComponents/Selector/AuthSelector';

function MatchParis(props) {
    const [userCoins, setUserCoins] = useRecoilState(AuthCoins);
    const [coins, setCoins] = useState(0);
    const onChangeCoins = (value) => {
        if (!isNaN(value))
            setCoins(value > 100 ? userCoins : value < 0 ? 0 : value);
    };
    
    return <div>
        <div className="d-flex">
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="button-addon2"
                        onClick={() => onChangeCoins(coins > 0 ? coins - 1 : 0)}>
                    -
                </Button>
                <FormControl
                    placeholder="Recipient's username"
                    className="text-center"
                    value={coins.toString()}
                    onInput={({ target }) => onChangeCoins(parseInt(target.value))}
                />
                <Button variant="outline-secondary" id="button-addon2"
                        onClick={() => onChangeCoins(coins < userCoins ? coins + 1 : userCoins)}>
                    +
                </Button>
            </InputGroup>
        </div>
        <Button variant="success">valider</Button>
    </div>;
}

export default MatchParis;
