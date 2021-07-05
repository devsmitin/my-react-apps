import React, { Component } from "react";
import * as Helper from "../../Helper";

class List extends Component {
  handleDate = (time, format) => {
    return Helper.handleDate(time, format);
  };

  render() {
    return (
      <ul className="list-group mb-2 mb-md-3 rounded-0">
        <li className="list-group-item">
          <h5 className="mb-0">
            <strong>{this.props.title}</strong>
            <span className="badge badge-secondary float-right">
              {this.props.items ? this.props.items.length : 0}
            </span>
          </h5>
        </li>

        {this.props.items &&
          this.props.items.map((item, index) => (
            <li key={index} className="list-group-item" data-key={index}>
              <div className="mb-3">
                <h6 className="font-weight-bold">
                  {index + 1}. {item.title}
                </h6>
                <div className="details">{item.details}</div>
              </div>
              <div className="btn-group btn-group-sm" role="group">
                {this.props.btn1 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => this.props.btn1(index)}
                  >
                    {this.props.btn1Title}
                  </button>
                )}
                {this.props.btn2 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => this.props.btn2(index)}
                  >
                    {this.props.btn2Title}
                  </button>
                )}
              </div>
              <span
                className="btn btn-sm float-right disabled"
                title={this.handleDate(item.time)}
              >
                {this.handleDate(item.time, "dd/mm/yyyy")}
              </span>
            </li>
          ))}
      </ul>
    );
  }
}

export default List;
