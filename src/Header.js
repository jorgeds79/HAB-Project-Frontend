import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './Header.css'

function Header() {
  const location = useLocation()
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch({ type: 'logout' })
  }

  return (
    <header>
      <h1><Link to="/">Mi App</Link></h1>
      <Link to="/search">Buscador</Link>

      {!login &&
        <div className="login" >
          <Link to={{ pathname: '/login', state: { prevPath: location.pathname } }} >Iniciar sesión</Link>
          <Link to="/register"><span>Aún no te has registrado?</span><span>Regístrate aquí</span></Link>
        </div>
      }
      {login &&
        <div className="logout" >
          <span>Hola {login.name}</span>
          <Link to="/mypanel">Ir a mi cuenta</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      }
    </header>
  );
}

export default Header;
