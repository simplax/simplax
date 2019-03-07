import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../api";

export default class EditBlog extends React.Component {
  constructor(props) {
    super(props);
    super(props);
    this.state = {
      text: "",
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code",
    "script",
    "code-block",
    "background",
    "font",
    "align"
  ];

  componentDidMount() {
    api
      .getBlogPostDetail(this.props.match.params.id)
      .then(data => this.setState({ text: data.blogpost.blogContent, title: data.blogpost.title }));
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  handleClick(e) {
    e.preventDefault();

    let data = { title: this.state.title, blogContent: this.state.text };
    api.updateBlogPost(this.props.match.params.id, data).then(() => console.log("done"));
  }

  handleTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="EditBlog">
        <div className="container mt-5 pt-5">
          <form action="">

            <input
              type="text"
              name="title"
              onChange={e => this.handleTitleChange(e)}
              value={this.state.title}
              className='mb-3 form-control bg-dark-light text-light'
            />
            <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              theme="snow"
              modules={this.modules}
              formats={this.formats}
              placeholder={"new blogpost"}
            />
            <div className='d-flex justify-content-center'>

              <button className="btn btn-primary mt-5" onClick={this.handleClick} type="submit">
                <i class="fas fa-edit fa-2x"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
