import React, { Component } from 'react';

type UpdateProfileState = {
    bio: string,
}

export default class UpdateProfile extends Component<{}, UpdateProfileState> {
    constructor(props: any) {
        super(props)
        this.state = {
            bio: ''
        }
    }

    render = () => {
        return (
            <>
                <button> Save </button>
                <p>bio: {this.state.bio}</p>
                <textarea onChange={e => this.setState({bio: e.target.value})}/>
            </>
        )
    }
}