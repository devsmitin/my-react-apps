import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      maxLen: 240,
    };
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value,
    });
  };

  overflowAlert = () => {
    if (this.getRemainingChars() < 0) {
      return (
        <div className="alert alert-danger text-left mt-3 mb-0">
          Description Too Long.
        </div>
      );
    }
    return "";
  };

  getRemainingChars = () => {
    let chars = this.state.maxLen - this.state.details.length;
    return chars;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitForm(this.state.title, this.state.details);
    this.setState({
      title: "",
      details: "",
    });
    this.props.closeForm();
  };

  render() {
    let { title, details, maxLen } = this.state;
    return (
      <div className={"card shadow-sm mb-3 " + this.props.hasClass}>
        <div className="card-body">
          <h4 className="card-title">Add Tasks</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              name="title"
              type="text"
              className={
                "form-control mb-3" + (title.length === 50 ? " is-invalid" : "")
              }
              value={title}
              onChange={this.onChange}
              maxLength="50"
              placeholder="Title"
            />
            <textarea
              name="details"
              className={
                "form-control mb-3" +
                (details.length >= maxLen ? " is-invalid" : "")
              }
              value={details}
              onChange={this.onChange}
              rows="4"
              placeholder="Description"
            />
            <button
              className="btn btn-success me-2"
              disabled={
                title.trim().length === 0 ||
                details.trim().length === 0 ||
                details.length > maxLen
              }
            >
              Add
            </button>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={this.props.closeForm}
            >
              Cancel
            </button>
            <span className="btn float-right disabled">
              {maxLen - details.length}
            </span>
          </form>
          {this.overflowAlert()}
        </div>
      </div>
    );
  }
}
export default Form;
