import './Register.css';
import { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerApi } from '../Api/api';

function Register() {
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [locationBook, setLocationBook] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('waiting')
    const [data, setData] = useState('')

    let location = useLocation()

    const login = useSelector(s => s.login)
    // const dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const dato = await registerApi(name, surnames, address, locationBook, phone, email, password)
            console.log(dato)
            setStatus('success')
            setData(dato)

        } catch (e) {
            setStatus('error')
        }
    }

    if (login) return <Redirect to={location.state.prevPath} />

    return (
        <div>
            {(status === 'waiting' || status === 'error') && (<form className="page register" onSubmit={handleSubmit}>
                <div className="item" >
                    <label>Nombre:</label>
                    <input placeholder="Escribe tu nombre..." value={name} onChange={e => setName(e.target.value)} required autofocus />
                </div>
                <div className="item" >
                    <label>Apellidos:</label>
                    <input placeholder="Escribe apellidos ..." value={surnames} onChange={e => setSurnames(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Dirección:</label>
                    <input placeholder="Escribe tu dirección ..." value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Localidad:</label>
                    <input placeholder="Escribe tu localidad ..." value={locationBook} onChange={e => setLocationBook(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Teléfono:</label>
                    <input placeholder="Escribe tu teléfono ..." value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Email:</label>
                    <input placeholder="Escribe tu email ..." value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Contraseña:</label>
                    <input placeholder="Escribe tu contraseña ..." type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button>Registrar</button>
            </form>)}
            {status === 'error' &&
                <div>Los campos introducidos no son correctos, vuelve a intentarlo por favor</div>

            }
            {status === 'success' &&
                <div>
                    {data}
                    <button>Aceptar</button>
                </div>

            }
        </div>
    );
}

export default Register;