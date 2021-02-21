import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFetch from '../useFetch'

function MyBooks() {
    const login = useSelector(s => s.login)

    const books = useFetch('http://localhost:9999/user/books', {
        headers: { 'Content-Type': 'application/json', 'Authorization': login.token },
        method: 'GET'
    }) || []

    if (books.length === 0) return (
        <div>No tienes libros en venta</div>
    )

    return (
        <div className="booklist">
            {books.map(book =>
                <Link to={"/user/mypanel/bookdetail/" + book.id} >
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

export default MyBooks;