import { useState } from 'react'
import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from '../hooks/useAuthContext';

const BlogForm = () => {
  // to keep the ui aligned with the data
  const {dispatch}=useBlogsContext()
  const {user} = useAuthContext()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
      setError("You must be logged in")
      return
    }

    const blog = {title, text, author}
    
    const response = await fetch('http://localhost:4000/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setText('')
      setAuthor('')
      console.log('new blog added:', json)
      // to keep the ui aligned with the data, json - added blog
      dispatch({type: 'CREATE_BLOG', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Blog</h3>

      <label>Blog Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Enter Text:</label>
      <input 
        className='text-box'
        type="text" 
        onChange={(e) => setText(e.target.value)} 
        value={text}
      />

      <label>Author:</label>
      <input 
        type="text" 
        onChange={(e) => setAuthor(e.target.value)} 
        value={author} 
      />

      <button>Add Blog</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BlogForm