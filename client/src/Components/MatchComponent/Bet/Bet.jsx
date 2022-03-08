import React, { useState } from 'react';
import { addBet } from '../../../api/axiosBase';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { isNull } from 'lodash';

import AuthReducer from '../../AuthComponents/Selector/UserSelector';
import ACTION from '../../AuthComponents/Selector/UserAction';
import empty from '../../../assets/images/empty/img-empty.jpg';

import { TokenHandler } from '../../../Helpers/errorsHandler';
import { Notif } from '../../../Helpers/customHooks';

function Bet({ match, callback }) {
    const { execute } = TokenHandler();
    const [user, setUser] = AuthReducer(ACTION.user);
    const [coins, setCoins] = useState(0);
    const [winners, setWinners] = useState(null);
    const [validBet, setValidBet] = useState(false);

    const onChangeCoins = (value) => {
        if (!isNaN(value))
            setCoins(value > user.coins ? user.coins : value < 0 ? 0 : value);
    };

    const onConfirmBet = async () => {
        try {
            const { data: bet } = await addBet({ choice: winners, match: match.id, coins });
            setUser({ ...user, coins: user.coins - coins, bet: [...user.bet, { ...bet }] });
            callback();
            Notif('Success: Paris enregistré', 'success', 'bottom-right');
        } catch ({ response }) {
            await execute(response, onValidBet);
        }
    };

    const onValidBet = () => {
        if (coins <= 0 || isNull(winners)) {
            Notif('Error: Veuillez saisir un montant et une équipe', 'error', 'bottom-right');
            return;
        }
        setValidBet(true);
    }

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
        <div className={`d-flex justify-content-${ !validBet ? 'end' : 'center' } mt-3`}>
            {validBet ? <>
                    <Button variant="danger" onClick={() => setValidBet(false)}>Annuler</Button>
                    <Button variant="info" className='text-white ms-1' onClick={() => onConfirmBet()}>Confirmer</Button>
                </> :
                <Button variant="success" onClick={() => onValidBet()}>Valider</Button>
            }
        </div>
    </div>;
}

export default Bet;
