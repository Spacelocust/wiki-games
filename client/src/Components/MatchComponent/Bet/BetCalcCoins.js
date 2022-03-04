export const calcCoins = (matchs, bets) => {
    matchs.reduce((acc, curr) => curr.winner_id === bets,0)
}
