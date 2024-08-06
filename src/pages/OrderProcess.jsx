import React, { useContext, useEffect, useRef } from "react";
import PutItem from "../components/orderProcessComponents/PutItem";
import { useState } from "react";
import { OrderItemStateContext, OrderItemDispatchContext } from "../App";
import Button from "../components/Button";
import "./OrderProcess.scss";

// 바코드를 입력 받거나, 발주 리스트를 조회 & 상품을 선택하여 Item Put 진행

const OrderProcess = () => {
  const [inputBarcode, setInputBarcode] = useState(""); // 사용자로부터 입력받은 바코드 저장
  const [orderItemInfo, setOrderItemInfo] = useState({}); // 바코드를 입력하면 입력해야하는 상세 페이지가 나타나고 추가 인풋 정보를 저장

  const { orderItems } = useContext(OrderItemStateContext);
  const { onPutItem } = useContext(OrderItemDispatchContext); // 입력한 정보에 맞춰서 재고 추가
  const putItemInfo = useRef({});

  const handleInputBarcode = (e) => {
    setInputBarcode(e.target.value);
  };

  const handleClickInputBarcodeButton = () => {
    const targetPutItem = orderItems.find(
      (orderItem) => orderItem.barcode === inputBarcode
    );

    if (targetPutItem) {
      setOrderItemInfo(targetPutItem);
    } else {
      alert("조회되는 바코드가 없습니다.");
      setInputBarcode("");
      setOrderItemInfo({});
    }
  };

  const handleOrderItemInfo = (putItem) => {
    putItemInfo.current = putItem;
  };

  const handleClickPutItem = () => {
    console.log("orderItemInfo : ", putItemInfo.current);
    onPutItem(putItemInfo.current);
    alert("저장되었습니다.");
    setOrderItemInfo({});
    setInputBarcode("");
  };

  return (
    <div className="OrderProcess">
      <div className="InputBarcodeBar">
        <span>Barcode : </span>
        <input
          name="inputBarcode"
          value={inputBarcode}
          onChange={handleInputBarcode}
        ></input>
        <Button text={"조회"} onClick={handleClickInputBarcodeButton} />
      </div>
      <PutItem
        findOrder={orderItemInfo}
        handleOrderItemInfo={handleOrderItemInfo}
      />
      <Button
        className={"SaveButton"}
        text={"재고 저장"}
        onClick={handleClickPutItem}
      />
    </div>
  );
};

export default OrderProcess;
