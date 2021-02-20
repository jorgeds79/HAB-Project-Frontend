import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useTransactions from './useTransactions'
import './Transactions.css'

function Transactions({ reload }) {
    const login = useSelector(s => s.login)
    const transaction = useSelector(s => s.transaction)
    const dispatch = useDispatch()

    const transactions = useTransactions('http://localhost:9999/user/transactions', login.token, reload) || []

    if (!login) {
        return <Redirect to="/" />
    }

    if (transactions.length === 0) return (
        <div>
            <h2>Aún no has realizado transacciones</h2>
            <Link to={"/user/mypanel"} >
                <span >Volver a mi perfil</span>
            </Link>
        </div>
    )

    const purchases = transactions.filter((transaction) => transaction.buyer_id === login.id)
    const sales = transactions.filter((transaction) => transaction.seller_id === login.id)

    return (
        <aside className="transaction-list">
            <h1 className="title" >TRANSACCIONES</h1>
            {purchases.length !== 0 &&
                <div className="transaction-list">
                    <h2 className="title" >Compras:</h2>
                    {purchases.map(purchase =>
                        <Link to={"/user/mypanel/transactions/list/" + purchase.id} onClick={() => dispatch({ type: 'transaction', data: purchase })} key={purchase.id} >
                            <div className="transaction" >
                                <span className="idtransaction">
                                    Identificador: LDE{purchase.id}{purchase.book_id}{purchase.seller_id}{purchase.buyer_id}
                                </span>
                                <span className="titlebook">
                                    Libro: {purchase.book_title} - {purchase.book_course}
                                </span>
                                <span className="seller">
                                    Vendedor: {purchase.seller_name} {purchase.seller_surnames}
                                </span>
                                <span className="status">
                                    Estado: {purchase.status}
                                </span>
                            </div>
                        </Link>
                    )}
                </div>}
            {sales.length !== 0 &&
                <div className="transaction-list">
                    <h2 className="title" >Ventas:</h2>
                    {sales.map(sale =>
                        <Link to={"/user/mypanel/transactions/list/" + sale.id} onClick={() => dispatch({ type: 'transaction', data: sale })} key={sale.id} >
                            <div className="transaction" >
                                <span className="idtransaction">
                                    Identificador: LDE{sale.id}{sale.book_id}{sale.seller_id}{sale.buyer_id}
                                </span>
                                <span className="titlebook">
                                    Libro: {sale.book_title} - {sale.book_course}
                                </span>
                                <span className="seller">
                                    Comprador: {sale.buyer_name} {sale.buyer_surnames}
                                </span>
                                <span className="status">
                                    Estado: {sale.status}
                                </span>
                            </div>
                        </Link>
                    )}
                </div>}
        </aside>
    )
}

export default Transactions;