import React, { useEffect } from 'react';

import { Match } from './LoggedIn'


type MatchProps = {
    matches: Match[]
    removeMatch: (remove: number) => void
    setMatches: (matches: Match[]) => void
}

export default function Matches(m: MatchProps) {
    const matchComp = (match: Match, i: number) => {
        return (
            <div key={i}>
                {match.name}<button onClick={() => removeMatch(match.name, i)}>unmatch</button>
            </div>
        )
    }

    const removeMatch = async (username: string, i: number) => {
        try {
            let res = await fetch(`/api/swipe/match/${username}`, {method: 'DELETE'})
            if (res.status !== 200) {
                console.log(await res.text())
                return
            }
            m.removeMatch(i)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const call = async () => {
            try {
                let res = await fetch("/api/match")
                if (res.status !== 200) {
                    console.log(await res.text())
                    return
                }
                let matches: Match[] = await res.json()
                m.setMatches(matches)
            } catch (err) {
                console.error(err)
            }
        }
        call()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <p>Matches: {m.matches.length}</p>
            { m.matches.map((match, i)=> matchComp(match, i))}
        </>
    )
}