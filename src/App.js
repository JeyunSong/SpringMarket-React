import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Detail from "./pages/Detail";
import Mypage from "./pages/Mypage";
import OrderHistory from "./pages/OrderHistory";
import RankingBoard from "./pages/RankingBoard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/omg" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/mycart" element={<Mypage />} />
          <Route path="/myorder" element={<OrderHistory />} />
          <Route path="/" element={<RankingBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
