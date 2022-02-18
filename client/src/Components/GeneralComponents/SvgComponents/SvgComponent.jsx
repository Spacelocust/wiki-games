export function CharmSwords(props) {
    return (
        <svg viewBox="0 0 16 16" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m2.75 9.25l1.5 2.5l2 1.5m-4.5 0l1 1m1.5-2.5l-1.5 1.5m3-1l8.5-8.5v-2h-2l-8.5 8.5"></path><path d="M10.25 12.25L8 10m2-2l2.25 2.25m1-1l-1.5 2.5l-2 1.5m4.5 0l-1 1m-1.5-2.5l1.5 1.5M6 8L1.75 3.75v-2h2L8 6"></path></g></svg>
    )
}

export function LucideCoins(props) {
    return (
        <svg viewBox="0 0 24 24" {...props}><g fill="none" stroke={props.color ? props.color : '#c0a748'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="8" cy="8" r="7" fill="#f7dd7e"></circle><path d="M19.5 9.94a7 7 0 1 1-9.56 9.56M7 6h1v4" fill="#f7dd7e"></path><path d="m17.3 14.3l.7.7l-2.8 2.8" fill="#f7dd7e"></path></g></svg>
    )
}
