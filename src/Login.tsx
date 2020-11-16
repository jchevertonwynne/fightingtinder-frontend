import React,  { Component } from "react";

type LoginProps = {
    update: () => void,
}

type LoginState = {
    info: string,
    username: string,
    password: string,
}

export default class LoginForm extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            info: '',
            username: '',
            password: ''
        }
    }

    tryLogin = async () => {
        try {
            let res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.state.username, password: this.state.password})
            })
            if (res.status === 200) {
                this.props.update()
            } else {
                this.setState({info: await res.text()})
            }
        
        } catch (err) {
            this.setState({info: err})
        }
    }

    createAccount = async () => {
        try {
            let res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.state.username, password: this.state.password})
            })
            if (res.status === 200) {
                this.props.update()
            } else {
                this.setState({info: await res.text()})
            }
        } catch (err) {
            console.log(err)
        }
    }

    render = () => {
        return (
            <>
                <p>Login</p>
                <p>{this.state.info}</p>
                <input onChange={change => this.setState({username: change.target.value})}></input><br/>
                <input type='password' onChange={change => this.setState({password: change.target.value})}></input><br/>
                <button onClick={this.tryLogin}>Login</button>
                <button onClick={this.createAccount}>Create Account</button><br/>
            </>
        )
    }
}