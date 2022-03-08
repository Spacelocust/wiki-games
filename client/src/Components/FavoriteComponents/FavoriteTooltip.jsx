import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { isUndefined } from 'lodash';
import { FontAwesomeIcon as IconSetter } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

import { addFavorite, deleteFavorite } from '../../api/axiosBase';
import { useFirstEffect } from '../../Helpers/customHooks';
import AuthReducer from '../AuthComponents/Selector/UserSelector';
import ACTION from '../AuthComponents/Selector/UserAction';

function FavoriteTooltip({ item, type = 'teams', favoriteItem, children }) {
    const [user, setUser] = AuthReducer(ACTION.user);
    const [active, setActive] = useState(!isUndefined(favoriteItem));
    const onFavorite = async () => {
        let objType = type === 'teams' ? 'favoriteTeam' : 'favoriteLeague';
        try {
            const { data } = await (active ? addFavorite(item, type) : deleteFavorite(favoriteItem.id, type));
            setUser({
                ...user, [objType]:
                    active ? [...user[objType], data] : user[objType].filter(({ id }) => id !== data.id)
            });
        } catch (e) {
            console.error(e);
        }
    };

    useFirstEffect(() => {
        onFavorite();
    }, [active]);

    return <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 300 * 3 }}
        overlay={
            <Popover>
                <IconSetter icon={active ? fasStar : farStar} className="font-gold font-large"
                            onClick={() => setActive(!active)}/>
            </Popover>
        }
    >
        {children}
    </OverlayTrigger>;
}

export default FavoriteTooltip;
