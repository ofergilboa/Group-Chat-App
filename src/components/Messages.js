import React, { useState, setState } from 'react'
import Message from './Message'
const moment = require('moment')
require('moment/locale/en-il')
moment.locale('en-il')

const Ably = require('ably')


let ably = new Ably.Realtime('Pns68A.YZZ_rg:7kRIzyMgEs_ZtiQL');
ably.connection.on('connected', function () {
    console.log("you're now connected to Ably in realtime");
});



export default function Messages(props) {
    
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    let channel = ably.channels.get('quickstart');
    channel.subscribe('oferChatApp', function (message) {
        setMessages([...messages, {
            text: message.data[0],
            user: message.data[1],
            date: moment().format('l'),
            time: moment().format('LTS'),
        }])
    });

    const onChange = (event) => {
        setMessage(event.target.value)
    }

    const onSend = () => {
        let messageA = [ message, props.user ]
        channel.publish('oferChatApp', messageA);
        setMessage('')
    }

    return (
        <div>
            <div>
                {messages[0] ?
                    messages.map((m, key) => <Message text={m.text} time={m.time} key={key} sender={m.user} user={props.user} />)
                    : 'no messages yet'}
            </div>
            <div>
                <input placeholder='Write your message here' value={message} onChange={onChange} />
                <button onClick={onSend}>send</button>
            </div>
        </div>
    )
}
