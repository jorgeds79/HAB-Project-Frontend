import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { sendRecoveryPasswordMail } from "../Api/api";

function RecoverPassword() {
    const [email, setEmail] = useState('')
    const login = useSelector(s => s.login)
    let user

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            user = await sendRecoveryPasswordMail(email)
            Swal.fire({
                title: 'Recuperación de contraseña',
                text: 'Le hemos enviado un email para recuperar su contraseña, revise la bandeja de entrada de su correo',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: 'Ha habido un error en el proceso, vuelva a intentarlo por favor',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        
    }

    if (login || user) return <Redirect to="/" />

    return (
        <form onSubmit={handleSubmit}>
            <h2>RECUPERACIÓN DE PASSWORD</h2>
            <label>Introduce tu email para recuperar tu contraseña:</label>
            <div>
                <input type="email" placeholder="Email ..." value={email} onChange={e => setEmail(e.target.value)} required autofocus />
            </div>
            <button>Enviar</button>
        </form>
    );
}

export default RecoverPassword;