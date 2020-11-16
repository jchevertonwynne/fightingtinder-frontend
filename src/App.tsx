import React, { Component } from 'react';
import LoggedIn from './LoggedIn';
import LoginForm from './Login';
import styles from './App.module.css'

export type User = {
    username: string,
    lat: number,
    long: number,
    bio: string,
}

type AppState = {
    user?: User
}

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            user: undefined
        }
    }

    componentDidMount = () => {
        this.checkStatus()
    }

    checkStatus = async () => {
        try {
            let res = await fetch("/api/user/manage/li")
            if (res.status === 200) {
                this.setState({user: await res.json()})
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
            this.setState({user: undefined})
        } catch (err) {
            console.log(err)
        }
    }

    render = () => {
        return (
            <div className={styles.body}>
                { this.state.user 
                    ? <LoggedIn user={this.state.user} logOut={this.logout}/>
                    : <LoginForm update={this.checkStatus}/>}
            </div>
        )
    }
}
