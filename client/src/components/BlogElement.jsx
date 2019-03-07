import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function BlogElement({ blogs }) {

  const [hover, setHover] = useState(null)

  return (
    <div>
      {
        blogs.map(blog => {
          let newBlogContent = blog.blogContent.replace(/class/g, "className")

          return (<div key={blog._id} className='blog-block mt-3 px-5 py-3 mx-5'
          >
            <h3><i className="fas fa-highlighter pr-3"></i>  <span className='blog-title'>{blog.title}</span></h3>


            {console.log(newBlogContent)}

            <div dangerouslySetInnerHTML={{ __html: newBlogContent }} className={'blog-content'}
            />

            <div className={'button-position'}>
              {api.isAdmin() &&
                <Link to={`/edit-blog/${blog._id}`}><i className="fas fa-2x fa-pencil-alt"></i></Link>}
              {api.isAdmin() && <button onClick={e => this.deleteBlogPost(blog._id)}><i className="fas fa-eraser fa-2x"></i></button>}
            </div>
          </div>)
        })
      }


    </div>

  )
}