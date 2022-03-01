import React, { useState } from 'react';
import { addBet } from '../../../api/axiosBase';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { isNull } from 'lodash';

import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import ACTION from '../../AuthComponents/Selector/UserAction';
import empty from '../../../assets/images/img-empty.jpg';
import { TokenHandler } from '../../../Helpers/errorsHandler';

function Bet({ match }) {
    //const { execute } = TokenHandler();
    const [user, setUser] = AuthReducer(ACTION.user);
    const [coins, setCoins] = useState(0);
    const [winners, setWinners] = useState(null);

    const onChangeCoins = (value) => {
        if (!isNaN(value))
            setCoins(value > 100 ? user.coins : value < 0 ? 0 : value);
    };

    const onValidBet = async () => {
        if(coins <= 0 || isNull(winners)) {
            console.log('nop')
            return;
        }
        try {
            const { data: bet } = await addBet( { choice: winners, match: match.id, coins });
            setUser({ ...user, coins: user.coins - coins, bet: [...user.bet, { ...bet }] });
            console.log(bet);
        } catch (e) {
            //await execute(e, addMatchBet( { choice: winners, match: match.id, coins: 200 }));
        }
    };

    const onChangeWinner = (value) => isNull(winners) ? setWinners(value) : setWinners(winners !== value ? value : null);


    return <div>
        <p className="m-0">Saisir une mise :</p>
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
                        onClick={() => onChangeCoins(coins < user.coins ? coins + 1 : user.coins)}>
                    +
                </Button>
            </InputGroup>
        </div>
        <p className="m-0">Choisir une équipe :</p>
        <div className="d-flex border rounded p-1">
            {match.opponents.map(({ opponent }) => (<div
                className={`d-flex align-items-center flex-column w-50 ${winners === opponent.id && 'border border-2 border-success rounded'}`}
                key={opponent.id}
                onClick={() => onChangeWinner(opponent.id)}>
                <img src={opponent.image_url || empty} alt="" style={{ height: '3rem', width: '3rem' }}/>
                <p className="text-center m-0">{opponent.acronym}</p>
            </div>))}
        </div>
        <div className="d-flex justify-content-end mt-3">
            <Button variant="success" onClick={() => onValidBet()}>valider</Button>
        </div>
    </div>;
}

export default Bet;
