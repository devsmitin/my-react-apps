import React, { useState } from "react";
import { taskerConf } from "../../config";
import * as Helper from "../../Helper";

const ListItem2 = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    props.buttons.update(props.index);
  };

  const letters = Helper.aRandomLetter() + Helper.aRandomLetter();

  return (
    <div
      className="task-list-item theme-bg theme-radius p-3 mb-3"
      data-key={props.index}
    >
      {taskerConf.addTitle && (
        <>
          <h4 className="title fw-bold">{props.item.title}</h4>
          <hr className="my-1" />
        </>
      )}
      <div className="details mb-2 h6 fw-bold">{props.item.details}</div>
      <div className="footer d-flex">
        <div className="button-group" role="group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={checked}
              id={`chk_${checked ? `open_` : `` + letters}`}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={`chk_${checked ? `open_` : `` + letters}`}
            >
              <span className="visually-hidden">
                {props.item.done ? `Uncheck` : `Check`}
              </span>
            </label>
          </div>
        </div>
        <span className="text-muted" title={Helper.handleDate(props.item.time)}>
          {Helper.handleDate(props.item.time, "dd/mm/yyyy")}
        </span>
      </div>
    </div>
  );
};

export default ListItem2;
