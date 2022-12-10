import "./login.css";
import { useState } from "react";
import { requestLogin } from "../axios";
import { useNavigate, Link } from "react-router-dom";

const INIT = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(INIT);

  const setValue = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await requestLogin(userInfo);

      localStorage.setItem("token", response.headers.accesstoken);
      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (

  <div className="wrap">


      <h2>
      <Link style={{ textDecoration: "none", color: "black" }}
      to={"/"}>Spring Market</Link>
      </h2>
      
      <div className="loginContainer">
        <form onSubmit={login}>
        <div>
          <label className="label">Email : </label>
          <input className="input_id"
          type={"email"} name={"email"} onChange={setValue} />
        </div>
        <div>
          <label className="label">Password : </label>
          <input className="input_pw"
          type={"password"} name={"password"} onChange={setValue} />
        </div>
        <button className="button">로그인</button>
      </form>
      <button className="button">
      <Link style={{ textDecoration: "none", color: "black" }}
      to={"/join"}>회원가입</Link>
      </button>
      </div>
      
    </div>
  );
};

export default Login;
