import { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails";
import BlogForm from "../components/BlogForm";
import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";



const Home = () => {
    // const [blogs, setBlogs] = useState(null)
    const {blogs, dispatch}=useBlogsContext()
    const {user}=useAuthContext()


    useEffect(()=>{
        const fetchBlogs = async()=>{
            const response = await fetch('http://localhost:4000/blogs', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                // setBlogs(json)
                // getting blogs useng context
                dispatch({type: 'SET_BLOGS', payload:json})
            }
        }
        if(user){
            fetchBlogs()
        }
        
    },[dispatch,user])

    return ( 
    <div className="home">
        <div className="blogs">
            {blogs && blogs.map((blog)=>(
                <BlogDetails  key={blog._id} blog={blog}/>
            ))}

        </div>
        <BlogForm/>
    </div> 
    );
}
 
export default Home;