import { Link, Redirect, useLocation } from 'react-router-dom'
import { confirmTransaction, cancelTransaction } from "../Api/api";
import './Transactions.css'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import { useState } from 'react'
import Swal from 'sweetalert2'


function Transaction({ change }) {
    const login = useSelector(s => s.login)
    const transaction = useSelector(s => s.transaction)
    const [modala, setModala] = useState(false)
    const [place, setPlace] = useState('')
    const [dateTime, setDateTime] = useState('');
    const dispatch = useDispatch()
    const location = useLocation()

    const handleConfirmYes = () => {
        Swal.fire({
            title: `Confirmar transacción`,
            text: `¿¿Quieres confirmar la transacción?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit()
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (place === '' || place.length < 3) {
            Swal.fire({
                title: 'Error',
                text: 'Debes introducir un lugar de entrega',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {

            try {
                await confirmTransaction(transaction.id, login.token, place, dateTime)
                setDateTime('')
                Swal.fire({
                    title: 'Operación terminada!',
                    text: `La transacción LDE${transaction.id}${transaction.book_id}${transaction.seller_id}${transaction.buyer_id} ha sido completada con éxito`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                const newData = { ...transaction }
                newData.status = 'completado'
                dispatch({ type: 'transaction', data: newData })
                change()

            } catch (e) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha habido un error en el proceso, vuelva a intentarlo por favor',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            setModala(false)

        }
    }

    const handleConfirmNo = () => {
        Swal.fire({
            title: `Confirmar cancelación`,
            text: `¿Seguro que quieres cancelar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                handleCancel()
            }
        })
    }

    const handleCancel = async () => {
        try {
            await cancelTransaction(transaction.id, login.token)
            Swal.fire({
                title: 'Operación terminada!',
                text: `La transacción LDE${transaction.id}${transaction.book_id}${transaction.seller_id}${transaction.buyer_id} ha sido cancelada`,
                icon: 'success',
                confirmButtonText: 'OK'
            })
            const newData = { ...transaction }
            newData.status = 'cancelado'
            dispatch({ type: 'transaction', data: newData })
            change()

        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: 'Ha habido un error en el proceso, vuelva a intentarlo por favor',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    if (!login) {
        return <Redirect to="/" />
    }

    if (!transaction) {
        return <Redirect to="/" />
    }


    return (
        <div>
            <div className="transactiondetail" >
                <h1>Operación de {transaction.seller_id === login.id ? 'venta:' : 'compra:'}</h1>
                <span className="idtransaction">
                    Identificador de la operación: LDE{transaction.id}{transaction.book_id}{transaction.seller_id}{transaction.buyer_id}
                </span>
                <span className="titlebook">
                    Libro: {transaction.book_title}
                </span>
                <span className="course">
                    Curso: {transaction.book_course}
                </span>
                <span className="editorial">
                    Editorial: {transaction.book_editorial}
                </span>
                <span className="price">
                    Precio: {transaction.book_price} €
                </span>
                <span className="seller">
                    {transaction.seller_id === login.id ? 'Comprador: ' : 'Vendedor: '}
                    {transaction.seller_id === login.id ? `${transaction.buyer_name}` : `${transaction.seller_name}`} {transaction.seller_id === login.id ? `${transaction.buyer_surnames}` : `${transaction.seller_surnames}`}
                </span>
                {transaction.status === 'completado' && transaction.transfer_date !== null && transaction.transfer_place !== null &&
                    <div className="transactiondetail" >
                        <span >
                            Lugar de la entrega: {transaction.transfer_place}
                        </span>
                        <span className="date">
                            Fecha y hora de entrega: {transaction.transfer_date}
                        </span>
                    </div>
                }
                <span className="status">
                    Estado: {transaction.status}
                </span>
                {transaction.status === 'en proceso' && transaction.seller_id === login.id &&
                    <div className="transactiondetail" >
                        {!modala && <button className="close" onClick={() => setModala(true)} >Aceptar transacción</button>}
                    </div>
                }
                {transaction.status === 'en proceso' &&
                    <button className="close" onClick={handleConfirmNo} >Cancelar transacción</button>
                }
            </div>
            {modala &&
                <div className="outmodala" >
                    <div className="inmodala" >
                        <h2>Para confirmar debes indicar lugar y fecha de la entrega:</h2>
                        <div className="infotrans" >
                            <div className="place" >
                                <label>Lugar de la entrega:</label>
                                <input placeholder="Escribe lugar..." value={place} onChange={e => setPlace(e.target.value)} required autofocus />
                            </div>
                            <div>
                                <label>Selecciona fecha y hora de la entrega:</label>
                                <DateTimePicker
                                    className="datepicker"
                                    amPmAriaLabel="Select AM/PM"
                                    calendarAriaLabel="Toggle calendar"
                                    clearAriaLabel="Clear value"
                                    dayAriaLabel="Day"
                                    hourAriaLabel="Hour"
                                    maxDetail="minute"
                                    minuteAriaLabel="Minute"
                                    monthAriaLabel="Month"
                                    nativeInputAriaLabel="Date and time"
                                    onChange={setDateTime}
                                    secondAriaLabel="Second"
                                    value={dateTime}
                                    yearAriaLabel="Year"
                                    format="dd/MM/y h:mm a"
                                    minDate={new Date()}
                                    locale="es-ES"
                                    required
                                />
                            </div>
                            <div className="buttons" >
                                <input className="showdatetime" placeholder="Selecciona una fecha..." value={dateTime} required />
                                <button onClick={handleConfirmYes} className="close" >Aceptar</button>
                                <button className="close" onClick={() => setModala(false)} >Cancelar</button>
                            </div>
                        </div>


                    </div>
                </div>
            }
        </div>
    )
}

export default Transaction;