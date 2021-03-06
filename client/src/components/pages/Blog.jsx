import React from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import BlogElement from '../BlogElement'

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [] };
    this.deleteBlogPost = this.deleteBlogPost.bind(this)
  }

  componentDidMount() {
    api.getBlogPost().then(data => this.setState({ blogs: data }));
  }

  deleteBlogPost(blogId) {
    api
      .deleteBlogPost(blogId)
      .then(() => this.setState({ blogs: this.state.blogs.filter(blog => blog._id !== blogId) }));
  }

  render() {
    return (
      <div className="Blog">
        <div className="container blog-container">
          <BlogElement blogs={this.state.blogs} handleDelete={this.deleteBlogPost} />
        </div>
      </div>
    );
  }
}
