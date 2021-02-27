import { useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import './Panel.css'

function Panel() {
    const login = useSelector(s => s.login)
        
    if (!login) {
        return <Redirect to="/" />
    }

    const options = [
        {
            "title": "Datos Personales",
            "route": `/user/mypanel/profile/${login.id}`
        },
        {
            "title": "Transacciones",
            "route": "/user/mypanel/transactions/list"
        },
        {
            "title": "Mis libros ",
            "route": "/user/mypanel/mybooks"
        },
        {
            "title": "Subir libro",
            "route": "/user/mypanel/upload"
        },
        {
            "title": "Valoraciones",
            "route": "/user/transactions/reviews"
        },
        {
            "title": "Peticiones",
            "route": "user/requests"
        },
        {
            "title": "Mis mensajes",
            "route": "/user/mypanel/messages-chats/chatlist"
        },
        {
            "title": "Cambiar contraseña",
            "route": "/user/mypanel/password/update"
        }
    ]

    return (
        <div className="panel" >
            <h2>MI CUENTA</h2>
            {options.map((option, i) =>
                <Link key={i} to={option.route} className="user option" >
                    {option.title.toUpperCase()}
                </Link>
            )}
        </div>
    )
}

export default Panel;