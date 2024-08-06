import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useReducer, createContext, useEffect, useRef, useState } from "react";

import ItemManage from "./pages/ItemManage";
import OrderStatus from "./pages/OrderStatus";
import Add from "./pages/Add";
import Delete from "./pages/Delete";
import Update from "./pages/Update";
import Order from "./pages/Order";
import OrderProcess from "./pages/OrderProcess";
import Home from "./pages/Home";

import Navigation from "./components/Navigation";

const navigationURL = [
  {
    id: 1,
    title: "메인 화면",
    url: "/",
    icon: <i class="ri-home-7-line"></i>,
  },
  {
    id: 2,
    title: "재고 관리",
    url: "/ItemManage",
    icon: <i class="ri-archive-stack-line"></i>,
    drop: [
      {
        id: 3,
        title: "재고 추가",
        url: "/ItemManage/Add",
        icon: <i class="ri-add-box-line"></i>,
      },
      {
        id: 4,
        title: "재고 이동",
        url: "/ItemManage/Update",
        icon: <i class="ri-input-method-line"></i>,
      },
      {
        id: 5,
        title: "재고 삭제",
        url: "/ItemManage/Delete",
        icon: <i class="ri-delete-bin-line"></i>,
      },
    ],
  },
  {
    id: 6,
    title: "입고 현황",
    url: "/OrderStatus",
    icon: <i class="ri-dashboard-line"></i>,
    drop: [
      {
        id: 7,
        title: "발주",
        url: "/OrderStatus/Order",
        icon: <i class="ri-add-box-line"></i>,
      },
      {
        id: 8,
        title: "입고",
        url: "/OrderStatus/OrderProcess",
        icon: <i class="ri-input-method-line"></i>,
      },
    ],
  },
];

const mockItemsData = [
  {
    name: "감자탕",
    barcode: 1231888,
    location: "A00-000",
    quantity: 100,
    isChecked: false,
  },
  {
    name: "떡볶이",
    barcode: 4444779,
    location: "A01-101",
    quantity: 55,
    isChecked: false,
  },
  {
    name: "만두",
    barcode: 8812389,
    location: "B00-000",
    quantity: 100,
    isChecked: false,
  },
];

const mockItems = mockItemsData.map((item) => {
  return {
    ["id"]: `${item.barcode}+${item.location}`,
    ...item,
  };
});

const mockOrderItemData = [
  {
    id: 1000,
    name: "김치찌개",
    barcode: "999999",
    quantity: 30,
    filledQuantity: 0,
  },
]; // 수정

function reducerOrderItem(state, action) {
  switch (action.type) {
    case "ORDER_ITEM":
      const index = state.findIndex(
        (orderItem) => orderItem.barcode === action.data.barcode
      );
      if (index === -1) {
        state.push(action.data);
      } else {
        state[index].quantity += Number(action.data.quantity);
      }
      return state;
    case "PUT_ITEM":
      return state.map((orderedItem) => {
        console.log("orderedItem.quantity : ", orderedItem.quantity);
        if (orderedItem.barcode === action.data.barcode) {
          return {
            ...orderedItem,
            filledQuantity:
              Number(orderedItem.filledQuantity) + Number(action.data.quantity),
          };
        } else {
          return orderedItem;
        }
      });
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_ITEM":
      return state.find((item) => item.id === action.data.id)
        ? state.map((item) => {
            if (item.id === action.data.id) {
              return {
                ...item,
                quantity: item.quantity + action.data.quantity,
              };
            }
            return item;
          })
        : [...state, action.data];
    case "UPDATE_ITEM":
      const indexBefore = state.findIndex((item) => item.id === action.data.id);
      const indexAfter = state.findIndex(
        (item) => item.id === action.data.newId
      );
      const updateList = [...state];

      // 기존 배열 수정
      if (indexBefore !== -1) {
        updateList[indexBefore] = {
          ...updateList[indexBefore],
          quantity:
            Number(updateList[indexBefore].quantity) -
            Number(action.data.updateQuantity),
        };
      }

      // 새로 추가한 아이템 정리
      if (indexAfter === -1) {
        console.log("내부 진입", action.data.newId);

        updateList[updateList.length] = {
          ...updateList[indexBefore],
          id: action.data.newId,
          location: action.data.updateLocation,
          quantity: action.data.updateQuantity,
        };
      } else {
        updateList[indexAfter] = {
          ...updateList[indexAfter],
          quantity:
            Number(updateList[indexAfter].quantity) +
            Number(action.data.updateQuantity),
        };
      }

      state = updateList;

      return state.filter((item) => item.quantity > 0);
    case "DELETE_ITEM":
      const deleteItem = state.find((item) => item.id === action.data.id);
      return state.filter((item) => item !== deleteItem);
  }
}

export const ItemStateContext = createContext();
export const ItemDispatchContext = createContext();

export const OrderItemStateContext = createContext();
export const OrderItemDispatchContext = createContext();

function App() {
  const [items, dispatch] = useReducer(reducer, mockItems);
  const [orderItems, dispatchOrderItem] = useReducer(
    reducerOrderItem,
    mockOrderItemData
  ); // 수정
  const [orderHistory, setOrderHistory] = useState([]);

  //Item 조작 function
  const onCreateItem = ({ ...itemInfo }) => {
    dispatch({
      type: "CREATE_ITEM",
      data: {
        id: `${itemInfo.barcode}+${itemInfo.location}`,
        name: itemInfo.name,
        barcode: itemInfo.barcode,
        location: itemInfo.location,
        quantity: Number(itemInfo.quantity),
        isChecked: false,
      },
    });
  };

  const onUpdateItem = ({ id, newId, updateLocation, updateQuantity }) => {
    console.log("id : ", id);
    console.log("newId : ", newId);
    dispatch({
      type: "UPDATE_ITEM",
      data: {
        id: id,
        newId: newId,
        updateLocation: updateLocation,
        updateQuantity: Number(updateQuantity),
      },
    });
  };

  const onDeleteItem = (id) => {
    dispatch({
      type: "DELETE_ITEM",
      data: {
        id: id,
      },
    });
  };

  // 수정 OrderItem
  const onOrderItem = (orderItem) => {
    dispatchOrderItem({
      type: "ORDER_ITEM",
      data: {
        name: orderItem.name,
        barcode: orderItem.barcode,
        quantity: Number(orderItem.quantity),
        filledQuantity: 0,
      },
    });
  };

  const onPutItem = (putItem) => {
    setOrderHistory((prevList) => {
      const newHistory = {
        name: putItem.name,
        barcode: putItem.barcode,
        location: putItem.location,
        quantity: putItem.quantity,
        isPut: true,
        date: new Date().toLocaleString(),
      };
      return [...prevList, newHistory];
    });

    dispatchOrderItem({
      type: "PUT_ITEM",
      data: {
        name: putItem.name,
        barcode: putItem.barcode,
        location: putItem.location,
        quantity: putItem.quantity,
      },
    });

    onCreateItem({
      name: putItem.name,
      barcode: putItem.barcode,
      location: putItem.location,
      quantity: Number(putItem.quantity),
    });
  };

  return (
    <div className="App">
      <ItemStateContext.Provider value={{ items, navigationURL }}>
        <ItemDispatchContext.Provider
          value={{ onCreateItem, onDeleteItem, onUpdateItem }}
        >
          <OrderItemStateContext.Provider value={{ orderItems, orderHistory }}>
            <OrderItemDispatchContext.Provider
              value={{ onOrderItem, onPutItem, setOrderHistory }}
            >
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ItemManage" element={<ItemManage />} />
                <Route path="/OrderStatus" element={<OrderStatus />} />
                <Route path="/OrderStatus/Order" element={<Order />} />
                <Route
                  path="/OrderStatus/OrderProcess"
                  element={<OrderProcess />}
                />
                <Route path="/ItemManage/Add" element={<Add />} />
                <Route path="/ItemManage/Delete" element={<Delete />} />
                <Route path="/ItemManage/Update" element={<Update />} />
              </Routes>
            </OrderItemDispatchContext.Provider>
          </OrderItemStateContext.Provider>
        </ItemDispatchContext.Provider>
      </ItemStateContext.Provider>
    </div>
  );
}

export default App;
