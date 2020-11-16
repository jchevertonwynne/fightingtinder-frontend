import React, { Component } from 'react';
import styles from './Location.module.css'

type LocationState = {
    status: string,
    lat: number,
    long: number,
}

export default class Location extends Component<{}, LocationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            status: '',
            lat: 0,
            long: 0,
        }
    }

    checkLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async pos => {
                try {
                    let res = await fetch('/api/user/manage/location', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({lat: pos.coords.latitude, long: pos.coords.longitude})
                    })
                    if (res.status === 200) {
                        this.setState({status: 'location updated', lat: pos.coords.latitude, long: pos.coords.longitude})
                    } else {
                        this.setState({status: 'error setting location'})
                    }
                } catch (err) {
                    this.setState({status: err})
                }
            },
            err => this.setState({status: err.message}),
            {
                timeout: 5000,
                enableHighAccuracy: true,
                maximumAge: 0,
            }
        )
    }

    render = () => {
        return (
            <div className={styles.body}>
                {this.state.lat && <><p> Lat: {this.state.lat} Long: {this.state.long}</p><br/></> }
                <button onClick={this.checkLocation}>Check Location</button>
            </div>
        )
    }
}