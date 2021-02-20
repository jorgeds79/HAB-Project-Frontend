import { Link, useParams } from 'react-router-dom'
import useFetch from './useFetch'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux'

function Search() {
    const { level } = useParams()
    const dispatch = useDispatch()

    const books = useFetch('http://localhost:9999/search/' + level) || []
    
    if (books.length === 0) return (
        <div>No se han encontrado resultados</div>
    )

    return (
        <div className="booklist">
            {books.map(book =>
                <Link to={"/book/detail/" + book.id} >
                    <div className="book" key={book.id} >
                        <span className="title">
                            Título: {book.title}
                        </span>
                        <span className="course">
                            Curso: {book.course}
                        </span>
                        <span className="editorial">
                            Editorial: {book.editorial}
                        </span>
                        <span className="price">
                            Precio: {book.price}€
                    </span>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Search;