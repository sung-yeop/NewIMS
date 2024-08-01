import React from "react";

const ViewCurrentKinds = ({ items }) => {
  const totalKinds = items.map((item) => item.barcode);
  console.log(totalKinds);

  return (
    <div className="totalKinds">
      <caption>현재 총 재고 종류 수</caption>
      <span>{[...new Set(totalKinds)].length}</span>
    </div>
  );
};

export default ViewCurrentKinds;
