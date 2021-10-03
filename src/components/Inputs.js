import React, { Component } from "react";

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value });
    }
  }

  onChange = (e) => {
    let { handler, id } = this.props;

    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ value }, () => {
      handler(id, value);
    });
  };

  render() {
    const { label, value, handler, ...inputProps } = this.props;
    const nontext_elms = ["textarea", "select", "checkbox", "radio"];
    return (
      <>
        {label && (
          <label htmlFor={inputProps.id} className="form-label">
            {label}:
          </label>
        )}

        {this.props.type === "textarea" && (
          <textarea
            value={this.state.value}
            onChange={this.onChange}
            {...inputProps}
          ></textarea>
        )}
        {!nontext_elms.includes(this.props.type) && (
          <input
            value={this.state.value}
            onChange={this.onChange}
            {...inputProps}
          />
        )}
      </>
    );
  }
}

export default Inputs;
