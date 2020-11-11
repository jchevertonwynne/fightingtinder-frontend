import React, { Component } from 'react';
import LoggedIn from './LoggedIn';
import LoginForm from './Login';

type AppState = {
    username: string,
}

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            username: '',
        }
    }

    componentDidMount = () => {
        this.checkStatus()
    }

    checkStatus = async () => {
        try {
            let res = await fetch("/api/user/manage/li")
            if (res.status === 200) {
                this.setState({username: await res.text()})
            } else {
                console.log(await res.text())
            }
        } catch (err) {
            console.log(err)
        }
    }

    logout = async () => {
        try {
            await fetch("/api/user/logout")
            this.setState({username: ''})
        } catch (err) {
            console.log(err)
        }
    }

    render = () => {
        return (
            <>
                { this.state.username && <LoggedIn username={this.state.username} logOut={this.logout}/>}
                { !this.state.username && <LoginForm update={this.checkStatus}/>}
            </>
        )
    }
}
