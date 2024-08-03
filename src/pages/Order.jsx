import React from "react";
import { useContext } from "react";
import { OrderItemStateContext } from "./OrderApp";

// 주문을 등록, 삭제하는 기능만 존재한다
// 현재 등록한 발주 리스트를 모두 확인하면서 작업할 수 있어야 한다.
// 조회 버튼을 누르면 아이템을 입력할 필요 없이 수량만 입력하면 되도록 만든다?
const Order = () => {
  const test = useContext(OrderItemStateContext);

  return <div>{test}</div>;
};

export default Order;
