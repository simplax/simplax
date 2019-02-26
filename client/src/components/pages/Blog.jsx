import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default class Quill extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
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

  handleChange(value) {
    this.setState({ text: value })
  }

  handleClick() {

  }

  render() {
    return (
      <div style={{}}>
        <form action="">
          <label htmlFor="title">title:</label>
          <input type="text" name='title' />
          <ReactQuill value={this.state.text}
            onChange={this.handleChange} theme="snow" modules={this.modules}
            formats={this.formats} placeholder={'new blogpost'} />
          <button className="btn btn-primary mt-5" onClick={this.handleClick} type='submit' >Add post</button>
        </form>

      </div>
    )
  }
}

