import React from "react";

const OrderStatusListTableData = ({ index, name, barcode, quantity }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>{barcode}</td>
      <td>{quantity}</td>
    </tr>
  );
};

export default OrderStatusListTableData;
