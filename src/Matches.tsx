import React, { Component } from 'react';

import { Match } from './LoggedIn'


type MatchProps = {
    matches: Match[]
    removeMatch: (remove: number) => void
    setMatches: (matches: Match[]) => void
}

export default class Matches extends Component<MatchProps, {}> {
    componentDidMount = async () => {
        try {
            let res = await fetch("/api/swipe/matches")
            if (res.status !== 200) {
                console.log(await res.text())
                return
            }
            let matches: Match[] = await res.json()
            this.props.setMatches(matches)
        } catch (err) {
            console.log(err)
        }
    }

    matchComp = (match: Match, i: number) => {
        return (
            <div key={i}>
                {match.name}<button onClick={() => this.removeMatch(match.name, i)}>unmatch</button>
            </div>
        )
    }

    removeMatch = async (username: string, i: number) => {
        try {
            let res = await fetch(`/api/swipe/match/${username}`, {method: 'DELETE'})
            if (res.status !== 200) {
                console.log(await res.text())
                return
            }
            this.props.removeMatch(i)
        } catch (err) {
            console.log(err)
        }
    }

    render = () => {
        return (
            <>
                <p>Matches: {this.props.matches.length}</p>
                { this.props.matches.map((match, i)=> this.matchComp(match, i))}
            </>
        )
    }
}