import { reqeustMypage, reqeustDelCart, reqeustCartOrder } from "../axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./mypage.css";

const Mypage = () => {
  const [res, setRes] = useState();
  const navigate = useNavigate();
  const [buyList, setBuyList] = useState([]); // 주문목록 리스트 state

  // "구매목록에 추가" 버튼 클릭시 실행되는 함수
  const onClickBuyList = (e) => {
    //중복 추가 방지 코드
    if (buyList.findIndex((item) => item.productId === e.target.value) !== -1) {
      return;
    } else {
      const { value } = e.target;
      setBuyList([...buyList, { orderNum: 1, productId: Number(value) }]);
    }
  };

  //수량 증가 함수
  const onChangeAdd = (id) => {
    const idx = buyList.findIndex((item) => item.productId === id);
    const Product = {
      orderNum: buyList[idx].orderNum + 1,
      productId: Number(buyList[idx].productId),
    };
    const newList = [...buyList];
    newList.splice(idx, 1, Product);
    setBuyList(newList);
  };

  //수량 감소 함수
  const onChangeMinus = (id) => {
    const idx = buyList.findIndex((item) => item.productId === id);

    const Product = {
      orderNum: buyList[idx].orderNum - 1,
      productId: buyList[idx].productId,
    };

    
    const newList = [...buyList];
    newList.splice(idx, 1, Product);
    setBuyList(newList);
  };

  //주문목록에서 삭제 버튼 클릭시 실행되는 함수
  const onDeleteBuyList = (id) => {
    const idx = buyList.findIndex((item) => item.productId === id);
    const newList = [...buyList];
    newList.splice(idx, 1);
    setBuyList(newList);
  };

  const onSubmitHandler = async () => {
    try {
      console.log(buyList)
      await reqeustCartOrder(buyList);
      window.location.reload();
      alert("주문이 성공적으로 완료되었습니다.");
    } catch (error) {
      alert("주문이 실패하였습니다.");
    }
  };

  const updateUi = useCallback(async (e) => {
    e?.preventDefault();
    try {
      const response = await reqeustMypage();
      setRes(response.data.check.data);
    } catch (error) {
      alert("카트에 상품이 없습니다.");
      navigate("/");
    }
  }, []);

  const delCart = async (id) => {
    try {
      console.log(id);
      await reqeustDelCart(id);
      window.location.reload();
      alert("장바구니에서 삭제되었습니다.");
    } catch (error) {
      alert("실패");
    }
  };

  useEffect(() => {
    updateUi();
  }, []);

  return (
    <div className="wrap">
      <Link style={{ textDecoration: "none", color: "black" }}
      to={"/"}>Return</Link>

      <h3 className="title">장바구니 🛒</h3>

      <ul className="card_list">
        {res?.map((item, idx) => {
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
              <p>price : {item.price}</p>
              <p>productId : {item.productId}</p>

              <label htmlFor={item.productId}></label>
              <button className="addCartOrder"
                name="check1"
                id={item.productId}
                value={item.productId}
                onClick={onClickBuyList}
              >
                구매 목록에 추가
              </button>
              <div>
                <button className="delCartOrder"
                onClick={() => delCart(item.productId)}>
                  장바구니에서 삭제
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        {buyList.map((item) => {
          return (
            <div className="cartOrderContainer"
              key={item.productId}
            >
              <div>상품번호 {item.productId} </div>
              <div>수량 {item.orderNum}
              <button className="plusButton"
              onClick={() => onChangeAdd(item.productId)}>
              ➕
              </button>
              <button className="minusButton"
              onClick={() => onChangeMinus(item.productId)}>
              ➖
              </button>
              </div>
              <div>
              <button className="delCartOrderList"
              onClick={() => onDeleteBuyList(item.productId)}>
                주문 목록에서 삭제
              </button>
              </div>
            </div>
          );
        })}
        <button className="orderButton"
        onClick={onSubmitHandler}>주문하기</button>
      </div>
    </div>
  );
};

export default Mypage;
