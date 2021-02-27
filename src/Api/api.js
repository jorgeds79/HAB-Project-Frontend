export async function loginApi(email, password) {
    const res = await fetch('http://localhost:9999/user/login', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        method: 'POST'
    })
    if (res.ok) {
        return await res.json()
    } else {
        throw new Error(res.statusText)
    }
}

export async function registerApi(name, surnames, address, location, phone, email, password) {
    const res = await fetch('http://localhost:9999/user', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surnames, address, location, phone, email, password }),
        method: 'POST'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function updateProfileUser(id, token, name, surnames, address, location, phone) {
    const res = await fetch('http://localhost:9999/user/profile/update/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ name, surnames, address, location, phone }),
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function sendMessage(id, message, token) {
    const res = await fetch('http://localhost:9999/messages-init/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ content: message }),
        method: 'POST'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function createTransaction(id, token) {
    const res = await fetch('http://localhost:9999/booking/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        method: 'POST'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function confirmTransaction(id, token, place, date) {
    const res = await fetch('http://localhost:9999/transaction/confirm/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ place, date }),
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function cancelTransaction(id, token) {
    const res = await fetch('http://localhost:9999/transaction/cancel/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function updateUserPassword(password, newPassword, repeatNewPassword, token) {
    const res = await fetch('http://localhost:9999/update-password', {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ password, newPassword, repeatNewPassword }),
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function sendRecoveryPasswordMail(email) {
    const res = await fetch('http://localhost:9999/user/recover-password', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        method: 'POST'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function changeRecoveredPassword(newPassword, id) {
    const res = await fetch('http://localhost:9999/update-reset-password/' + id, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}

export async function updateBookInfo(id, fd, token) {
    const res = await fetch('http://localhost:9999/update-book/' + id, {
        headers: { 'Authorization': token },
        body: fd,
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text('Libro actualizado correctamente')
    } else {
        throw new Error(res.statusText)
    }
}

export async function deleteBook(id, token) {
    const res = await fetch('http://localhost:9999/user/books/delete/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text('Libro borrado correctamente')
    } else {
        throw new Error(res.statusText)
    }
}

export async function uploadBook(token, fd) {
    const res = await fetch('http://localhost:9999/upload/book', {
        headers: { 'Authorization': token },
        body: fd,
        method: 'POST'
    })
    if (res.ok) {
        return await res.text('Libro subido correctamente')
    } else {
        throw new Error(res.statusText)
    }
}

export async function goToDeleteImage(id, token, image) {
    const res = await fetch('http://localhost:9999/update-book/images/delete/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ image }),
        method: 'DELETE'
    })
    if (res.ok) {
        return await res.text('Libro subido correctamente')
    } else {
        throw new Error(res.statusText)
    }
}

export async function putReviewToSeller(id, token, review) {
    const res = await fetch('http://localhost:9999/transaction-review/' + id, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ review }),
        method: 'PUT'
    })
    if (res.ok) {
        return await res.text()
    } else {
        throw new Error(res.statusText)
    }
}


