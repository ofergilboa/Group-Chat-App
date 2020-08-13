import React from 'react'



export default function Message(props) {

    let mine = props.user == props.sender ? true : false

    return (
        <div className={mine ? 'myMessages' : 'othersMessages'}>
            <div>
                {props.text}
            </div>
            <div>
                {props.time}, {props.sender}
            </div>
        </div >
    )
}
