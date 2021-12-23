import { useState } from "react"

const CreateNew = (props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '5px'}}>
                    Content <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div style={{ marginBottom: '5px'}}>
                    Author <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div style={{ marginBottom: '5px'}}>
                    Url for more info <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
                </div>
                <button>CREATE</button>
            </form>
        </div>
    )
}

export default CreateNew