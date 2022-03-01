import { useCallback } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

import LoaderGif from '../../LoaderComponents/LoaderGif';
import coinsFilp from '../../../assets/images/coins-flip.gif';

const BetModalResult = () => {
    const MySwal = withReactContent(Swal)
    const modalExecute = useCallback(() => {
        MySwal.fire({
            title: <p>Hello World</p>,
            footer: 'Copyright 2018',
            didOpen: () => {
                MySwal.clickConfirm();
            }
        }).then(() => {
            return MySwal.fire(<div>
                <p>Vous avez gagné !</p>
                <LoaderGif img={coinsFilp} text='unset'/>
            </div>)
        });
        confetti({
            disableForReducedMotion: true,
            angle: 60,
            particleCount: 50,
            zIndex: 9999,
            spread: 55,
            origin: { x: 0.05, y: 550 / window.innerHeight }
        });
        confetti({
            disableForReducedMotion: true,
            angle: 120,
            particleCount: 50,
            zIndex: 9999,
            spread: 55,
            origin: { x: 0.95, y: 550 / window.innerHeight }
        });
    },[])

    return [modalExecute];
}

export default BetModalResult;
