import React, { Component } from 'react';
import SearchUsers from './SearchUsers';
import Unswiped from './Unswiped';
import Location from './Location';
import Matches from './Matches';

export type Match = {
    name: string
}

type LoggedInState = {
    matches: Match[]
}

type LoggedInProps = {
    username: string,
    logOut: (click: void) => void
}

export default class LoggedIn extends Component<LoggedInProps, LoggedInState> {
    constructor(props: LoggedInProps) {
        super(props)
        this.state = {
            matches: []
        }
    }

    setMatches = (matches: Match[]) => {
        this.setState({matches})
    }

    removeMatch = (i: number) => {
        let before = this.state.matches.slice(0, i)
        let after = this.state.matches.slice(i + 1)
        let allMatches = before.concat(after)
        this.setState({matches: allMatches})
    }

    render = () => {
        return (
            <>
                <p>{this.props.username}</p>
                <button onClick={() => this.props.logOut()}>Logout</button><br/>
                <SearchUsers/><br/>
                <Location/><br/>
                <Unswiped/><br/>
                <Matches matches={this.state.matches} setMatches={this.setMatches} removeMatch={this.removeMatch}/>
            </>
        )
    }
}