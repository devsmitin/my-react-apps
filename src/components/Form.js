import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      maxLen: 240
    };
  }

  onChange = event => {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
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

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitForm(this.state.title, this.state.details);
    this.setState({
      title: "",
      details: ""
    });
  };

  render() {
    return (
      <div className={"card shadow-sm mb-3 " + this.props.hasClass}>
        <div className="card-body">
          <h4 className="card-title">Add Tasks</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              name="title"
              type="text"
              className={
                "form-control mb-3" +
                (this.state.title.length === 50 ? " is-invalid" : "")
              }
              value={this.state.title}
              onChange={this.onChange}
              maxLength="50"
            />
            <textarea
              name="details"
              className={
                "form-control mb-3" +
                (this.state.details.length >= this.state.maxLen
                  ? " is-invalid"
                  : "")
              }
              value={this.state.details}
              onChange={this.onChange}
              rows="4"
            />
            <button
              className="btn btn-success mr-2"
              disabled={
                this.state.details.trim().length === 0 ||
                this.state.details.length > this.state.maxLen
              }
            >
              Add
            </button>
            <span className="btn float-right disabled">
              {this.state.maxLen - this.state.details.length}
            </span>
          </form>
          {this.overflowAlert()}
        </div>
      </div>
    );
  }
}
export default Form;
