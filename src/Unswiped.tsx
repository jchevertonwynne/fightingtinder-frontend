import React, { useEffect, useState } from 'react';
import { User } from './App'
import styles from './Unswiped.module.css'

function status(response: Response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

export default function Unswiped() {
    let [users, setUsers] = useState<Array<User>>([])
    let [pic, setPic] = useState<string>()

    const unswipedUserCard = (user: User) => {
        if (!pic) {
            fetch(`/api/user/u/${user.username}`)
                .then(status)
                .then(res => res.blob())
                .then(res => setPic(URL.createObjectURL(res)))
                .catch(err => {
                    console.error(err)
                    setPic(undefined)
                })
        }

        return (
            <div className={styles.swipe}>
                <p>{user.username} {user.lat} {user.long}</p>
                <p>{user.bio ? user.bio : "no bio"}</p>
                <img alt="other user pic" src={pic} width="500px" /><br/>
                <button onClick={() => registerSwipe(user.username, false)}>would not fight</button>
                <button onClick={() => registerSwipe(user.username, true)}>would fight</button>
            </div>
        )
    }

    const registerSwipe = async (swiped: string, status: boolean) => {
        setPic(undefined)
        try {
            let res = await fetch('/api/swipe', {
                method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({swiped, status})
            })
            if (res.status === 200) {
                let newUsers = users.slice(1)
                setUsers(newUsers)
            } else {
                console.log(await res.text())
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const call = async () => {
            try {
                let res = await fetch('/api/swipe/available')
                if (res.status !== 200) {
                    console.log(await res.text())
                    return
                }
                setUsers(await res.json())
            } catch (err) {
                console.error(err)
            }
        }
        call()
    }, [])

    return (
        <div className={styles.body}>
            {users.length > 0 && unswipedUserCard(users[0])}
        </div>
    )
}