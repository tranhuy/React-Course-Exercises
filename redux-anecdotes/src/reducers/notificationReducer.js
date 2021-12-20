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

// export const showNotification = (dispatch, message) => {

//     //need to first clear any notifications that are queued to be hidden
//     clearTimeout(notificationTimerId)

//     dispatch(setNofication(message))

//     //remove currently active notification after 3s
//     notificationTimerId = setTimeout(() => {
//         dispatch(removeNotification())
//     }, 3000);
// }

export const showNotification = (message, delay) => {
    //need to first clear any notifications that are queued to be hidden
    if (notificationTimerId) {
        clearTimeout(notificationTimerId)
    }
    
    return async dispatch => {
        dispatch(setNofication(message))
        await new Promise(resolve => {
            notificationTimerId = setTimeout(resolve, delay * 1000)
        })
        dispatch(removeNotification())
    }
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