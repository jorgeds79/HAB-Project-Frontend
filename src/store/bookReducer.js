export default function bookReducer(state=null, action) {
    switch (action.type) {
        case 'book':
            return action.data
        case 'noBook':
            return null
        default:
            return state
    }
}