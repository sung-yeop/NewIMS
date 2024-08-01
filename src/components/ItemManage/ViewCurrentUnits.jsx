import React, { useEffect, useState } from "react";

const ViewCurrentUnits = ({ items }) => {
  const totalQuantity = items.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );
  console.log(totalQuantity);

  return (
    <div className="totalUnits">
      <caption>현재 총 Unit 수</caption>
      <span>{totalQuantity}</span>
    </div>
  );
};

export default ViewCurrentUnits;
