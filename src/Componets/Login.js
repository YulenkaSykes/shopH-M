import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../App";

const Login = () => {
  const { data, dispatch } = useContext(Context);
  const [userData, setUserData] = useState({});
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
          data.users.find(
            (user) =>
              user.login === userData.login &&
              user.password === userData.password
          )
            ? dispatch({ type: "login", payload: userData })
            : alert("User is not find");

          setUserData({ login: "", password: "" });
        }}
      >
        Click
      </button>
      {data.user?.login && <Redirect to="/product" />}
    </div>
  );
};

export default Login;
