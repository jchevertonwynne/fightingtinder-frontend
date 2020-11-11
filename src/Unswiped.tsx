import React, { Component } from 'react';

type User = {
    username: string,
    latitude: number,
    longitude: number,
}

type UnswipedState = {
    users: Array<User>
}

export default class Unswiped extends Component<{}, UnswipedState> {
    constructor(props: any) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount = async () => {
        try {
            let res = await fetch('/api/swipe/available')
            if (res.status !== 200) {
                console.log(await res.text())
                return
            }
            this.setState({users: await res.json()})
        } catch (err) {
            console.log(err)
        }
    }

    unswipedUserCard = (user: User) => {
        return (
            <>
                <p>{user.username}</p>
                <p>{user.latitude} {user.longitude}</p>
                <button onClick={() => this.registerSwipe(user.username, false)}>would not fight</button>
                <button onClick={() => this.registerSwipe(user.username, true)}>would fight</button>
            </>
        )
    }

    registerSwipe = async (swiped: string, status: boolean) => {
        try {
            let res = await fetch('/api/swipe', {
                method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({swiped, status})
            })
            if (res.status === 200) {
                let users = this.state.users.slice(1)
                this.setState({users})
            } else {
                console.log(await res.text())
            }
        } catch (err) {
            console.log(err)
        }
    }

    render = () => {
        return (
            <>
                {this.state.users.length > 0 && this.unswipedUserCard(this.state.users[0])}
            </>
        )
    }
}