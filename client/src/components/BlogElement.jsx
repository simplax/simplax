import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BlogElement({ blogs }) {

  const [hover, setHover] = useState(null)

  return (
    <div>
      {
        blogs.map(blog => {
          let newBlogContent = blog.blogContent.replace(/class/g, "className")

          return (<div key={blog._id} className='blog-block mt-3 px-5 py-3 mx-5'
          >
            <h3><i class="fas fa-highlighter pr-3"></i>  <span className='blog-title'>{blog.title}</span></h3>


            {console.log(newBlogContent)}

            <div dangerouslySetInnerHTML={{ __html: newBlogContent }} className={'blog-content'}
            />

            <div className={'button-position'}>

              <Link to={`/edit-blog/${blog._id}`}><i class="fas fa-2x fa-pencil-alt"></i></Link>
              <button onClick={e => this.deleteCountry(blog._id)}><i class="fas fa-eraser fa-2x"></i></button>
            </div>
          </div>)
        })
      }


    </div>

  )
}