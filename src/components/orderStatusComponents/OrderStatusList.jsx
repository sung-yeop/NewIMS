import React, { useEffect, useRef } from "react";
import OrderListTableData from "./OrderStatusListTableData";

const OrderStatusList = ({ orderList }) => {
  const indexRef = useRef(1);

  useEffect(() => {
    indexRef.current = 1;
  }, [orderList]);

  return (
    <div className="OrderList">
      <h2>발주 이력</h2>
      <div className="TableContainer">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>상품명</th>
              <th>바코드</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((orderItem) => (
              <OrderListTableData
                key={`${orderItem.barcode}+${indexRef.current}`}
                index={indexRef.current++}
                name={orderItem.name}
                barcode={orderItem.barcode}
                quantity={orderItem.quantity}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStatusList;
