import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { listGames } from '../../GamesComponents/Selector/GamesSelector';
import axios from 'axios';

import NavMenuLink from './NavMenuLink';
import WrapperSize from '../../GeneralComponents/Wrappers/WrapperSize';

function NavMenu() {
    const [currentListGames, setCurrentListGames] = useRecoilState(listGames);
    const games = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/games');
            setTimeout(() => {
                setCurrentListGames(data);
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        games();
    }, []);

    return (
        <div>
            <ul>
                <NavMenuLink colorHover="#ee7752" text="Accueil" to="/"/>
                <NavMenuLink colorHover="#e73c7e" text="Jeux" to="/games">
                    <WrapperSize>
                        {
                            currentListGames ? [...currentListGames].reverse().map((game) => (
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
