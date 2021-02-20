export default function transactionReducer(state=null, action) {
    switch (action.type) {
        case 'transaction':
            return action.data
        case 'notransaction':
            return null
        default:
            return state
    }
}