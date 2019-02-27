import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../../api';

export default class EditBlog extends React.Component {
  constructor(props) {
    super(props)
    super(props)
    this.state = {
      text: '',
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  componentDidMount() {
    api.getBlogPostDetail(this.props.match.params.id)
      .then(data => this.setState({ text: data.blogpost.blogContent, title: data.blogpost.title }))


  }

  handleChange(value) {
    this.setState({ text: value })
  }

  handleClick(e) {
    e.preventDefault()

    let data = { title: this.state.title, blogContent: this.state.text }
    api.updateBlogPost(this.props.match.params.id, data)
      .then(() => console.log('done'))
  }

  handleTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="title">title:</label>
          <input type="text" name='title' onChange={e => this.handleTitleChange(e)} value={this.state.title} />
          <ReactQuill value={this.state.text}
            onChange={this.handleChange} theme="snow" modules={this.modules}
            formats={this.formats} placeholder={'new blogpost'} />
          <button className="btn btn-primary mt-5" onClick={this.handleClick} type='submit' >Update post</button>
        </form>
      </div>
    )
  }
}