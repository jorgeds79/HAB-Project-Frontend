import { Link, useLocation, useParams } from 'react-router-dom'
import './Search.css'
import './Book.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";

function Book() {
    const { id } = useParams()
    const [bookInfo, setBookInfo] = useState({})
    const [images, setImages] = useState([])
    const [idSeller, setIdSeller] = useState()
    const [stars, setStars] = useState(0)
    const [modal, setModal] = useState('no')
    const login = useSelector(s => s.login)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        fetch('http://localhost:9999/books/info/' + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        })
            .then(res => res.json())
            .then(bookInfo => {
                setBookInfo(bookInfo)
                setImages(bookInfo.images)
                setIdSeller(bookInfo.id_seller)
                setStars(bookInfo.stars_rating)
            })
    }, [])

    const handleClick = () => {
        dispatch({ type: 'book', data: bookInfo })
    }

    if (!bookInfo) {
        return 'Loading...'
    }
    
    return (
        <div className="bookdetail">
            <div className="rating" >
                <span >{bookInfo.seller_name}:</span>
                <span >Valoraciones: {bookInfo.ratings}</span>
                <div className="seller-rating" >
                    <ReactStars
                        count={5}
                        edit={false}
                        onChange={setStars}
                        value={stars}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
            </div>
            <div className="book" >
                <span className="title">
                    Título: {bookInfo.title}
                </span>
                <span className="course">
                    Curso: {bookInfo.course}
                </span>
                <span className="isbn">
                    ISBN: {bookInfo.isbn}
                </span>
                <span className="editorial">
                    Editorial: {bookInfo.editorial}
                </span>
                <span className="editionYear">
                    Año de edición: {bookInfo.editionYear}
                </span>
                <span className="location">
                    Localidad: {bookInfo.location}
                </span>
                <span className="detail">
                    Detalles: {bookInfo.detail}
                </span>
                <span className="price">
                    Precio: {bookInfo.price}€
                </span>
            </div>
            {(images.length > 0) &&
                <div className="foto" style={{ backgroundImage: `url(${images[0]})` }} />
            }
            {(images.length > 1) &&
                <div className="foto" style={{ backgroundImage: `url(${images[1]})` }} />
            }
            {(images.length > 2) &&
                <div className="foto" style={{ backgroundImage: `url(${images[2]})` }} />
            }
            {login && idSeller !== login.id &&
                <div>
                    <Link to={{ pathname: '/messages-chats/new', state: { prevPath: location.pathname } }} onClick={handleClick} >
                        <span>¿Te interesa?</span>
                        <span>Ponte en contacto con el vendedor</span>
                    </Link>
                    <Link to={{ pathname: '/transactions/new', state: { prevPath: location.pathname } }} onClick={handleClick} >
                        <button>Solicitar compra</button>
                    </Link>
                </div>
            }
            {!login &&
                <div>
                    <Link to={{ pathname: '/register', state: { prevPath: location.pathname } }}  >
                        <span>¿Te interesa?</span>
                        <span>Regístrate y envíale un mensaje al vendedor</span>
                    </Link>
                    <span>ó</span>
                    <Link to={{ pathname: '/login', state: { prevPath: location.pathname } }} >
                        <span>Identifícate</span>
                    </Link>
                </div>
            }
            {(modal === 'mostrar') &&
                <div className="outmodal" >

                    <h2>Comprueba los datos y confirma:</h2>
                    <div className="infotrans" >
                        <span className="code">
                            Identificador: {bookInfo.id}
                        </span>
                        <span className="title">
                            Título: {bookInfo.title}
                        </span>
                        <span className="course">
                            Curso: {bookInfo.course}
                        </span>
                        <span className="isbn">
                            ISBN: {bookInfo.isbn}
                        </span>
                        <span className="editorial">
                            Editorial: {bookInfo.editorial}
                        </span>
                        <span className="editionYear">
                            Año de edición: {bookInfo.editionYear}
                        </span>
                        <span className="location">
                            Localidad: {bookInfo.location}
                        </span>
                        <span className="price">
                            Precio: {bookInfo.price}€
                            </span>
                        <span className="seller">
                            Usuario: {bookInfo.seller_name}€
                            </span>
                    </div>
                    <button className="close" onClick={setModal(false)} >X</button>

                </div>
            }
        </div>
    )
}

export default Book;