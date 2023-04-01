import { BlogsContext } from "../context/BlogContext";
import { useContext } from "react";

export const useBlogsContext = () =>{
    const context = useContext(BlogsContext)

    

    return context
}

