import React, { useContext, useEffect, useRef } from "react";
import { OrderItemStateContext } from "../../App";
import OrderHistoryTableData from "./OrderHistoryTableData";

const OrderHistory = () => {
  const { orderHistory } = useContext(OrderItemStateContext);
  const indexRef = useRef(1);

  useEffect(() => {
    indexRef.current = 1;
  }, [orderHistory]);

  return (
    <div className="OrderHistory">
      <h2>입고 이력</h2>
      <div className="TableContainer">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>상품명</th>
              <th>바코드</th>
              <th>이동 로케이션</th>
              <th>수량</th>
              <th>변동 시각</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((his) => {
              return (
                <OrderHistoryTableData
                  key={`${his.barcode}+${his.date}`}
                  index={indexRef.current}
                  name={his.name}
                  barcode={his.barcode}
                  location={his.location}
                  quantity={his.quantity}
                  date={his.date}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
