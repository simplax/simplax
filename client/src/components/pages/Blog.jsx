import React from 'react';
import api from '../../api';
import { Link } from "react-router-dom";



export default class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { blogs: [], abc: "<h1>hi Min <h1>" }
    this.deleteCountry = this.deleteCountry.bind(this)
  }

  componentDidMount() {
    api.getBlogPost()
      .then(data => this.setState({ blogs: data }))
  }

  deleteCountry(blogId) {
    api.deleteBlogPost(blogId)
      .then(() => this.setState({ blogs: this.state.blogs.filter(blog => blog._id !== blogId) }))
  }

  render() {

    return (
      <div>
        {this.state.blogs.map((blog) => (
          <div key={blog._id} style={{ border: '1px solid black' }}>
            {blog.title}
            <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
            <Link to={`/edit-blog/${blog._id}`}>Edit</Link>
            <button onClick={e => this.deleteCountry(blog._id)}>Delete</button>
          </div>
        ))}
      </div>
    )
  }
}