import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateProfileUser } from "../../Api/api";
import './MyInfo.css'
import Swal from 'sweetalert2'

function MyInfo() {
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [status, setStatus] = useState('')
    const [data, setData] = useState('')

    const login = useSelector(s => s.login)
    const dispatch = useDispatch()

    useEffect(() => {
        setName(login.name)
        setSurnames(login.surnames)
        setAddress(login.address)
        setLocation(login.location)
        setPhone(login.phone)
    }, [])

    const email = login && login.email

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const dato = await updateProfileUser(login.id, login.token, name, surnames, address, location, phone)
            console.log(dato)
            setStatus('success')
            setData(dato)
            const data = { token: login.token, id: login.id, name, surnames, address, location, phone, email }
            dispatch({ type: 'login', data })
        } catch (e) {
            setStatus('error')
        }
    }

    if (!login) {
        Swal.fire({
            title: 'Error',
            text: 'Página no disponible',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return <Redirect to="/" />
    }

    return (
        <form className="page infouser" onSubmit={handleSubmit} >
            <h2>Mis datos</h2>
            <div>
                <label>Nombre:</label>
                <input value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label>Apellidos:</label>
                <input value={surnames} onChange={e => setSurnames(e.target.value)} required />
            </div>
            <div>
                <label>Dirección:</label>
                <input value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
            <div>
                <label>Localidad:</label>
                <input value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input value={email} disabled required />
            </div>
            <div>
                <label>Teléfono:</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
            <button>Guardar datos</button>
            {status === 'error' &&
                <div>{data}</div>

            }
            {status === 'success' &&
                <div>{data}</div>
            }
        </form>
    )
}

export default MyInfo;