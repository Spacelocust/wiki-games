import React from 'react';
import { toast } from 'react-toastify';

function Notif ({ message, type = 'success', position ='top-right'}) {
    return (() => toast[type](message, {
        position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }))();
}

export default Notif;
