import { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../Api/api';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  let location = useLocation()

  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await loginApi(email, password)
      dispatch({ type: 'login', data })
    } catch (e) {
      setStatus('error')
    }
  }

  if (login) return <Redirect to={location.state.prevPath} />

  return (
    <form className="page login" onSubmit={handleSubmit}>
      <div>
        <input type="email" placeholder="Email ..." value={email} onChange={e => setEmail(e.target.value)} required autofocus />
      </div>
      <div>
        <input placeholder="Password ..." type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button>Iniciar sesión</button>
      {status === 'error' &&
        <div>Usuario o contraseña incorrecto</div>
      }
      <p>
        <Link to="/user/password/recovery">No recuerdas tu contraseña?</Link>
      </p>
      <div>
        <span>No tienes cuenta?</span>
        <Link to="/register">Crear cuenta</Link>
      </div>
    </form>
  );
}

export default Login;
