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

  const isMobile = Helper.checkDevice()

  return (
    <div className="overlay">
      <div className="login-box bg-white p-3 shadow">
        <div>
          <input
            name="uid"
            type="text"
            className="form-control my-3"
            value={u_id}
            onChange={onChange}
            maxLength="10"
            placeholder="User ID"
          />
          <button
            className="btn btn-primary my-2"
            type="button"
            onClick={userLogin}
          >
            Login using ID
          </button>
        </div>
        {isMobile && (
          <div>
            <button
              className="btn btn-primary my-2"
              type="button"
              onClick={props.showScanner}
            >
              Login using QR Code
            </button>
          </div>
        )}
        <div>
          <button
            className="btn btn-secondary my-2"
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
