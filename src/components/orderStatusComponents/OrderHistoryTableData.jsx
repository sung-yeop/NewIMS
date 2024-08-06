import React from "react";

const OrderHistoryTableData = ({
  index,
  name,
  barcode,
  location,
  quantity,
  date,
}) => {
  console.log(date);
  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>{barcode}</td>
      <td>{location}</td>
      <td>{quantity}</td>
      <td>{date}</td>
    </tr>
  );
};

export default OrderHistoryTableData;
