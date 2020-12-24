import React,  { useState } from "react";

export default function LoginForm({update}: {update: () => Promise<void>}) {
    let [info, setInfo] = useState<string>()
    let [username, setUsername] = useState<string>()
    let [password, setPassword] = useState<string>()

    const tryLogin = async () => {
        try {
            let res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            if (res.status === 200) {
                update()
            } else {
                setInfo(await res.text())
            }
        
        } catch (err) {
            setInfo(err)
        }
    }

    const createAccount = async () => {
        try {
            let res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            if (res.status === 200) {
                update()
            } else {
                setInfo(await res.text())
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <p>Login</p>
            <p>{info}</p>
            <input onChange={change => setUsername(change.target.value)}></input><br/>
            <input type='password' onChange={change => setPassword(change.target.value)}></input><br/>
            <button onClick={tryLogin}>Login</button>
            <button onClick={createAccount}>Create Account</button><br/>
        </>
    )
}