import React, { useEffect, useRef, useState } from 'react';
import "ninja-keys";
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

import AuthReducer from '../AuthComponents/Selector/UserSelector';
import ACTION from '../AuthComponents/Selector/UserAction';
import API from '../../api/axiosBase';

function HotKeys() {
    const [user] = AuthReducer(ACTION.getUser);
    const ninjaKeys = useRef(null);
    const navigate = useNavigate();
    const redirect = (path) => {ninjaKeys.current.close();navigate(path)}
    let hotkeys = [
        {
            id: "Home",
            title: "Accueil",
            hotkey: "ctrl+shift+m",
            mdIcon: "home",
            handler: () => redirect('/')
        },
        {
            id: "Games",
            title: "Les jeux",
            hotkey: "ctrl+j",
            keywords: 'gm',
            mdIcon: "sports_esports",
            handler: () => redirect('/games'),
        }
    ];

    useEffect(() => {
        if (ninjaKeys.current) {
            (async () => {
                try {
                    const { data: games } = await API.get('/games')
                    hotkeys = [...hotkeys, ...games.map(({ id, slug, name, img_url }) => ({
                        id: slug,
                        title: name,
                        icon: `<img class="ninja-icon" src='${img_url}' alt='${img_url}' style="height: 2rem"/>`,
                        handler: () => redirect(`/games/${id}`)
                    })).reverse()];
                    if(!isEmpty(user)) {
                        hotkeys.splice(2, 0, {
                            id: "Bets",
                            title: "Mes paris",
                            hotkey: "ctrl+shift+b",
                            keywords: 'paris',
                            mdIcon: "toc",
                            handler: () => redirect('/my-match-bet'),
                        })
                        hotkeys.splice(3, 0, {
                            id: "Teams",
                            title: "Equipes favorites",
                            hotkey: "ctrl+shift+t",
                            keywords: 'teams',
                            mdIcon: "groups",
                            handler: () => redirect('/teams'),
                        })
                    }

                    ninjaKeys.current.data = hotkeys;
                } catch (e) {
                }
            })();
        }
    }, [user]);

    return <ninja-keys placeholder="Taper une commande ou rechercher..." ref={ninjaKeys}></ninja-keys>;
}

export default HotKeys;
