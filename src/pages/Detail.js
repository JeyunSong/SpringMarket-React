import { useLocation } from "react-router-dom";
import { reqeustDetail, reqeustAddCart, reqeustOrder } from "../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./detail.css";

const INIT = {
  productId: "",
  orderNum: 1,
};

const Detail = () => {
  const location = useLocation();
  console.log(location);
  const [res, setRes] = useState({});
  const [orderRequestDto, setOrderRequestDto] = useState(INIT);
  // const userError = new HttpError(errorCode, ERROR_MESSAGE_MAP[ACCESS_DENIED_EXCEPTION])


  const detail = async () => {
    const response = await reqeustDetail(location.state);
    return setRes(response);
  };

  const addCart = async (e) => {
    e?.preventDefault();
    console.log(info?.productId);
    try {
      await reqeustAddCart(info?.productId);
      alert("장바구니 추가 완료");
    } catch (error) {
      const msg = error.response.data.check.msg
      alert(msg);
    } 
  };

  const order = async (e) => {
    e?.preventDefault();
    console.log(orderRequestDto);
    try {
      await reqeustOrder(orderRequestDto);
      alert("주문 완료");
    } catch (error) {
      const msg = error.response.data.check.msg
      alert(msg);
    }
  };

  useEffect(() => {
    detail();
  }, []);

  const info = res.data?.check.data;

  return (
    <div className="container">

      <div>
        <img src={info?.photo}></img>
      </div>
      <div className="detailTitle">{info?.title}</div>
      <div>{info?.content}</div>
      <div>{info?.price}🪙</div>

      <div>
        <form onSubmit={addCart}>
          <button className="detailAddCart">장바구니 추가</button>
        </form>
      </div>

      <div>
        <form onSubmit={order}>
          <button className="detailOrder">주문하기</button>
          <select className="detailOrderSelect"
                onChange={(e) => {
                  const { value } = e.target;
                  setOrderRequestDto({ ...orderRequestDto, productId: info?.productId, orderNum: Number(value) }); }}>
                <option value={-1}>수량</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
        </form>
      </div>

      <div className="detailReturn">
      <Link
      style={{ textDecoration: "none", color: "black" }}
      to={"/"}>Return</Link>
      </div>

    </div>
  );
};

export default Detail;
