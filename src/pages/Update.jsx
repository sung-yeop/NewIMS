import React, { useEffect, useState } from "react";
import UpdateItemList from "../components/ItemManage/UpdateItemList";
import "./Update.scss";
import Button from "../components/Button";
import { useContext, useRef, createContext } from "react";
import { ItemStateContext, ItemDispatchContext } from "../App";

export const UpdateDispatchContext = createContext();
export const UpdateStateContext = createContext();

const Update = () => {
  const { items } = useContext(ItemStateContext);
  const { onUpdateItem } = useContext(ItemDispatchContext);

  const updateItemList = useRef([]);

  const handleInputUpdateData = (updateItem) => {
    const index = updateItemList.current.findIndex(
      (item) => item.id === updateItem.id
    );

    if (index === -1) {
      updateItemList.current.push(updateItem);
    } else {
      updateItemList.current[index] = updateItem;
    }
  };

  const handleClickUpdateButton = () => {
    updateItemList.current.map((updateItem) => {
      return onUpdateItem({
        id: updateItem.id,
        updateLocation: updateItem.updateLocation,
        updateQuantity: Number(updateItem.updateQuantity),
      });
    });
  };

  return (
    <div className="Update">
      <div className="UpdateBar">
        <caption>재고 현황</caption>{" "}
        <Button
          className="updateButton"
          text={"재고 이동"}
          onClick={handleClickUpdateButton}
        />
      </div>
      <UpdateStateContext.Provider value={updateItemList}>
        <UpdateDispatchContext.Provider
          value={{ handleInputUpdateData, handleClickUpdateButton }}
        >
          <UpdateItemList list={items} />
        </UpdateDispatchContext.Provider>
      </UpdateStateContext.Provider>
    </div>
  );
};

export default Update;
