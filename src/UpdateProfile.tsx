import React, { useState } from 'react';
import { User } from './App'

export default function UpdateProfile(user: User) {
    let [newBio, setNewBio] = useState(user.bio)
    let [error, setError] = useState<string>()
    let [profilePic, setProfilePic] = useState<File>();

    const save = async () => {
        try {
            let res = await fetch('/api/user/manage/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({bio: newBio})
            })
            if (res.status === 200) {
                console.log('updated')
                setError(undefined)
            } else {
                setError(`failed to update bio:${await res.text()}`)

            }
        } catch (err) {
            console.error(err)
        }
    }

    const uploadProfilePicture = async () => {
        if (!profilePic) {
            return
        }
        try {
            const formdata = new FormData();
            formdata.append('file', profilePic)
            let res = await fetch('/api/user/manage/profile_pic', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                body: formdata
            })
            if (res.status === 200) {
                console.log('updated')
                setError(undefined)
            } else {
                setError(`failed to update profile pic: ${await res.text()}`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const updateProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        let f = e.target.files
        if (!f || f.length === 0) {
            return
        }
        setProfilePic(f[0])
    }

    return (
        <>
            { error && <p>{error}</p>}
            <button onClick={save}> Save </button>
            <p>bio: {newBio}</p>
            <textarea defaultValue={user.bio} onChange={e => setNewBio(e.target.value)}/><br/>
            <input type="file" onChange={updateProfilePic}></input><br/>
            <button onClick={uploadProfilePicture}>Upload picture</button>
        </>
    )
}
