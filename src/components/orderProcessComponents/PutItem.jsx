import React, { useEffect } from "react";
import { useState } from "react";

const PutItem = ({ findOrder, handleOrderItemInfo }) => {
  const [inputData, setInputData] = useState({
    name: findOrder.name,
    barcode: findOrder.barcode,
    location: "",
    quantity: "",
  });

  useEffect(() => {
    setInputData({
      name: findOrder.name,
      barcode: findOrder.barcode,
      location: "",
      quantity: "",
    });
  }, [findOrder]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (
      name === "quantity" &&
      findOrder.filledQuantity + Number(value) > findOrder.quantity
    ) {
      alert("수량 초과");
      setInputData({ ...inputData, [name]: "" });
      return;
    }

    if (name === "quantity" && isNaN(value)) {
      return;
    }

    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  useEffect(() => {
    handleOrderItemInfo(inputData);
  }, [inputData]);

  return (
    <div className="PutItem">
      <h2>입고</h2>
      <div className="SaveInfo">
        <span>재고명 : {findOrder.name}</span>
        <span>예정 수량 : {findOrder.quantity}</span>
        <span>
          남은 수량 :{" "}
          {isNaN(
            Number(findOrder.quantity) - Number(findOrder.filledQuantity)
          ) ||
          Number(findOrder.quantity) - Number(findOrder.filledQuantity) === 0
            ? 0
            : Number(findOrder.quantity) - Number(findOrder.filledQuantity)}
        </span>
      </div>
      <div className="SaveLocation">
        저장 로케이션
        <div>
          <input
            name="location"
            value={inputData.location}
            onChange={handleChangeInput}
          ></input>
        </div>
      </div>
      <div className="SaveQuantity">
        저장 수량
        <div>
          <input
            name="quantity"
            value={inputData.quantity}
            onChange={handleChangeInput}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default PutItem;
