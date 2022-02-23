import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import API from '../../../api/axiosBase';

import { listGames } from '../../GamesComponents/Selector/GamesSelector';
import NavMenuLink from './NavMenuLink';
import WrapperSize from '../../GeneralComponents/Wrappers/WrapperSize';
import { isEmpty } from 'lodash';

function NavMenu() {
    const [currentListGames, setCurrentListGames] = useRecoilState(listGames);

    useEffect(() => {
        const source = axios.CancelToken.source();
        (async () => {
            try {
                const { data } = await API.get('/games',{
                    cancelToken: source.token,
                });
                setTimeout(() => {
                    setCurrentListGames(data);
                }, 1000);
            } catch (e) {
                if (axios.isCancel(e)) {
                } else {
                    throw e
                }
            }
        })();

        return () => source.cancel()
    }, []);

    return (
        <div>
            <ul>
                <NavMenuLink colorHover="#ee7752" text="Accueil" to="/"/>
                <NavMenuLink colorHover="#e73c7e" text="Jeux" to="/games">
                    <WrapperSize>
                        {
                            !isEmpty(currentListGames) ? [...currentListGames].reverse().map((game) => (
                                <NavMenuLink key={game.id} colorHover="#23a6d5" text={game.name} img={game.img_url}
                                             to={`/games/${game.id}`}/>
                            )) : <li className="font-rainbow">Just wait it's magic time..</li>
                        }
                    </WrapperSize>
                </NavMenuLink>
                <NavMenuLink colorHover="#23a6d5" text="Matchs"/>
                <NavMenuLink colorHover="#23d5ab" text="Paris en cours">Paris en cours</NavMenuLink>
            </ul>
        </div>
    );
}

export default NavMenu;
