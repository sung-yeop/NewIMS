import React, { useContext, useEffect } from "react";
import { OrderItemStateContext } from "../App";
import OrderStatusList from "../components/orderStatusComponents/OrderStatusList";
import OrderHistory from "../components/orderStatusComponents/OrderHistory";
import OrderProgress from "../components/orderStatusComponents/OrderProgress";

import "./OrderStatus.scss";

const OrderStatus = () => {
  const { orderItems } = useContext(OrderItemStateContext);
  return (
    <div className="OrderStatus">
      <OrderProgress orderList={orderItems} />
      <OrderStatusList orderList={orderItems} />
      <OrderHistory />
    </div>
  );
};

export default OrderStatus;
