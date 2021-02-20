import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { createTransaction } from "../Api/api";

function Newtransaction() {
    const book = useSelector(s => s.book)
    const login = useSelector(s => s.login)
    const [status, setStatus] = useState('waiting')
    const [data, setData] = useState('')
    const location = useLocation()
    const history = useHistory();

   const routeChange = () => {
        let path = `/`;
        history.push(path);
    }


    const handleClick = async e => {
        e.preventDefault()
        try {
            const transaction = await createTransaction(book.id, login.token)
            console.log(transaction)
            setStatus('success')
            setData(transaction)
        } catch (e) {
            setStatus('error')
        }
    }


    return (
        <div className="outmodal" >
            {status === 'waiting' && <div className="inmodal" >
                <h2>Comprueba los datos y confirma:</h2>
                <div className="infotrans" >
                    <span className="code">
                        Identificador: {book.id}
                    </span>
                    <span className="title">
                        Título: {book.title}
                    </span>
                    <span className="course">
                        Curso: {book.course}
                    </span>
                    <span className="isbn">
                        ISBN: {book.isbn}
                    </span>
                    <span className="editorial">
                        Editorial: {book.editorial}
                    </span>
                    <span className="editionYear">
                        Año de edición: {book.editionYear}
                    </span>
                    <span className="location">
                        Localidad: {book.location}
                    </span>
                    <span className="price">
                        Precio: {book.price}€
                            </span>
                    <span className="seller">
                        Usuario: {book.seller_name}
                    </span>
                </div>
                <button className="confirm" onClick={handleClick} >Solicitar libro</button>
                <Link to={location.state.prevPath} >Cancelar</Link>
            </div>}
            {status === 'success' &&
                <div className="inmodal" >
                    <span>{data}</span>
                    <button onClick={routeChange} >Aceptar</button>
                </div>
            }
        </div>
    )
}

export default Newtransaction;
