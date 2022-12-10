import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://43.200.2.93",
});

instance.interceptors.request.use((config) => {
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});


/*  회원 관리  */

// 회원가입
export const requestSignup = async (userInfo) => {
  await instance.post("/api/signup", userInfo);
};

// 로그인
export const requestLogin = async (userInfo) => {
  const response = await instance.post("/api/login", userInfo);

  return response;
};



/*  메인 페이지  */

// 필터링 조회
export const reqeustDashboard = async (filter) => {
  const response = await instance.get("/api/products", {
    params: filter,
  });
  return response;
};

// 상세 조회
export const reqeustDetail = async (productId) => {
  const response = await instance.get("/api/products/"+productId);
  return response;
};

// 키워드 조회
export const reqeustKeyword = async (keyword) => {
  const response = await instance.get("/api/products/keyword", {
    params: keyword 
  });
  return response;
};



// 아우터 랭킹보드
export const reqeustRankingBoard1 = async () => {
  const response = await instance.get("/api/rank/list/1");
  return response;
};

// 상의 랭킹보드
export const reqeustRankingBoard2 = async () => {
  const response = await instance.get("/api/rank/list/2");
  return response;
};

// 하의 랭킹보드
export const reqeustRankingBoard3 = async () => {
  const response = await instance.get("/api/rank/list/3");
  return response;
};

// 신발 랭킹보드
export const reqeustRankingBoard4 = async () => {
  const response = await instance.get("/api/rank/list/4");
  return response;
};

// 원피스 랭킹보드
export const reqeustRankingBoard5 = async () => {
  const response = await instance.get("/api/rank/list/5");
  return response;
};

// 랭킹보드
export const reqeustRankingBoard = async (categoryId, preferId) => {
  const response = await instance.get("/api/rank/list/" + categoryId + "/" + preferId);
  return response;
};




/*  장바구니  */

// 카트 추가
export const reqeustAddCart = async (productId) => {
  const response = await instance.get("/api/cart/"+productId);
  return response;
};

// 카트 조회
export const reqeustMypage = async () => {
  const response = await instance.get("/api/cart/list");
  return response;
};

// 카트 삭제
export const reqeustDelCart = async (productId) => {
  const response = await instance.delete("/api/cart/"+productId);
  return response;
};

// 카트 주문
export const reqeustCartOrder = async (item) => {
  const response = await instance.post("/api/cart/order", item);
  return response;
};




/*  주문  */

// 상품 주문
export const reqeustOrder = async (orderRequestDto) => {
  const response = await instance.post("/api/order", orderRequestDto);
  return response;
};

// 주문 취소
export const reqeustDelOrder = async (orderId) => {
  const response = await instance.patch("/api/order/"+orderId);
  return response;
};

// 주문 조회
export const reqeustOrderlist = async () => {
  const response = await instance.get("/api/order/list");
  return response;
};