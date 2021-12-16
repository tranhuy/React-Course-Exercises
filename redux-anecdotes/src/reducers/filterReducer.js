export const filterChange = (criteria) => {
    return {
        type: 'SET_FILTER',
        filter: criteria
    }
}

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return state
    }
}

export default reducer