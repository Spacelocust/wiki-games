import React, { useCallback } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

import LoaderGif from '../../LoaderComponents/LoaderGif';
import coinsFilp from '../../../assets/images/gif/coins-flip.gif';
import amumuSad from '../../../assets/images/gif/amumu-sad.gif';
import blitz from '../../../assets/images/blitz.png';

const BetModalResult = () => {
    const MySwal = withReactContent(Swal);
    const modalExecute = useCallback((coins) => {
        MySwal.fire({
            title: <p>Hello World</p>,
            footer: 'Copyright 2022',
            didOpen: () => {
                MySwal.clickConfirm();
            }
        }).then(() => {
            return MySwal.fire(<div>
                <p>{coins === 0 ? 'Paris nuls' : coins > 0 ? 'Paris gagnants' : 'Paris perdants' }</p>
                {coins !== 0 ? <LoaderGif img={coins > 0 ? coinsFilp : amumuSad} text="unset"/> :
                    <img src={blitz} alt="" style={{ height: '50%', width: '50%' }}/>
                }
                <p>{coins} coins</p>
            </div>);
        });

        coins > 0 && (() => {
            confetti({ ...configConfetti, origin: { x: 0.05, y: 550 / window.innerHeight } });
            confetti({ ...configConfetti, angle: 120, origin: { x: 0.95, y: 550 / window.innerHeight } });
        })();
    }, []);

    return [modalExecute];
};

const configConfetti = {
    disableForReducedMotion: true,
    angle: 60,
    particleCount: 50,
    zIndex: 9999,
    spread: 55
};

export default BetModalResult;
