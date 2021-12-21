import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        let serachCriteria = event.target.value

        props.filterChange(serachCriteria)
        //dispatch(filterChange(serachCriteria))
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

const mapDispatchToProps = {
    filterChange
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter