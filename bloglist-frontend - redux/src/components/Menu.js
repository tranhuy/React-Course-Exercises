import { Link } from "react-router-dom"

const Menu = ({ username, logoutHandler }) => {
    const menuStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#d2d2d3',
        padding: 5
    }

     return (
        <div style={menuStyle}>
            <Link to="/">Blogs</Link> |
            <Link to="/users">Users</Link>
            <div style={{marginLeft: 'auto'}}>
                <strong>{username} logged in </strong>
                <Link to='/'>
                    <button onClick={logoutHandler}>Logout</button>
                </Link>        
            </div>    
        </div>
     )
}

export default Menu