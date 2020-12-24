import React, { useState } from 'react';
import styles from './Location.module.css'

export default function Location() {
    let [status, setStatus] = useState<string>()
    let [lat, setLat] = useState<number>()
    let [long, setLong] = useState<number>()

    const checkLocation = () => {
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
                        setStatus('location updated')
                        setLat(pos.coords.latitude)
                        setLong(pos.coords.longitude)
                    } else {
                        setStatus('error setting location')
                    }
                } catch (err) {
                    setStatus(err)
                }
            },
            err => setStatus(err.message),
            {
                timeout: 5000,
                enableHighAccuracy: true,
                maximumAge: 0,
            }
        )
    }

    return (
        <div className={styles.body}>
            {status && <p>{status}</p>}
            {lat && <><p> Lat: {lat} Long: {long}</p><br/></> }
            <button onClick={checkLocation}>Check Location</button>
        </div>
    )
}