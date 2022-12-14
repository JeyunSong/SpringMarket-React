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
          

          {localStorage.getItem("token") ? (
            <button className="topButton">
            <Link to={"/mycart"} style={{ textDecoration: "none", color: "black" }}>????????????</Link>
          </button>) : null}

          {localStorage.getItem("token") ? (
            <button className="topButton">
            <Link to={"/myorder"} style={{ textDecoration: "none", color: "black" }}>????????????</Link>
          </button>) : null}
          
          {localStorage.getItem("token") ? null : (
            <button className="topButton">
            <Link to={"/login"} style={{ textDecoration: "none", color: "black"}}>?????????</Link>
          </button>)}
        
          {localStorage.getItem("token") ? (
            <button className="topButton"
              onClick={() => {
                localStorage.removeItem("token");
                alert("???????????????????????????.");
                window.location.reload();
              }}
            >
              ????????????
            </button>
          ) : null}
        </div>

        <div className="rankingText">
        ????Rainking Board????
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
                ??????
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
                ??????
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
                ??????
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
                ??????
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
                ?????????
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
                10???
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
                20???
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
                30???
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
                40???
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
            <h2 className="buttonBox">????</h2>
            </button>
            <div>
              ????????? :
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
        
        {/* ????????? ?????? */}
        
        
      <div>
        <div style={{ display: filterState ? "none" : "flex" }}>
          <form onSubmit={updateUi}>
            <div className="filter">
              ???????????? :
              <select className="filterBox"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, categoryId: Number(value) });
                }}
              >
                <option value={1}>?????????</option>
                <option value={2}>??????</option>
                <option value={3}>??????</option>
                <option value={4}>??????</option>
                <option value={5}>?????????</option>
              </select>
            </div>

            <div className="filter">
              <select className="filterBox"
              onChange={(e) => {
                const { value } = e.target;

                setFilter({ ...filter, stock: value });
              }}
            >
              <option value={1}>???????????? ??????</option>
              <option value={0}>???????????? ?????????</option>
            </select>
            </div>
            

            <div className="filter">
              ?????? ?????? :
              <input className="filterBox2"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, minPrice: Number(value) });
                }}
              />
            </div>

            <div className="filter">
              ?????? ?????? :
              <input className="filterBox2"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, maxPrice: Number(value) });
                }}
              />
            </div>

            <div className="filter">
              ????????? :
              <input className="filterBox2"
                onChange={(e) => {
                  const { value } = e.target;
                  setFilter({ ...filter, keyword: value });
                }}
              />
            </div>

            <div className="filter">
              ?????? :
              <select className="filterBox"
                onChange={(e) => {
                  const { value } = e.target;

                  setFilter({ ...filter, sorting: value });
                }}
              >
                <option value={"?????????"}>?????????</option>
                <option value={"?????????"}>?????????</option>
              </select>
            </div>
            <div>
              ????????? :
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
              <button className="filterButton">??????</button>
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
          ?????? ????????? ??????
        </button>

        {/* ????????? ?????? */}
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
              <p>{item.price}????</p>
            </li>
          );
        })}
      </ul>
      </div>

          <h4> ???? ?????? ???????????? ????????? ??????????????? ???????????? ?????? ???????????????. </h4>
          <div> + ReadMe ???????????? ?????????????????? ?????? ????????? ??? ????????????.</div>

    </div>
  );
};

export default Main;
