import { useState } from "react"
import { useField } from "../hooks"
import InputWithReset from "../components/InputWithReset"

const CreateNew = (props) => {
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()

        props.addNew({            
            // content: content.ref.current.value,
            // author: author.ref.current.value,
            // info: info.ref.current.value,

            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
    }

    const resetForm = (e) => {
        e.preventDefault()
        
        content.reset()
        author.reset()
        info.reset()

        // content.ref.current.value = ''
        // author.ref.current.value = ''
        // info.ref.current.value = ''
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '5px'}}>
                    Content <input {...content.getAttributes()} />
                </div>
                <div style={{ marginBottom: '5px'}}>
                    Author <input {...author.getAttributes()} />
                </div>
                <div style={{ marginBottom: '5px'}}>
                    Url for more info <input {...info.getAttributes()} />
                </div>
                <button>CREATE</button> <button onClick={(e) => resetForm(e)}>RESET</button>
            </form>
        </div>
    )
}

export default CreateNew