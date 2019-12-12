import React, { Component } from "react";

class List extends Component {
  render() {
    return (
      <ul className="list-group mb-3 scroll-list">
        <li className="list-group-item scroll-list-title">
          <h5 className="mb-0">{this.props.title}</h5>
        </li>
        {this.props.items.map((item, index) => (
          <li key={index} className="list-group-item">
            <span>
              {index + 1}. {item}
            </span>
            <div className="btn-group btn-group-sm float-right" role="group">
              {this.props.btn1 ? (
                <button
                  type="button"
                  className={"btn btn-" + this.props.btn1Class}
                  onClick={() => this.props.btn1(index)}
                >
                  {this.props.btn1Title}
                </button>
              ) : (
                ""
              )}
              {this.props.btn2 ? (
                <button
                  type="button"
                  className={"btn btn-" + this.props.btn2Class}
                  onClick={() => this.props.btn2(index)}
                >
                  {this.props.btn2Title}
                </button>
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
