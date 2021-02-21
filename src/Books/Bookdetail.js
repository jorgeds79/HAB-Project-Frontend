import { Redirect, useParams } from 'react-router-dom'
import './Search.css'
import './Book.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { deleteBook, updateBookInfo } from '../Api/api'

function Bookdetail() {
    const { id } = useParams()
    const [bookInfo, setBookInfo] = useState({})
    const [title, setTitle] = useState('')
    const [course, setCourse] = useState('')
    const [isbn, setIsbn] = useState('')
    const [editorial, setEditorial] = useState('')
    const [editionYear, setEditionYear] = useState('')
    const [detail, setDetail] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('no')
    const [data, setData] = useState('')
    const login = useSelector(s => s.login)

    useEffect(() => {
        fetch('http://localhost:9999/books/info/' + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        })
            .then(res => res.json())
            .then(bookInfo => {
                setBookInfo(bookInfo)
                setTitle(bookInfo.title)
                setCourse(bookInfo.course)
                setIsbn(bookInfo.isbn)
                setEditorial(bookInfo.editorial)
                setEditionYear(bookInfo.editionYear)
                setDetail(bookInfo.detail)
                setPrice(bookInfo.price)
            })
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const dato = await updateBookInfo(id, isbn, title, course, editorial, editionYear, price, detail, login.token)
            console.log(dato)
            Swal.fire({
                title: 'Datos actualizados',
                text: `Los datos de tu libro ${title} - ${course} han sido actualizados`,
                icon: 'success',
                confirmButtonText: 'OK'
            })
            setStatus('success')
            setData(dato)
        } catch (e) {
            setStatus('error')
            Swal.fire({
                title: 'Error',
                text: 'Ha habido un error en el proceso, vuelva a intentarlo por favor',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleConfirm = () => {
        Swal.fire({
            title: 'Borrar libro',
            text: `¿Seguro que quieres borrar el libro "${bookInfo.title} - ${bookInfo.course}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete()
            }
        })
    }

    const handleDelete = async () => {
        
        try {
            const dato = await deleteBook(id, login.token)
            console.log(dato)
            Swal.fire({
                title: 'Libro borrado',
                text: 'El libro ha sido eliminado',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            bookInfo.available = false
            setStatus('success')
            setData(dato)
        } catch (e) {
            setStatus('error')
            Swal.fire({
                title: 'Error',
                text: 'Ha habido un error en el proceso, vuelva a intentarlo por favor',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    if (!bookInfo) {
        return 'Loading...'
    } else if (bookInfo.available === false) {
        return <Redirect to="/user/mypanel/mybooks" />
    }

    if (!login) return <Redirect to="/" />

    

    return (
        <div>
            <form className="bookdetail" onSubmit={handleSubmit} >
                <h2>Información del libro</h2>
                <div className="item" >
                    <label>Título:</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Curso:</label>
                    <select onChange={e => setCourse(e.target.value)} required >
                        <option selected value={course}>{course}</option>
                        <option value="1º Infantil">1º Infantil</option>
                        <option value="2º Infantil">2º Infantil</option>
                        <option value="1º Primaria">1º Primaria</option>
                        <option value="2º Primaria">2º Primaria</option>
                        <option value="3º Primaria">3º Primaria</option>
                        <option value="4º Primaria">4º Primaria</option>
                        <option value="1º E.S.O.">1º E.S.O.</option>
                        <option value="2º E.S.O.">2º E.S.O.</option>
                        <option value="3º E.S.O.">3º E.S.O.</option>
                        <option value="4º E.S.O.">4º E.S.O.</option>
                        <option value="1º Bachiller">1º Bachiller</option>
                        <option value="2º Bachiller">2º Bachiller</option>
                    </select>
                </div>
                <div className="item" >
                    <label>ISBN:</label>
                    <input value={isbn} onChange={e => setIsbn(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Editorial:</label>
                    <input value={editorial} onChange={e => setEditorial(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Año de edición:</label>
                    <input value={editionYear} onChange={e => setEditionYear(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Detalles:</label>
                    <input value={detail} onChange={e => setDetail(e.target.value)} required />
                </div>
                <div className="item" >
                    <label>Precio:</label>
                    <input value={price} onChange={e => setPrice(e.target.value)} required /><span>€</span>
                </div>
                <button>Guardar datos</button>
                {status === 'error' || status === 'succes' &&
                    <div>{data}</div>

                }
            </form>
            <button className="delete" onClick={handleConfirm}>Borrar libro</button>
        </div>
    )
}

export default Bookdetail;