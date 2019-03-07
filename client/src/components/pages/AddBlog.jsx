import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../api";

export default class AddBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: ""
    }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
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
      ["link", "video"],
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
    "align",
    "video"
  ];

  handleChange(value) {
    this.setState({ text: value });
  }

  handleClick(e) {
    e.preventDefault();

    let data = { title: this.state.title, blogContent: this.state.text };
    api
      .postBlogPost(data)
      .then(() => {
        console.log("SUCCESS!");
        this.setState({ title: "", text: "" });
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  handleTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="AddBlog">
        <div className="container mt-5 pt-5">
          <form action="">

            <input
              type="text"
              name="title"
              className='mb-3 form-control bg-dark-light text-light'
              onChange={e => this.handleTitleChange(e)}
              value={this.state.title}
              placeholder='blog title'
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
                <i class="fab fa-2x fa-telegram-plane"></i>
              </button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}
