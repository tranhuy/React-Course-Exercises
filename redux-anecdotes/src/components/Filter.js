import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        let serachCriteria = event.target.value

        dispatch(filterChange(serachCriteria))
    }
    const style = {
        marginBottom: 10,
        marginTop: 10
    }

    return (
        <div style={style}>
        Search Anecdote <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter