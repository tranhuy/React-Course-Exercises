import { Link } from "react-router-dom"

const Menu = () => {
    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <Link style={padding} to="/">Anecdotes</Link>
            <Link style={padding} to="/Create">Create New</Link>
            <Link style={padding} to="/About">About</Link>
        </div>
    )
}

export default Menu