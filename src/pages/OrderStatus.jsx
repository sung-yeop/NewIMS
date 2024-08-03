import React, { useContext } from "react";
import { OrderItemStateContext } from "./OrderApp";

const OrderStatus = () => {
  const test = useContext(OrderItemStateContext);
  return <div>{test}</div>;
};

export default OrderStatus;
