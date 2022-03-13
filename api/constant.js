export const IMG_GAMES = {
    'league-of-legends': 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/611518fbd07df4b03b875560_lol-logo.svg',
    'cs-go': 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77bf98c0b4fffd1babe_cs.svg',
    'dota-2': 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77b233695ba33b7dc2b_Dota.svg',
    ow: 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77bf98c0bacccd1babf_OW.svg',
    pubg: 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77ec5248e592f2dde3c_PUBG.svg',
    'r6-siege': 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77d6f6f3b4e767f9039_Rainbowsix.svg',
    rl: 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77dc0ef6d232f07c8a1_RocketLeague.svg',
    'cod-mw': 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77b9ea7031cfbed8df6_cod.svg',
    fifa: 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/5fcdf77b4adceb4f77327b92_Fifa.svg',
    valorant: 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/611518faf9a74f121aef0e25_valolo-logo.svg',
    kog: 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/60f1718fb471327a737c0eaf_king-of-glory.svg',
    'lol-wild-rift': 'https://uploads-ssl.webflow.com/5fc7600f1faee1304802d3e9/6166e33cf889591e3a7e83b3_wl-logo.svg',
}

export const DETAILS_GAMES = (game) => (
    {
        ow: { game: 'ow', target: 'heroes' },
        valorant: { game: 'valorant', target: 'agents' },
        'league-of-legends': { game: 'lol', target:'champions' },
        'dota-2': { game: 'dota2', target: 'heroes' },
    }[game]
)
