const initialState = 'Welcome to my Anecdotes app designed using React/Redux'

export const setNofication = (message) => {
    return {
        type: 'DISPLAY_NOTIFICATION', message
    }
}

export const removeNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

let notificationTimerId 

export const showNotification = (dispatch, message) => {

    //need to first clear any notifications that are queued to be hidden
    clearTimeout(notificationTimerId)

    dispatch(setNofication(message))

    //remove currently active notification after 3s
    notificationTimerId = setTimeout(() => {
        dispatch(removeNotification())
    }, 3000);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DISPLAY_NOTIFICATION':
            return action.message
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default reducer