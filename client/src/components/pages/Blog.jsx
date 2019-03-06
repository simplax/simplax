import React from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [], abc: "<h1>hi Min <h1>" };
    this.deleteCountry = this.deleteCountry.bind(this);
  }

  componentDidMount() {
    api.getBlogPost().then(data => this.setState({ blogs: data }));
  }

  deleteCountry(blogId) {
    api
      .deleteBlogPost(blogId)
      .then(() => this.setState({ blogs: this.state.blogs.filter(blog => blog._id !== blogId) }));
  }

  render() {
    return (
      <div className="Blog">
        <div className="container">
          {this.state.blogs.map(blog => (
            <div key={blog._id} className='blog-block mt-3 px-5 py-3'>
              <h3><i class="fas fa-highlighter pr-3"></i>{blog.title}</h3>

              <div dangerouslySetInnerHTML={{ __html: blog.blogContent }} />
              <div className={'button-position'}>

                <Link to={`/edit-blog/${blog._id}`}><i class="fas fa-2x fa-pencil-alt"></i></Link>
                <button onClick={e => this.deleteCountry(blog._id)}><i class="fas fa-eraser fa-2x"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
