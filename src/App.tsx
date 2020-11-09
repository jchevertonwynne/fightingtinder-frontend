import React, { Component } from 'react';
import Location from './Location';
import LoginForm from './Login';
import SearchUsers from './SearchUsers';
import Unswiped from './Unswiped';

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
                { this.state.username && <p>{this.state.username}</p>}
                { this.state.username && <><button onClick={this.logout}>Logout</button><br/><SearchUsers/><br/><Location/><Unswiped/></>}
                { !this.state.username && <LoginForm update={this.checkStatus}/>}
            </>
        )
    }
}
