import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useReducer, createContext, useEffect } from "react";

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
    url: "/OrderStatus",
    drop: [
      { id: 7, title: "발주", url: "OrderStatus/Order" },
      { id: 8, title: "입고", url: "OrderStatus/OrderProcess" },
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
  }
}

export const ItemStateContext = createContext();
export const ItemDispatchContext = createContext();

function App() {
  const [items, dispatch] = useReducer(reducer, mockItems);

  useEffect(() => {
    console.log(items);
  }, [items]);

  //Item 조작 function
  const onCreateItem = ({ ...itemInfo }) => {
    console.log(itemInfo);
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

  const onUpdateItem = ({ id, updateLocation, updateQuantity }) => {
    dispatch({
      type: "UPDATE_ITEM",
      data: {
        id: id,
        updateLocation: updateLocation,
        updateQuantity: updateQuantity,
      },
    });
  };

  const onDeleteItem = ({ id, deleteQuantity }) => {
    dispatch({
      type: "DELETE_ITEM",
      data: {
        id: id,
        deleteQuantity: deleteQuantity,
      },
    });
  };

  return (
    <div className="App">
      <div className="Navigation">
        <section>IMS</section>
        {navigationURL.map((nav) => {
          return (
            <Navigation
              key={nav.id}
              name={nav.title}
              url={nav.url}
              drop={nav.drop}
            />
          );
        })}
      </div>
      <ItemStateContext.Provider value={{ items }}>
        <ItemDispatchContext.Provider
          value={{ onCreateItem, onDeleteItem, onUpdateItem }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ItemManage" element={<ItemManage />} />
            <Route path="/OrderStatus" element={<OrderStatus />} />
            <Route path="/ItemManage/Add" element={<Add />} />
            <Route path="/ItemManage/Delete" element={<Delete />} />
            <Route path="/ItemManage/Update" element={<Update />} />
            <Route path="/OrderStatus/Order" element={<Order />} />
            <Route
              path="/OrderStatus/OrderProcess"
              element={<OrderProcess />}
            />
          </Routes>
        </ItemDispatchContext.Provider>
      </ItemStateContext.Provider>
    </div>
  );
}

export default App;
