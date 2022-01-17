import React, { useState } from "react";
import { taskerConf } from "../../config";
import Inputs from "../Inputs";

const NewTask = (props) => {
  const maxLen = 240;
  const [formValues, updateFormValues] = useState({
    title: "",
    details: "",
  });

  const inputsHandler = (e) => {
    updateFormValues({ [e.target.name]: e.target.value });
  };

  const overflowAlert = () => {
    let chars = maxLen - formValues.details.length;
    if (chars < 0) {
      return (
        <div className="alert alert-danger text-left mt-3 mb-0">
          Description Too Long.
        </div>
      );
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitForm(formValues.title, formValues.details);
    // updateFormValues({ title: "", details: "" }); // not needed as component unmounts 
    props.closeForm();
  };

  return (
    <div className="overlay">
      <div className={"card shadow-sm mb-3 " + props.hasClass}>
        <div className="card-body">
          <h4 className="card-title">Add Tasks</h4>
          <form onSubmit={handleSubmit}>
            {taskerConf.addTitle && (
              <Inputs
                name="title"
                type="text"
                className={
                  "form-control mb-3" +
                  (formValues.title.length === 50 ? " is-invalid" : "")
                }
                value={formValues.title}
                onChange={inputsHandler}
                maxLength="50"
                placeholder="Title"
              />
            )}

            <Inputs
              type="textarea"
              name="details"
              className={
                "form-control mb-3" +
                (formValues.details.length >= maxLen ? " is-invalid" : "")
              }
              value={formValues.details}
              onChange={inputsHandler}
              rows="4"
              placeholder="Description"
            />

            <div className="d-flex">
              <div className="button-group">
                <button
                  className="btn btn-sm btn-success rounded-pill me-2"
                  disabled={
                    // formValues.title.trim().length === 0 ||
                    formValues.details.trim().length === 0 || formValues.details.length > maxLen
                  }
                >
                  Add
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary rounded-pill me-2"
                  onClick={props.closeForm}
                >
                  Cancel
                </button>
              </div>
              <span className="btn ms-auto text-muted">
                {maxLen - formValues.details.length}
              </span>
            </div>
          </form>
          {overflowAlert()}
        </div>
      </div>
    </div>
  );
};

export default NewTask;
