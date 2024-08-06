import React, { createContext, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { OrderItemDispatchContext } from "../App";
import OrderItem from "../components/orderComponents/OrderItem";
import Button from "../components/Button";
import OrderList from "../components/orderComponents/OrderList";

import "./Order.scss";

// 주문을 등록, 삭제하는 기능만 존재한다
// 현재 등록한 발주 리스트를 모두 확인하면서 작업할 수 있어야 한다.
// 조회 버튼을 누르면 아이템을 입력할 필요 없이 수량만 입력하면 되도록 만든다?

export const OrderedItemDispatchContext = createContext();

const Order = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  const { onOrderItem } = useContext(OrderItemDispatchContext);
  const checkBoxRef = useRef([]);

  const handleOrderItem = (orderItem) => {
    setOrderedItems((prevList) => {
      const index = prevList.findIndex(
        (prevItem) => prevItem.id === orderItem.id
      );

      if (index === -1) {
        return [...prevList, orderItem];
      } else {
        prevList[index].quantity =
          Number(prevList[index].quantity) + Number(orderItem.quantity);
        const updateList = [...prevList];
        return updateList;
      }
    });
  };

  const handleSaveButton = () => {
    orderedItems.map((orderItem) => {
      return onOrderItem(orderItem);
    });
    alert("저장되었습니다.");
    setOrderedItems([]);
  };

  const handleCheckBox = (id) => {
    const index = checkBoxRef.current.findIndex((arrayId) => arrayId === id);
    if (index === -1) {
      checkBoxRef.current.push(id);
    } else {
      checkBoxRef.current.splice(index, 1);
    }
  };

  const handleDeleteBox = () => {
    return setOrderedItems((prevList) => {
      console.log("prevList : ", prevList);
      return prevList.filter(
        (orderedItem) => !checkBoxRef.current.includes(orderedItem.id)
      );
    });
  };

  return (
    <div className="Order">
      <OrderedItemDispatchContext.Provider value={handleCheckBox}>
        <OrderItem handleOrderItem={handleOrderItem} />
        <div className="ButtonSet">
          <Button className={"Save"} text={"저장"} onClick={handleSaveButton} />
          <Button
            className={"Delete"}
            text={"삭제"}
            onClick={handleDeleteBox}
          />
        </div>
        <OrderList orderedItems={orderedItems} />
      </OrderedItemDispatchContext.Provider>
    </div>
  );
};

export default Order;
