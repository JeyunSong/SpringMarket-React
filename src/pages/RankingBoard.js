import { Link } from "react-router-dom";
import "./ranking.css";
import { useCallback, useEffect, useState } from "react";
import {reqeustDashboard,reqeustRankingBoard,reqeustKeyword} from "../axios";

const Main = () => {
  const [res, setRes] = useState(null);
  const [filter, setFilter] = useState();
  const [colorState, setColorState] = useState(1);
  const [colorStatePrefer, setColorStatePrefer] = useState(1);
  const [filterState, setFilterState] = useState(true);
  const [categoryId, setCategoryId] = useState(1);
  const [preferId, setPreferId] = useState(1);
  const [keyword, setKeyword] = useState(null);


  const rankingBoard = useCallback(async (e) => {
    e?.preventDefault();
    console.log(categoryId, preferId)

    const response = await reqeustRankingBoard(categoryId, preferId);
    return setRes(response.data.check.data);
  });

  const updateUi = useCallback(
    async (f) => {
      f?.preventDefault();

      try {
        const response = await reqeustDashboard(filter);
        setRes(response.data.check.data.content);
      } catch (error) {
        const msg = error.response.data.check.msg
        alert(msg);
      }
    },
    [filter]
  );


  const thisKeyword = useCallback(
    async (f) => {
      f?.preventDefault();

      try {
        const response = await reqeustKeyword(keyword);
        setRes(response.data.check.data.content);
      } catch (error) {
        console.log(error);
        const msg = error.response.data.check.msg
        console.log(msg);
        alert(msg);
      }
    },
    [keyword]
  );

  useEffect(() => {
    rankingBoard();
  }, []);

  return (
    <div className="mainContainer">
      <div className="filterContainer">
        <h1 className="logo">
      <Link style={{ textDecoration: "none", color: "black" }}
      to={"/"}>Spring Market</Link>
      </h1>

        <div className="topButtonAlign">
          
          <div> 🚷 현재 폐쇄되고 황량한 클라이언트 페이지만 남은 상태입니다. </div>
          <div> + ReadMe 프로젝트 주요기능에서 영상 확인할 수 있습니다.</div>

          {localStorage.getItem("token") ? (
            <button className="topButton">
            <Link to={"/mycart"} style={{ textDecoration: "none", color: "black" }}>장바구니</Link>
          </button>) : null}

          {localStorage.getItem("token") ? (
            <button className="topButton">
            <Link to={"/myorder"} style={{ textDecoration: "none", color: "black" }}>주문내역</Link>
          </button>) : null}
          
          {localStorage.getItem("token") ? null : (
            <button className="topButton">
            <Link to={"/login"} style={{ textDecoration: "none", color: "black"}}>로그인</Link>
          </button>)}
        
          {localStorage.getItem("token") ? (
            <button className="topButton"
              onClick={() => {
                localStorage.removeItem("token");
                alert("로그아웃되었습니다.");
                window.location.reload();
              }}
            >
              로그아웃
            </button>
          ) : null}
        </div>

        <div className="rankingText">
        🔥Rainking Board🔥
        </div>

<div className="totalButton">

        
        <div className="rankingButton">
          
          <div>
            <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{
                  backgroundColor: colorState === 1 ? "lightgreen" : "white",
                }}
                onClick={ () => {
                  setColorState(1);
                  setCategoryId(1);
                }
                } 
              >
                재킷
              </button>
            </form>
          </div>

          <div>
            <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{
                  backgroundColor: colorState === 2 ? "lightgreen" : "white",
                }}
                onClick={ () => {
                  setColorState(2);
                  setCategoryId(2);
                }
                } 
              >
                상의
              </button>
            </form>
          </div>

          <div>
            <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{
                  backgroundColor: colorState === 3 ? "lightgreen" : "white",
                }}
                onClick={ () => {
                  setColorState(3);
                  setCategoryId(3);
                }
                } 
              >
                하의
              </button>
            </form>
          </div>

          <div>
            <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{
                  backgroundColor: colorState === 4 ? "lightgreen" : "white",
                }}
                onClick={ () => {
                  setColorState(4);
                  setCategoryId(4);
                }
                } 
              >
                신발
              </button>
            </form>
          </div>

          <div>
            <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{
                  backgroundColor: colorState === 5 ? "lightgreen" : "white",
                }}
                onClick={ () => {
                  setColorState(5);
                  setCategoryId(5);
                }
                } 
              >
                원피스
              </button>
            </form>
          </div>
        </div>

        <div className="preferButton">
          <div>
          <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{backgroundColor: colorStatePrefer === 1 ? "lightgreen" : "white",}}
                onClick={() => {
                  setPreferId(1);
                  setColorStatePrefer(1);
                }}>
                10대
              </button>
            </form>
        </div>
        <div>
          <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{backgroundColor: colorStatePrefer === 2 ? "lightgreen" : "white",}}
                onClick={() => {
                  setPreferId(2);
                  setColorStatePrefer(2);
                }}>
                20대
              </button>
            </form>
        </div>
        <div>
          <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{backgroundColor: colorStatePrefer === 3 ? "lightgreen" : "white",}}
                onClick={() => {
                  setPreferId(3);
                  setColorStatePrefer(3);
                }}>
                30대
              </button>
            </form>
        </div>
        <div>
          <form onSubmit={rankingBoard}>
              <button className="buttonBox2"
                style={{backgroundColor: colorStatePrefer === 4 ? "lightgreen" : "white",}}
                onClick={() => {
                  setPreferId(4);
                  setColorStatePrefer(4);
                }}>
                40대
              </button>
            </form>
        </div>
        </div>
        </div>
   

        

        <div style={{ display: filterState ? "flex" : "none" }}>

        <form onSubmit={thisKeyword}>
          <input className="keywordBox"
            onChange={(e) => {
              const { value } = e.target;
              setKeyword({ ...keyword, keyword: value });
            }}
          />
          <button className="buttonBox">
            <h2 className="buttonBox">🐸</h2>
            </button>
            <div>
              페이지 :
            <select className="filterBox3"
                onChange={(e) => {
                  const { value } = e.target;
                  setKeyword({ ...keyword, page: value });
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              </div>
        </form>
        </div>  

         <button className="filterButton2"
          onClick={() => setFilterState(false)}
          style={{ display: filterState ? "flex" : "none", cursor: "pointer" }}
        >
          Add Filter
        </button>
        
        {/* 필터링 조회 */}
        
        
      <div>
        <div style={{ display: filterState ? "none" : "flex" }}>
          <form onSubmit={updateUi}>
            <div className="filter">
              카테고리 :
              <select className="filterBox"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, categoryId: Number(value) });
                }}
              >
                <option value={1}>아우터</option>
                <option value={2}>상의</option>
                <option value={3}>하의</option>
                <option value={4}>신발</option>
                <option value={5}>원피스</option>
              </select>
            </div>

            <div className="filter">
              <select className="filterBox"
              onChange={(e) => {
                const { value } = e.target;

                setFilter({ ...filter, stock: value });
              }}
            >
              <option value={1}>품절상품 포함</option>
              <option value={0}>품절상품 미포함</option>
            </select>
            </div>
            

            <div className="filter">
              최소 금액 :
              <input className="filterBox2"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, minPrice: Number(value) });
                }}
              />
            </div>

            <div className="filter">
              최대 금액 :
              <input className="filterBox2"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, maxPrice: Number(value) });
                }}
              />
            </div>

            <div className="filter">
              키워드 :
              <input className="filterBox2"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, keyword: value });
                }}
              />
            </div>

            <div className="filter">
              정렬 :
              <select className="filterBox"
                onChange={(e) => {
                  const { value } = e.target;

                  setFilter({ ...filter, sorting: value });
                }}
              >
                <option value={"조회순"}>조회순</option>
                <option value={"날짜순"}>날짜순</option>
              </select>
            </div>
            <div>
              페이지 :
            <select className="filterBox3"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, page: Number(value) });
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              </div>
              <button className="filterButton">조회</button>
          </form>
        </div>

<div>
  {/* <form onSubmit={updateUiPage} >
              
            </form> */}
</div>
        

        </div>

        <button className="filterButton2"
          onClick={() => setFilterState(true)}
          style={{ display: filterState ? "none" : "flex", cursor: "pointer" }}
        >
          빠른 키워드 조회
        </button>

        {/* 필터링 조회 */}
      </div>

      <div className="box">
      <ul className="card_list">
        {res?.map((item, idx) => {
          return (
            <li key={idx} className="card">
              <div className="card2"> 
                <Link to={"/detail"} state={item.productId}>
                <img className="card3" src={item.photo}></img>
                </Link>
              </div>
              <p className="emphasisText">{item.title}</p>
              <p>{item.price}🪙</p>
            </li>
          );
        })}
      </ul>
      </div>

    </div>
  );
};

export default Main;
