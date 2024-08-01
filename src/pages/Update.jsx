import React, { useEffect, useState } from "react";

import UpdateItemList from "../components/updateComponents/UpdateItemList";
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

    console.log("updateItemList : ", updateItemList.current[index]);
  };

  const handleClickUpdateButton = () => {
    updateItemList.current.map((updateItem) => {
      const regex = /^(.*?)\+/;
      const newId = `${updateItem.id.match(regex)[1]}+${
        updateItem.updateLocation
      }`;

      return onUpdateItem({
        id: updateItem.id,
        newId: newId,
        updateLocation: updateItem.updateLocation,
        updateQuantity: Number(updateItem.updateQuantity),
      });
    });
    updateItemList.current = [];
  };

  return (
    <div className="Update">
      <caption>재고 현황</caption>{" "}
      <UpdateStateContext.Provider value={updateItemList}>
        <UpdateDispatchContext.Provider
          value={{ handleInputUpdateData, handleClickUpdateButton }}
        >
          <Button text={"재고 이동"} onClick={handleClickUpdateButton} />
          <UpdateItemList list={items} />
        </UpdateDispatchContext.Provider>
      </UpdateStateContext.Provider>
    </div>
  );
};

export default Update;
