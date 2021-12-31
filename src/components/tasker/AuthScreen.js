import React, { useState } from "react";
import * as Helper from "../../Helper";

export default function AuthScreen(props) {
  const [u_id, setUid] = useState("");

  const onChange = (e) => {
    setUid(e.target.value);
  };

  const userLogin = () => {
    let user = "dz_" + u_id;
    props.login(user);
  };

  const isMobile = Helper.checkDevice();

  return (
    <div className="overlay">
      <div className="card login-box rounded bg-white p-3 shadow-lg text-center">
        <h5 className="card-title">Login</h5>
        <div className="input-group mb-3">
          <input
            name="uid"
            type="text"
            className="form-control"
            value={u_id}
            onChange={onChange}
            maxLength="10"
            placeholder="User ID"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={userLogin}>
              Login using ID
            </button>
          </div>
        </div>
        {isMobile && false && (
          <div className="mb-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={props.showScanner}
            >
              Login using QR Code
            </button>
          </div>
        )}
        <p>Or</p>
        <div className="mb-3">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={props.setNewUser}
          >
            New User
          </button>
        </div>
      </div>
    </div>
  );
}
