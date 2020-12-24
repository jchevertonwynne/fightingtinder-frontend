import React, { useState } from 'react'
import Unswiped from './Unswiped'
import Location from './Location'
import Matches from './Matches'
import UpdateProfile from './UpdateProfile'
import styles from './LoggedIn.module.css'
import { User } from './App'

export type Match = {
    name: string
}

type LoggedInProps = {
    user: User,
    logOut: (click: void) => void
}

export default function LoggedIn(l: LoggedInProps) {
    let [matches, setMatches] = useState<Array<Match>>([])

    const removeMatch = (i: number) => {
        let before = matches.slice(0, i)
        let after = matches.slice(i + 1)
        let allMatches = before.concat(after)
        setMatches(allMatches)
    }

    return (
        <div className={styles.body}>
            <p>{l.user.username}</p>
            <button onClick={() => l.logOut()}>Logout</button><br/>
            <Location/><br/>
            <Unswiped/><br/>
            <Matches matches={matches} setMatches={(m) => setMatches(m)} removeMatch={removeMatch}/><br/>
            <UpdateProfile {...l.user}/>
        </div>
    )
}