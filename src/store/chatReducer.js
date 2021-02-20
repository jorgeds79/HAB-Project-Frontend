export default function chatReducer(state=null, action) {
    switch (action.type) {
        case 'chat':
            return action.data
        case 'noChat':
            return null
        default:
            return state
    }
}
