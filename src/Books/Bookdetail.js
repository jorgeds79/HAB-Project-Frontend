import { Redirect, useParams } from 'react-router-dom'
import './Search.css'
import './Book.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { deleteBook, goToDeleteImage, updateBookInfo } from '../Api/api'

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
    const [oldImage0, setOldImage0] = useState('')
    const [oldImage1, setOldImage1] = useState('')
    const [oldImage2, setOldImage2] = useState('')
    const [status, setStatus] = useState('no')
    const [key, setKey] = useState(0)
    const [deletePhoto0, setDeletePhoto0] = useState(false)
    const [deletePhoto1, setDeletePhoto1] = useState(false)
    const [deletePhoto2, setDeletePhoto2] = useState(false)
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
                bookInfo.images[0] ? setOldImage0(bookInfo.images[0]) : setOldImage0('')
                bookInfo.images[1] ? setOldImage1(bookInfo.images[1]) : setOldImage1('')
                bookInfo.images[2] ? setOldImage2(bookInfo.images[2]) : setOldImage2('')
            })
    }, [key])

    const handleSubmit = async e => {
        e.preventDefault()
        if (!deletePhoto0 && !deletePhoto1 && !deletePhoto2) await saveData(e)
        else await deletePhoto()
    }

    const deletePhoto = async () => {
        let image
        if (deletePhoto0) image = oldImage0
        else if (deletePhoto1) image = oldImage1
        else if (deletePhoto2) image = oldImage2
        setDeletePhoto0(false)
        setDeletePhoto1(false)
        setDeletePhoto2(false)
        Swal.fire({
            title: 'Borrar foto',
            text: `¿Eliminar foto?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                goToDelete(image)
            }
        })
    }

    const goToDelete = async (image) => {
        await goToDeleteImage(bookInfo.id, login.token, image)
        setKey(key + 1)
    }

    const saveData = async e => {

        const fd = new FormData()

        if (e.target.image0.files.length !== 0 && oldImage0) {
            fd.append('images', e.target.image0.files[0])
            fd.append('image0', 'changed')
            fd.append('oldImage0', oldImage0)
        } else if (e.target.image0.files.length !== 0 && !oldImage0) {
            fd.append('images', e.target.image0.files[0])
            fd.append('image0', 'changed')
            fd.append('oldImage0', '')
        } else if (oldImage0) {
            fd.append('image0', oldImage0)
            fd.append('oldImage0', oldImage0)
        }

        if (e.target.image1.files.length !== 0 && oldImage1) {
            fd.append('images', e.target.image1.files[0])
            fd.append('image1', 'changed')
            fd.append('oldImage1', oldImage1)
        } else if (e.target.image1.files.length !== 0 && !oldImage1) {
            fd.append('images', e.target.image1.files[0])
            fd.append('image1', 'changed')
            fd.append('oldImage1', '')
        } else if (oldImage1) {
            fd.append('image1', oldImage1)
            fd.append('oldImage1', oldImage1)
        }

        if (e.target.image2.files.length !== 0 && oldImage2) {
            fd.append('images', e.target.image2.files[0])
            fd.append('image2', 'changed')
            fd.append('oldImage2', oldImage2)
        } else if (e.target.image2.files.length !== 0 && !oldImage2) {
            fd.append('images', e.target.image2.files[0])
            fd.append('image2', 'changed')
            fd.append('oldImage2', '')
        } else if (oldImage2) {
            fd.append('image2', oldImage2)
            fd.append('oldImage2', oldImage2)
        }

        fd.append('title', title)
        fd.append('course', course)
        fd.append('isbn', isbn)
        fd.append('editorial', editorial)
        fd.append('editionYear', editionYear)
        fd.append('detail', detail)
        fd.append('price', price)

        try {
            const dato = await updateBookInfo(id, fd, login.token)
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
        document.getElementById("inputimage0").value = ''
        document.getElementById("inputimage1").value = ''
        document.getElementById("inputimage2").value = ''
        setKey(key + 1)
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
            console.log(bookInfo)
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
                {oldImage0 &&
                    <div>
                        <div>
                            <div className="foto" style={{ backgroundImage: `url(${oldImage0})` }} />
                            <span>Cambiar foto: <input id="inputimage0" name="image0" type="file" accept="image/*" /></span>

                        </div>
                        <button onClick={() => setDeletePhoto0(true)} >Borrar foto</button>

                    </div>
                }
                {!oldImage0 &&
                    <span>Subir foto: <input id="inputimage0" name="image0" type="file" accept="image/*" /></span>
                }
                {oldImage1 &&
                    <div>
                        <div>
                            <div className="foto" style={{ backgroundImage: `url(${oldImage1})` }} />
                            <span>Cambiar foto: <input id="inputimage1" name="image1" type="file" accept="image/*" /></span>

                        </div>
                        <button onClick={() => setDeletePhoto1(true)} >Borrar foto</button>
                    </div>
                }
                {!oldImage1 &&
                    <span>Subir foto: <input id="inputimage1" name="image1" type="file" accept="image/*" /></span>
                }
                {oldImage2 &&
                    <div>
                        <div>
                            <div className="foto" style={{ backgroundImage: `url(${oldImage2})` }} />
                            <span>Cambiar foto: <input id="inputimage2" name="image2" type="file" accept="image/*" /></span>

                        </div>
                        <button onClick={() => setDeletePhoto2(true)} >Borrar foto</button>
                    </div>
                }
                {!oldImage2 &&
                    <span>Subir foto: <input id="inputimage2" name="image2" type="file" accept="image/*" /></span>
                }
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