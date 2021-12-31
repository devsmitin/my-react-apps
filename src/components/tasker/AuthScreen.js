import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Inputs from "../Inputs";

const AuthScreen = (props) => {
  const [u_id, setUid] = useState("");

  const onChange = (e) => {
    setUid(e.target.value);
  };

  const userLogin = () => {
    let user = "dz_" + u_id;
    props.login(user);
  };

  return (
    <div className="overlay">
      <div className="card login-box rounded bg-white p-3 shadow-lg text-center">
        <h5 className="card-title fw-bold my-4">Login</h5>
        <div className="input-group mb-4">
          <Inputs
            name="uid"
            type="text"
            className="form-control"
            value={u_id}
            onChange={onChange}
            maxLength="10"
            placeholder="User ID"
          />
          <button className="btn btn-primary" type="button" onClick={userLogin}>
            Login using ID
          </button>
        </div>
        {/* <p>Or</p> */}
        <div className="mb-3">
          <button
            className="btn btn-link"
            type="button"
            onClick={props.setNewUser}
          >
            New User? Click here
          </button>
          <NavLink className="btn btn-link" to={"/"} end>
            Return home
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default AuthScreen;
