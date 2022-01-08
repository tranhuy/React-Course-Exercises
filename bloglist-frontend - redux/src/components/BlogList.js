import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
    //const blogs = useSelector(state => state.blog)
    const blogStyle = {
        padding: 6,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5,
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 5
      }
    
    return (
        <>
            <h4>Blogs</h4>
            <section style={{marginTop: '10px'}}>
                {
                    blogs && blogs.map(blog => 
                        <p key={blog.id} style={blogStyle}><Link to={`blogs/${blog.id}`}>{blog.title} - {blog.author}</Link></p>)
                }    
            </section>        
        </>
    )
}

export default BlogList