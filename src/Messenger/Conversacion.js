import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useParams } from "react-router-dom"

function Conversacion() {
    const [msg, setMsg] = useState('')
    const [key, setKey] = useState(0)
    const [messages, setMessages] = useState([])
    const login = useSelector(s => s.login)
    const chat = useSelector(s => s.chat)
    console.log(chat)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('http://localhost:9999/messages-chats/chatmessages/' + chat, {
            headers: { 'Content-Type': 'application/json', 'Authorization': login ? login.token : '' },
            method: 'GET'
        })
            .then(res => res.json())
            .then(messages => {
                setMessages(messages)
            })
    }, [chat, key])

    let iAmSeller = false
    let interlocutor = ''

    if (messages.length !== 0 && login) {
        if (messages[0].id_seller === login.id) {
            iAmSeller = true
        }
        if (iAmSeller) {
            interlocutor = messages[0].buyer_name
        } else {
            interlocutor = messages[0].seller_name
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:9999/messages-chats/send/' + chat, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': login.token },
            body: JSON.stringify({ content: msg })
        })
        setMsg('')
        setKey(key + 1)
    }

    const handleRemove = (id) => {
        fetch('http://localhost:9999/messages-chat/deletemsg/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': login.token },
        })
        setKey(key + 1)
    }

    if (!login) {
        return <Redirect to="/" />
    }

    return (
        <main>
            {(messages.length !== 0) && (<div className="chatmessages">
                <div className="message-list">
                    <div className="message-list-inside">
                        <h3>{iAmSeller ? ('Mensajes sobre tu libro "' + messages[0].book_title + '-' + messages[0].course + '" :') : ('Mensajes sobre el libro "' + messages[0].book_title + '-' + messages[0].course + '" de ' + messages[0].seller_name + ' :')}</h3>
                        {messages.map(msg =>
                            <div key={msg.id} className="message" >
                                <span className="sender">[{login.id === msg.id_destination ? interlocutor : 'Tú'}]:</span>
                                <span className="content"> {msg.content}</span>
                                <span className="date"> {msg.date}</span>
                                <button onClick={() => handleRemove(msg.id)}>🗑</button>
                            </div>
                        )}
                    </div>
                </div>
                <form className="footer" onSubmit={handleSubmit}>
                    <input name="msg" placeholder="Escribe..." value={msg} onChange={e => setMsg(e.target.value)} autoComplete="off" />
                    <button>📨</button>
                </form>
            </div>)}
        </main>

    );
}

export default Conversacion;