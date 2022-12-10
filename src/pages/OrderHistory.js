import { reqeustOrderlist, reqeustDelOrder } from "../axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./mypage.css";


const OrderHistory = () => {
  const [res, setRes] = useState();
  const [orderId, setOrderId] = useState();
  const navigate = useNavigate();

  const updateUi = useCallback(
    async (e) => {
      e?.preventDefault();
        const response = await reqeustOrderlist();
        setRes(response.data.check.data);
    }
  );

  const delOrder = async (id) => {
    try {
      console.log(id)
      await reqeustDelOrder(id);
      alert("주문 취소");
      window.location.reload();
      
    } catch (error) {
      alert("실패");
      console.log(error)
    }
  };

  

  useEffect(() => {
    updateUi();
  }, []);

  return <div className="wrap">

    <Link style={{ textDecoration: "none", color: "black" }}
      to={"/"}>Return</Link>

      <h3 className="title"> 주문 내역 </h3>

    <ul className="card_list">
  {res?.content.map((item, idx) => {
    return (
      <li key={idx} className="card">

        <div className="productTitle">
              <Link
                to={"/detail"}
                state={item.productId}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>{item.title}</p>
              </Link>
              </div>

        <p>결제금액 : {item.price}</p>
        <p>주문일 : {item.orderTime}</p>
        <p>주문수량 : {item.orderNum}</p>
        <p>상태 : {item.orderStatus}</p>

        <div>
              <button className="delCartOrder" onClick={() => delOrder(item.orderId)}>주문 취소</button>
        </div>

      </li>
    );
  })}
</ul></div>;
};

export default OrderHistory;
