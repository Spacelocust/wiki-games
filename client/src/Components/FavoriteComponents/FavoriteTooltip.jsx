import React, { useEffect, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { isEmpty, isUndefined } from 'lodash';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

import { addFavorite, deleteFavorite } from '../../api/axiosBase';
import { Notif, useFirstEffect } from '../../Helpers/customHooks';
import AuthReducer from '../AuthComponents/Selector/UserSelector';
import ACTION from '../AuthComponents/Selector/UserAction';


function FavoriteTooltip({ item, children }) {
    const [user, setUser] = AuthReducer(ACTION.user);
    const [favTeam, setFavTeam] = useState(!isEmpty(user) && user.favoriteTeam.find(({ teamId }) => teamId === item));

    const onFavorite = async () => {
        try {
            const { data } = await (isUndefined(favTeam) ? addFavorite(item) : deleteFavorite(favTeam.id));
            setUser({
                ...user, favoriteTeam:
                    isUndefined(favTeam) ? [...user.favoriteTeam, data] : user.favoriteTeam.filter(({ id }) => id !== data.id)
            });
            isUndefined(favTeam) ? Notif(`l'équipe à été ajouté à vos favoris`) : Notif(`l'équipe à été retiré de vos favoris`);
        } catch (e) {
            console.error(e);
        }
    };

    useFirstEffect(() => {
        !isEmpty(user) && onFavorite();
    }, [favTeam]);


    return <>
        {!isEmpty(user) ? <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 300 * 3 }}
            overlay={
                <Popover>
                    <IconSetter icon={!isUndefined(favTeam) ? fasStar : farStar} className="font-gold font-large" onClick={() => onFavorite()}/>
                </Popover>
            }
        >
            {children}
        </OverlayTrigger>
            : children
        }
    </>;
}

export default FavoriteTooltip;
