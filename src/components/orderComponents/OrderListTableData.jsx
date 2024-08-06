import React, { useContext } from "react";
import { OrderedItemDispatchContext } from "../../pages/Order";

const OrderListTableData = ({ index, orderedItem }) => {
  const handleCheckBox = useContext(OrderedItemDispatchContext);
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onClick={() => handleCheckBox(orderedItem.id)}
        ></input>
      </td>
      <td>{index}</td>
      <td>{orderedItem.name}</td>
      <td>{orderedItem.barcode}</td>
      <td>{orderedItem.quantity}</td>
    </tr>
  );
};

export default OrderListTableData;
