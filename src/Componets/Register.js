import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../App";

const Ragistr = () => {
  const { data, dispatch } = useContext(Context);
  const [userData, setUserData] = useState({});
  const [registered, setRegistered] = useState(false);

  return (
    <div className="register_Login row">
      <span>Name</span>
      <input
        className="input_r_l"
        value={userData.login}
        type="text"
        onChange={(e) => setUserData({ ...userData, login: e.target.value })}
      />
      <span>Password</span>
      <input
        className="input_r_l"
        value={userData.password}
        type="text"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button
        className="button_r_l"
        onClick={() => {
          dispatch({ type: "add", payload: userData });
          setUserData({ login: "", password: "" });
          setRegistered(true);
        }}
      >
        Click
      </button>
      {registered && <Redirect to="/login" />}
    </div>
  );
};

export default Ragistr;
