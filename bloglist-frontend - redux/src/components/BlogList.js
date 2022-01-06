import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const BlogList = ({ loggedInUserId }) => {
    const blogs = useSelector(state => state.blog)

    return (
        <>
            <section style={{marginTop: '10px'}}>
                {
                    blogs && blogs.map(blog => 
                            <Blog key={blog.id} blog={blog} canDelete={loggedInUserId == blog.user.id} />)
                }    
            </section>        
        </>
    )
}

export default BlogList