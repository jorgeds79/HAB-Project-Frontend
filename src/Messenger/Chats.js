import { Link, NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useChats from './useChats'
import './Chats.css'

function Chats() {
    const login = useSelector(s => s.login)
    const dispatch = useDispatch()
    const key = useSelector(s => s.chat)

    const chats = useChats('http://localhost:9999/messages-chats/chatlist', login.token, key) || []

    if (!login) {
        return <Redirect to="/" />
    }

    if (chats.length === 0) return (
        <div>No tienes mensajes</div>
    )
    return (
        <aside className="chat-list">
            <h2>CHATS:</h2>
            <div className="chats">
                {chats.map(chat =>
                    <Link to={"/user/mypanel/messages-chats/chatlist/" + chat.id_chat} onClick={() => dispatch({ type: 'chat', data: chat.id_chat })} key={chat.id_chat} >
                        <div className="chat" >
                            <span className="idchat">
                                Id Chat: {chat.id_chat}
                            </span>
                            <span className="title">
                                Libro: {chat.book_title}
                            </span>
                            <span className="seller">
                                Vendedor: {chat.seller_name}
                            </span>
                            <span className="buyer">
                                Comprador: {chat.buyer_name}
                            </span>
                            <span className="unread">
                                {chat.unreadChat ? 'Tienes mensajes  sin leer' : 'Chat leído'}
                            </span>
                        </div>
                    </Link>
                )}
            </div>
        </aside>
    )
}

export default Chats;