import React, { Component } from "react";

class List extends Component {
  handleDate = (date, length) => {
    let d = new Date(date);
    let strDate;
    length === "full"
      ? (strDate =
          d.getDate() +
          "/" +
          (d.getMonth() + 1) +
          "/" +
          d.getFullYear() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes() +
          ":" +
          d.getSeconds())
      : (strDate =
          d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
    return strDate;
  };

  render() {
    return (
      <ul className="list-group mb-2 mb-md-3">
        <li className="list-group-item">
          <h5 className="mb-0">
            <strong>{this.props.title}</strong>
            <span className="badge badge-secondary float-right">
              {this.props.items ? this.props.items.length : 0}
            </span>
          </h5>
        </li>

        {/* {console.log(this.props)} */}
        {this.props.items &&
          this.props.items.map((item, index) => (
            <li key={index} className="list-group-item" data-key={index}>
              <div className="mb-3">
                <h6 className="font-weight-bold">
                  {index + 1}. {item.title}
                </h6>
                <p className="details">{item.details}</p>
              </div>
              <div className="btn-group btn-group-sm" role="group">
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
              <span
                className="btn btn-sm float-right disabled"
                title={this.handleDate(item.time, "full")}
              >
                {this.handleDate(item.time)}
              </span>
            </li>
          ))}
      </ul>
    );
  }
}

export default List;
