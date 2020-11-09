import React,  { Component } from "react";

type SearchUsersState = {
    toSearch: string,
    username: string,
    password: string,
    count: number
}

export default class SearchUsers extends Component<{}, SearchUsersState> {
    constructor(props: any) {
        super(props)
        this.state = {
            toSearch: '',
            username: '',
            password: '',
            count: 0
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
                let res = await fetch('/api/user/u/' +  this.state.toSearch)
                if (res.status === 200) {
                    this.setState(await res.json())
                } else {
                    this.setState({username: 'user not found'})
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    render = () => {
        return (
            <>
                <p>{this.state.username}</p>
                <input onChange={this.trackSearchReadiness}></input>
            </>
        )
    }
}