import React from "react";
import { taskerConf } from "../../config";
import * as Helper from "../../Helper";

const renderButtons = (buttons, i) => {
  let html = [];
  buttons.forEach((btn, j) => {
    html.push(
      <button
        key={j}
        type="button"
        className={`btn btn-sm btn-${btn.type} rounded-pill`}
        onClick={() => btn.action(i)}
      >
        {btn.title}
      </button>
    );
  });
  return html;
};

const ListItem = (props) => {
  return (
    props && (
      <div className="list-group-item" data-key={props.index}>
        {taskerConf.addTitle && (
          <h6 className="title fw-bold">
            {props.item.title}
          </h6>
        )}
        {/* <hr className="my-1" /> */}
        <div className="details mb-2">{props.item.details}</div>
        <div className="footer d-flex mb-2">
          <div className="button-group" role="group">
            {renderButtons(props.buttons, props.index)}
          </div>
          <span
            className="btn btn-sm ms-auto text-muted"
            title={Helper.handleDate(props.item.time)}
          >
            {Helper.handleDate(props.item.time, "dd/mm/yyyy")}
          </span>
        </div>
      </div>
    )
  );
};

export default ListItem;
