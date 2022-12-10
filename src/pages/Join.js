import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestSignup } from "../axios";
import "./login.css";

const INIT = {
  email: "",
  password: "",
  age: "",
};

const Join = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(INIT);

  console.log(userInfo)

  const setValue = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const signUp = async (e) => {
    e.preventDefault();

    try {
      await requestSignup(userInfo);

      alert("회원가입에 성공하였습니다.");
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="wrap">

      <h2>
      <Link style={{ textDecoration: "none", color: "black" }}
      to={"/"}>Spring Market</Link>
      </h2>
      <div className="loginContainer">
      <form onSubmit={signUp}>
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


        <div>
        <label className="label">Age : </label>
          <select className="input_pw"
                  name={"age"} onChange={setValue}
                >
                  <option value={"10대"}>10대</option>
                  <option value={"20대"}>20대</option>
                  <option value={"30대"}>30대</option>
                  <option value={"40대 이상"}>40대 이상</option>
                </select>

        </div>

        <button className="button">회원가입</button>
      </form>
      <button className="button">
        <Link style={{ textDecoration: "none", color: "black" }}
        to={"/login"}>로그인</Link>
      </button>
      </div>

    </div>
  );
};

export default Join;
