import React, { useState, useEffect } from 'react'
import Messages from './Messages'
import User from './User'

export default function Chat() {

    const [user, setUser] = useState('')

    useEffect(() => { if (!user) { setUser(prompt('What is your name?', 'Enter Name')) } },
        console.log(user), [])


    return (
        <div>
            <User user={user}/>
            <Messages user={user} />
        </div>
    )
}
