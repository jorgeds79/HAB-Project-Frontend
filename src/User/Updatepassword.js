import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../Api/api';
import Swal from 'sweetalert2'

function Updatepassword() {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [exit, setExit] = useState(false)

    const login = useSelector(s => s.login)

    if (!login) {
        Swal.fire({
            title: 'Error',
            text: 'Página no disponible',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return <Redirect to="/" />
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (newPassword.length < 8 || newPassword.length > 12 || repeatNewPassword.length < 8 || repeatNewPassword.length > 12 ||
            newPassword !== repeatNewPassword || password.length < 8 || password.length > 12) {
            Swal.fire({
                title: 'Error',
                text: 'Los valores introducidos no cumplen los requisitos',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return
        }
        try {
            await updateUserPassword(password, newPassword, repeatNewPassword, login.token)
            Swal.fire({
                title: 'Operación realizada!',
                text: `La contraseña se ha actualizado correctamente`,
                icon: 'success',
                confirmButtonText: 'OK'
            })
            setExit(true)
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: 'Ha habido un error, vuelva a intentarlo por favor',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    if (exit) return <Redirect to="/user/mypanel" />

    return (
        <form className="page login" onSubmit={handleSubmit}>
            <h2>Modificación de contraseña</h2>
            <div>
                <input type="password" placeholder="Escribe actual contraseña ..." value={password} onChange={e => setPassword(e.target.value)} required autofocus />
            </div>
            <div>
                <input type="password" placeholder="Escribe nueva contraseña ..." value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <div>
                <input type="password" placeholder="Repite nueva contraseña ..." value={repeatNewPassword} onChange={e => setRepeatNewPassword(e.target.value)} required />
            </div>
            <label>la contraseña debe contener entre 8 y 12 caracteres</label>
            <button>Aceptar</button>
        </form>
    );
}

export default Updatepassword;