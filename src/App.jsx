import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useReducer, createContext, useEffect, useRef } from "react";

import ItemManage from "./pages/ItemManage";
import OrderStatus from "./pages/OrderStatus";
import Add from "./pages/Add";
import Delete from "./pages/Delete";
import Update from "./pages/Update";
import OrderApp from "./pages/OrderApp";
import Home from "./pages/Home";

import Navigation from "./components/Navigation";

const navigationURL = [
  {
    id: 1,
    title: "메인 화면",
    url: "/",
  },
  {
    id: 2,
    title: "재고 관리",
    url: "/ItemManage",
    drop: [
      { id: 3, title: "재고 추가", url: "/ItemManage/Add" },
      { id: 4, title: "재고 이동", url: "/ItemManage/Update" },
      { id: 5, title: "재고 삭제", url: "/ItemManage/Delete" },
    ],
  },
  {
    id: 6,
    title: "입고 현황",
    url: "/OrderApp",
    drop: [
      { id: 7, title: "발주", url: "OrderApp/Order" },
      { id: 8, title: "입고", url: "OrderApp/OrderProcess" },
      // { id: 9, title: "입고 현황", url: "OrderApp/OrderStatus" },
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
      updateList[indexBefore] = {
        ...updateList[indexBefore],
        quantity:
          Number(updateList[indexBefore].quantity) -
          Number(action.data.updateQuantity),
      };

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

function App() {
  const [items, dispatch] = useReducer(reducer, mockItems);

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

  return (
    <div className="App">
      <ItemStateContext.Provider value={{ items, navigationURL }}>
        <ItemDispatchContext.Provider
          value={{ onCreateItem, onDeleteItem, onUpdateItem }}
        >
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ItemManage" element={<ItemManage />} />
            <Route path="/OrderApp/*" element={<OrderApp />} />
            <Route path="/ItemManage/Add" element={<Add />} />
            <Route path="/ItemManage/Delete" element={<Delete />} />
            <Route path="/ItemManage/Update" element={<Update />} />
          </Routes>
        </ItemDispatchContext.Provider>
      </ItemStateContext.Provider>
    </div>
  );
}

export default App;
