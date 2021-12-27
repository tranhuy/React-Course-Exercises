import { useState, useRef } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')
    const ref = useRef()

    const onChange = event => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    const getAttributes = () => ({
        type, value, onChange
    })

    return {
        value, getAttributes, reset
    }
}   