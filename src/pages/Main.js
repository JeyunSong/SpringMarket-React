import { Link } from "react-router-dom";
import "./main.css";
import { useCallback, useEffect, useState } from "react";
import { reqeustDashboard } from "../axios";

const Main = () => {
  const [dashboard, setDashboard] = useState(null);
  const [filter, setFilter] = useState();

  const updateUi = useCallback(
    async (e) => {
      e?.preventDefault();

      const response = await reqeustDashboard(filter);

      setDashboard(response.data.check.data);
    },
    [filter]
  );

  useEffect(() => {
    updateUi();
  }, []);

  console.log(filter)

  return (
    <div className="mainContainer">

    <div className="filterContainer">
      <h2 className="logo">
        Spring Market
      </h2>
      
      {/* <Link to={"/login"}>로그인</Link>
      <Link to={"/join"}>회원가입</Link> */}

    
      {/* 필터링 부분 시작 */}
      <form onSubmit={updateUi}>

      <div>
        카테고리 : 
        <select
          onChange={(e) => {
            const { value } = e.target;

            setFilter({ ...filter, category: value });
          }}
        >
          <option value={"아우터"}>아우터</option>
          <option value={"상의"}>상의</option>
          <option value={"하의"}>하의</option>
          <option value={"신발"}>신발</option>
          <option value={"원피스"}>원피스</option>
        </select>
      </div>

        <select
          onChange={(e) => {
            const { value } = e.target;

            setFilter({ ...filter, stock: value });
          }}
        >
          <option value={1}>품절상품 포함</option>
          <option value={0}>품절상품 미포함</option>
        </select>

        <div>
          최소 금액 :
        <input
          onChange={(e) => {
            const { value } = e.target;
            setFilter({ ...filter, minPrice: Number(value) });
          }}
        />
        </div>

        <div>
          최대 금액 :
        <input
          onChange={(e) => {
            const { value } = e.target;
            setFilter({ ...filter, maxPrice: Number(value) });
            
          }}
        />
        </div>
      
        <div>
          키워드 :
        <input
          onChange={(e) => {
            const { value } = e.target;
            setFilter({ ...filter, keyword: value });
          }}
        />
        </div>

      <div>
        정렬 :
        <select
          onChange={(e) => {
            const { value } = e.target;

            setFilter({ ...filter, sorting: value });
          }}
        >
          <option value={"조회순"}>조회순</option>
          <option value={"날짜순"}>날짜순</option>
          <option value={"10대"}>10대</option>
          <option value={"20대"}>20대</option>
          <option value={"30대"}>30대</option>
          <option value={"40대 이상"}>40대 이상</option>
        </select>
      </div>

        <button>갱신</button>
      </form>
      </div>
      {/* 필터링 부분 종료 */}

      {/* 상품 리스트 부분 시작 */}
      <ul className="card_list">
        {dashboard?.content.map((item, idx) => {
          return (
            <li key={idx} className="card">
              <img src={item.photo}></img>
              <p>title : {item.title}</p>
              <p>price : {item.price}</p>
              <p>productId : {item.productId}</p>
              <p>view : {item.view}</p>
              <Link to={"/detail"} state={item.productId}>상세페이지</Link>
            </li>
          );
        })}
      </ul>
      {/* 상품 리스트 부분 종료 */}
    </div>
  );
};

export default Main;
