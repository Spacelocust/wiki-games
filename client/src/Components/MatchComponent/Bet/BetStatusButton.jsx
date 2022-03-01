import React from 'react';
import { LucideCoins } from '../../GeneralComponents/SvgComponent/SvgComponent';
import Button from 'react-bootstrap/Button';

function BetStatusButton({ result, status }) {
    const buttonStatus = {
        'canceled': { variant: 'danger', label: 'annulé' },
        'finished': result ? { variant: 'info', label: 'annulé' } : { variant: 'danger', label: 'Perdu' },
        'running': { variant: 'warning', label: 'en cours' },
        'not_started': <Button variant="info">Récuperer coins ! <LucideCoins height="18px"/></Button>
    }[status];
    return {
        'canceled': <Button variant="info">Récuperer coins ! <LucideCoins height="18px"/></Button>,
        'finished': <Button variant="info">Récuperer coins ! <LucideCoins height="18px"/></Button>,
        'postponed': <Button variant="info">Récuperer coins ! <LucideCoins height="18px"/></Button>,
        'running': <Button variant="info">Récuperer coins ! <LucideCoins height="18px"/></Button>,
        'not_started': <Button variant="info">Récuperer coins ! <LucideCoins height="18px"/></Button>
    }[status];
}

export default BetStatusButton;
