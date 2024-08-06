import React from "react";

const OrderProgress = ({ orderList }) => {
  const totalQuantity = orderList.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );
  const progressQuantity = orderList.reduce(
    (accumulator, item) => accumulator + item.filledQuantity,
    0
  );

  const progressPercent = ((progressQuantity / totalQuantity) * 100).toFixed(2);

  return (
    <div className="OrderProgress">
      <div className="totalUnits">
        <h2>총 입고량</h2>
        <span>{totalQuantity}</span>
      </div>
      <div className="progressPercent">
        <h2>총 진행률</h2>
        <span>{progressPercent}</span>
      </div>
    </div>
  );
};

export default OrderProgress;
