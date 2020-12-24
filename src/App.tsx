import React, { useState, useEffect } from 'react';
import LoggedIn from './LoggedIn';
import LoginForm from './Login';
import styles from './App.module.css'

export type User = {
    username: string,
    lat: number,
    long: number,
    bio: string,
}

export default function App() {
    let [user, setUser] = useState<User>()

    const logout = async () => {
        try {
            await fetch("/api/user/logout")
            setUser(undefined)
        } catch (err) {
            console.error(err)
        }
    }

    const checkStatus = async () => {
        try {
            let res = await fetch("/api/user/manage/li")
            if (res.status === 200) {
                setUser(await res.json())
            } else {
                console.log(await res.text())
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        checkStatus()
    }, [])

    return (
        <div className={styles.body}>
            { user 
                ? <LoggedIn user={user} logOut={logout}/>
                : <LoginForm  update={checkStatus}/>}
        </div>
    )
}
