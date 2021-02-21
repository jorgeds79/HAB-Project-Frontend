import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { changeRecoveredPassword } from '../Api/api'
import Swal from 'sweetalert2'
import './CheckPasswordCode.css'

function CheckPasswordCode() {
    const { code } = useParams()
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [show, setShow] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('http://localhost:9999/user/password/reset/' + code, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        })
            .then(res => res.json())
            .then(user => {
                setUser(user)
            })
    }, [])

    if (user.id === undefined) return (
        <div>No se ha podido recuperar la contraseña. Vuelva a intentarlo por favor.</div>
    )

    const handleSubmit = async e => {
        e.preventDefault()
        if (password.length < 8 || password.length > 12 || repeatPassword.length < 8 || repeatPassword.length > 12 || password !== repeatPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Los valores introducidos no cumplen los requisitos',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return
        }
        try {
            console.log(password)
            await changeRecoveredPassword(password, user.id)
            Swal.fire({
                title: 'Contraseña actualizada',
                text: 'La contraseña se ha actualizado correctamente. Ya puede acceder a su cuenta',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            setShow(true)
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: 'Ha habido un error en el proceso, vuelva a intentarlo por favor',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }


    return (
        <div>
            {!show &&
                <form onSubmit={handleSubmit}>
                    <h2>RECUPERACIÓN DE PASSWORD</h2>
                    <label>Escribe nueva contraseña, debe contener entre 8 y 12 caracteres:</label>
                    <div>
                        <input type="password" placeholder="Escribe nueva contraseña ..." value={password} onChange={e => setPassword(e.target.value)} required autofocus />
                        <input type="password" placeholder="Repite nueva contraseña ..." value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} required />
                    </div>
                    <button>Enviar</button>
                </form>}
            {show &&
                <div>
                    <label>Ya puedes acceder a tu cuenta</label>
                    <p><Link to="/login">Acceder</Link></p>
                </div>
            }
        </div>
    )
}

export default CheckPasswordCode;