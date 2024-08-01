import React, { useState } from "react";
import { useContext, useRef, createContext } from "react";
import { ItemStateContext, ItemDispatchContext } from "../App";
import DeleteItemList from "../components/deleteComponents/DeleteItemList";
import "./Delete.scss";
import Button from "../components/Button";

export const DeleteItemDispatchContext = createContext();

const Delete = () => {
  const { items } = useContext(ItemStateContext);
  const [deleteItems, setDeleteItems] = useState([]); // id를 요소로 갖는 배열
  const { onDeleteItem } = useContext(ItemDispatchContext);

  const handleDeleteCheckBox = (id) => {
    setDeleteItems((prevList) => {
      const index = prevList.findIndex((item) => item === id);
      index !== -1 ? prevList.splice(index, 1) : prevList.push(id);
      return prevList;
    });
  };

  const handleClickDeleteButton = () => {
    console.log(deleteItems);
    deleteItems.map((id) => onDeleteItem(id));
  };

  return (
    <div className="Delete">
      <caption>재고 삭제</caption>
      <Button text={"재고 삭제"} onClick={handleClickDeleteButton} />
      <DeleteItemDispatchContext.Provider value={handleDeleteCheckBox}>
        <DeleteItemList items={items} />
      </DeleteItemDispatchContext.Provider>
    </div>
  );
};

export default Delete;
