import {createContext, useReducer} from 'react'

export const BlogsContext = createContext()

//          state = existing blogs, action=what to do 
export const blogsReducer = (state, action) => {
    switch (action.type){
        case 'SET_BLOGS':
            return{
                blogs: action.payload
            }
        case 'CREATE_BLOG':
            return {    //new blogs    +   existing blogs
                blogs: [action.payload, ...state.blogs]
            }
        case 'DELETE_BLOG':
                return {                                         // deleted blog
                    blogs: state.blogs.filter((blog)=>blog._id !== action.payload._id)
                }
        default:
            return state
    }
}

export const BlogsContextProvider = ({children}) =>{
    const [state, dispatch]=useReducer(blogsReducer, {
        blogs: null
    })

    // dispatch({type: "SET_BLOG", payload: })

    return (
        <BlogsContext.Provider value={{...state, dispatch}}>
            {children}
        </BlogsContext.Provider>
    )
}


