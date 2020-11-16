import React,  { Component } from "react";
import { User } from "./App";

type SearchUsersState = {
    toSearch: string
    user?: User
    error?: string
    count: number
}

export default class SearchUsers extends Component<{}, SearchUsersState> {
    constructor(props: any) {
        super(props)
        this.state = {
            toSearch: '',
            user: undefined,
            error: undefined,
            count: 0,
        }
    }

    trackSearchReadiness = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({count: this.state.count + 1, toSearch: event.target.value})
        setTimeout(this.userSearch, 500)
    }

    userSearch = async () => {
        this.setState({count: this.state.count - 1})
        if (this.state.count === 0) {
            try {
                let res = await fetch(`/api/user/u/${this.state.toSearch}`)
                if (res.status === 200) {
                    this.setState({
                        user: await res.json(),
                        error: undefined
                    })
                } else {
                    this.setState({
                        user: undefined,
                        error: await res.text()
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    render = () => {
        return (
            <>
                { this.state.error && <p>{this.state.error}</p> }
                { this.state.user && <p>{this.state.user.username} {this.state.user.lat} {this.state.user.long}</p>}
                
                <input onChange={this.trackSearchReadiness}></input>
            </>
        )
    }
}