import React, { useEffect, useRef } from "react";
import OrderListTableData from "./OrderListTableData";

const OrderList = ({ orderedItems }) => {
  const indexRef = useRef(1);

  useEffect(() => {
    indexRef.current = 1;
  }, [orderedItems]);

  return (
    <div className="OrderList">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>번호</th>
            <th>상품명</th>
            <th>바코드</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {orderedItems.map((orderedItem) => {
            return (
              <OrderListTableData
                key={orderedItem.id}
                index={indexRef.current++}
                orderedItem={orderedItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
