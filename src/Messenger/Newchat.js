import { Link, Redirect, useParams } from 'react-router-dom'
import { sendMessage } from "../Api/api";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function Newchat() {
    const book = useSelector(s => s.book)
    const login = useSelector(s => s.login)
    const [message, setMessage] = useState('')
    const [data, setData] = useState('')
    const [status, setStatus] = useState('waiting')
    const dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const sendMsg = await sendMessage(book.id, message, login.token)
            console.log(sendMsg)
            setStatus('success')
            setData(sendMsg)
            setMessage('')

        } catch (e) {
            setStatus('error')
        }
    }

    if (!book) {
        return (
            <div>
                <h2><span>Ha habido un error</span></h2>
                <h2><Link to="/">Volver a Inicio</Link></h2>
            </div>
        )
    }

    if (!login) {
        return <Redirect to="/" />
    }

    return (
        <div>
            {login && (status === 'waiting') &&
                <form className="new chat" onSubmit={handleSubmit}>
                    <div>
                        <label>Escribe tu mensaje:</label>
                        <input placeholder="Escribe..." value={message} onChange={e => setMessage(e.target.value)} required />
                    </div>
                    <button>Enviar</button>
                </form>
            }
            {status === 'success' &&
                <div>
                    {data}
                    <h2><Link to="/">Volver a Inicio</Link></h2>
                    <h2><Link to="/messages-chats/chatlist">Ir a Mensajes</Link></h2>
                </div>
            }
        </div>
    )
}

export default Newchat;