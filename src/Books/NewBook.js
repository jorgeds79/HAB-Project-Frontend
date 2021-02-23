import { Redirect } from 'react-router-dom'
import './Search.css'
import './Book.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { uploadBook } from '../Api/api'

function NewBook() {
    const [title, setTitle] = useState('')
    const [course, setCourse] = useState('')
    const [isbn, setIsbn] = useState('')
    const [editorial, setEditorial] = useState('')
    const [editionYear, setEditionYear] = useState('')
    const [detail, setDetail] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('no')
    const login = useSelector(s => s.login)

    const handleSubmit = async e => {
        e.preventDefault()

        const fd = new FormData()
        const images = e.target.images.files

        if (images) {
            for (let i = 0; i < images.length; i++) {
                if (i > 2) return
                fd.append('images', images[i])
            }
        }
        fd.append('title', title)
        fd.append('course', course)
        fd.append('isbn', isbn)
        fd.append('editorial', editorial)
        fd.append('editionYear', editionYear)
        fd.append('detail', detail)
        fd.append('price', price)

        try {
            const dato = await uploadBook(login.token, fd)
            console.log(dato)
            Swal.fire({
                title: `Se ha subido tu libro ${title} - ${course}`,
                text: 'Estará disponible para los usuarios en cuanto lo apruebe el administrador del sistema',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            setStatus('success')
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: 'Ha habido un error en el proceso, vuelva a intentarlo por favor',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    if (status === 'success') {
        return <Redirect to="/user/mypanel" />
    }

    if (!login) return <Redirect to="/" />

    return (
        <form className="bookdetail" onSubmit={handleSubmit} >
            <h2>Introduce los datos del libro:</h2>
            <div className="item" >
                <label>Título:</label>
                <input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="item" >
                <label>Curso:</label>
                <select onChange={e => setCourse(e.target.value)} required >
                    <option disabled selected>selecciona curso...</option>
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
                <input value={editorial} onChange={e => setEditorial(e.target.value)} />
            </div>
            <div className="item" >
                <label>Año de edición:</label>
                <input value={editionYear} onChange={e => setEditionYear(e.target.value)} />
            </div>
            <div className="item" >
                <label>Detalles:</label>
                <input value={detail} onChange={e => setDetail(e.target.value)} />
            </div>
            <div className="item" >
                <label>Precio:</label>
                <input value={price} onChange={e => setPrice(e.target.value)} required /><span>€</span>
            </div>
            <div className="item" >
                <label>Fotos:</label>
                <input name="images" type="file" accept="image/*" multiple="multiple" />
            </div>
            <button>Subir libro</button>
        </form>
    )
}

export default NewBook;