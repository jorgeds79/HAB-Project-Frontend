import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import './Panel.css'

function Panel() {
    const login = useSelector(s => s.login)
    const route = useSelector(s => s.route)
    console.log(route)
    console.log(login)
    const dispatch = useDispatch()

    const options = [
        {
            "title": "Datos Personales",
            "route": "/user/profile"
        },
        {
            "title": "Transacciones",
            "route": "/transactions/list"
        },
        {
            "title": "Mis libros ",
            "route": "/user/books"
        },
        {
            "title": "Subir libro",
            "route": "/upload"
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
            "route": "/messages-chats/chatlist"
        },
        {
            "title": "Cambiar contraseña",
            "route": "/user/password/update"
        }
    ]

    if (!login) {
        return <Redirect to="/" />
    }

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