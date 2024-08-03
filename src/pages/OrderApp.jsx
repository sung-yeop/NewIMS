import React, { createContext } from "react";
import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Order from "./Order";
import OrderProcess from "./OrderProcess";
import OrderStatus from "./OrderStatus";

export const OrderItemStateContext = createContext();
export const OrderItemDispatchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ORDER_ITEM":
      const index = state.findIndex(
        (orderItem) => orderItem.id === action.data.id
      );

      if (index !== -1) {
        state.push(action.data);
      } else {
        state[index].quantity += action.data.quantity;
      }
      return state;
  }
}

const OrderApp = () => {
  const [orderItems, dispatch] = useReducer([]);
  const test = "a";

  const onOrderItem = ({ id, name, barcode, quantity }) => {
    dispatch({
      type: "ORDER_ITEM",
      data: {
        id: id,
        name: name,
        barcode: barcode,
        quantity: quantity,
      },
    });
  };

  return (
    <OrderItemStateContext.Provider value={(orderItems, test)}>
      <OrderItemDispatchContext.Provider value={onOrderItem}>
        <Routes>
          <Route path="" element={<OrderStatus />} />
          <Route path="Order" element={<Order />} />
          <Route path="OrderProcess" element={<OrderProcess />} />
        </Routes>
      </OrderItemDispatchContext.Provider>
    </OrderItemStateContext.Provider>
  );
};

export default OrderApp;
