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

    unswipedUserCard = (user: User, i: number) => {
        return (
            <div key={i}>
                <p>{i + 1}: {user.username}</p>
                <p>{user.latitude} {user.longitude}</p>
                <button onClick={() => this.registerSwipe(user.username, i, false)}>would not fight</button>
                <button onClick={() => this.registerSwipe(user.username, i, true)}>would fight</button>
            </div>
        )
    }

    registerSwipe = async (swiped: string, i: number, status: boolean) => {
        try {
            let res = await fetch('/api/swipe', {
                method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({swiped, status})
            })
            if (res.status === 200) {
                let before = this.state.users.slice(0, i)
                let after = this.state.users.slice(i + 1)
                let users = before.concat(after)
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
                {this.state.users.map((user, i) => this.unswipedUserCard(user, i))}
            </>
        )
    }
}