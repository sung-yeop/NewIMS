import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./Home.scss";

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("setup (with []) :", count); // 현재 count 값을 로그로 출력
    return () => {
      console.log("cleanup (with []) :", count); // cleanup 시점의 count 값을 로그로 출력
    };
  }, []);

  useEffect(() => {
    console.log("updated count (with count):", count);
  }, [count]);

  // Fiber Node를 접근하는 useEffect

  return (
    <div className="Home" id="example">
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h1>Inventory Management System</h1>
      <div>
        <span>
          1. 재고 관리 : 현재 시스템에 등록된 재고 현황을 확인하는 페이지
        </span>
        <span>
          2. 재고 추가 : 현재 시스템에 재고를 직접적으로 등록하는 페이지
        </span>
        <span>
          3. 재고 이동 : 현재 시스템에 등록된 재고 현황을 확인 & 다른
          로케이션으로 특정 수량의 재고를 이동하는 페이지
        </span>
        <span>
          4. 입고 현황 : 발주한 상품들의 현황 & 발주 상품을 재고 시스템에 등록한
          현황을 확인하는 페이지
        </span>
        <span>5. 발주 : 시스템에 등록하고자 하는 상품들을 요청하는 페이지</span>
        <span>
          6. 입고 : 발주로부터 요청된 재고들을 시스템에 등록하는 페이지
        </span>
      </div>
    </div>
  );
};

// React 18을 사용 중인 경우
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Home />);

// React 17을 사용 중인 경우
// ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;
