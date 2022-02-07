import React from "react";
import ListItem from "./ListItem";

const List = (props) => {
  return (
    <div className="list-group mb-3">
      <div className="list-group-item">
        <h5 className="mb-0">
          <strong>{props.title}</strong>
          <span className="badge badge-secondary float-right">
            {props.items ? props.items.length : 0}
          </span>
        </h5>
      </div>

      {props.items &&
        props.items.map((item, index) => (
          <ListItem
            key={index}
            index={index}
            item={item}
            buttons={props.buttons}
          />
        ))}
    </div>
  );
};

export default List;
