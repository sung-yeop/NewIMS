import React, { useEffect, useState, useCallback, createContext } from "react";
import { useRef, useContext } from "react";
import { ItemDispatchContext } from "../App";
import Button from "../components/Button";
import AddItemList from "../components/ItemManage/AddItemList";
import "./Add.scss";

export const AddItemDispatchContext = createContext();

const Add = () => {
  const [addItemList, setAddItemList] = useState([]);
  const [addItem, setAddItem] = useState({
    name: "",
    barcode: "",
    location: "",
    quantity: "",
    isCheckedAdd: false,
  });
  const [invalidTrigger, setInvalid] = useState([]);
  const { onCreateItem } = useContext(ItemDispatchContext);
  const currentList = useRef(addItemList);
  const invalid = useRef([]);

  const nameRef = useRef("");
  const barcodeRef = useRef("");
  const locationRef = useRef("");
  const quantityRef = useRef("");

  /***/
  useEffect(() => {
    currentList.current = addItemList;
  }, [addItemList]);

  useEffect(() => {
    return () => {
      currentList.current.forEach((addItem) => onCreateItem(addItem));
    };
  }, []);

  const validateFields = () => {
    const invalidInputs = [];
    if (!addItem.name) invalidInputs.push("name");
    if (!addItem.barcode) invalidInputs.push("barcode");
    if (!addItem.location) invalidInputs.push("location");
    if (
      !addItem.quantity ||
      isNaN(addItem.quantity) ||
      Number(addItem.quantity) < 0
    )
      invalidInputs.push("quantity");
    invalid.current = invalidInputs; // 로직을 제대로 처리하기 위함 -> 수량을 없앤채로 재고추가를 누르고 이후 수량을 입력하고 재고추가를 눌러도 반영되지 않음 -> 상태 변경이 반영되지 않음
    // 이를 해결하기 위해 useRef를 사용
    setInvalid(invalidInputs); // 액션을 보여주기 위함 -> useRef를 사용해서 저장하는데 input태그가 늦게 리렌더링됨

    return invalid.current.length === 0;
  };

  const handleAddItem = (e) => {
    const { name, value } = e.target;
    setAddItem({
      ...addItem,
      [name]: value,
    });
  };

  const handleClickAddItem = () => {
    if (!validateFields()) return;

    setAddItemList((prevList) => {
      const index = prevList.findIndex(
        (item) =>
          `${item.barcode}+${item.location}` ===
          `${addItem.barcode}+${addItem.location}`
      );
      if (index !== -1) {
        const updateList = [...prevList];
        updateList[index] = {
          ...updateList[index],
          quantity:
            Number(updateList[index].quantity) + Number(addItem.quantity),
        };
        return updateList;
      }
      return [...prevList, addItem];
    });

    setAddItem({
      name: "",
      barcode: "",
      location: "",
      quantity: "",
      isCheckedAdd: false,
    });
  };

  const handleClickDeleteItem = () => {
    setAddItemList((prevList) => {
      return prevList.filter((addItem) => !addItem.isCheckedAdd);
    });
  };

  const handleClickCheckBox = (barcode, location) => {
    setAddItemList((prevList) => {
      const index = addItemList.findIndex(
        (addItem) =>
          addItem.barcode === barcode && addItem.location === location
      );
      const updateList = [...prevList];

      updateList[index].isCheckedAdd = !updateList[index].isCheckedAdd;
      return updateList;
    });
  };

  return (
    <div className="Add">
      <div className="Add-Input">
        <span>상품명 : </span>
        <input
          className={invalidTrigger.includes("name") ? "invalid" : "input_name"}
          ref={nameRef}
          onChange={handleAddItem}
          name="name"
          value={addItem.name}
        ></input>
        <span>바코드 : </span>
        <input
          className={
            invalidTrigger.includes("barcode") ? "invalid" : "input_barcode"
          }
          ref={barcodeRef}
          onChange={handleAddItem}
          name="barcode"
          value={addItem.barcode}
        ></input>
        <span>로케이션 : </span>
        <input
          className={
            invalidTrigger.includes("location") ? "invalid" : "input_location"
          }
          ref={locationRef}
          onChange={handleAddItem}
          name="location"
          value={addItem.location}
        ></input>
        <span>수량 : </span>
        <input
          className={
            invalidTrigger.includes("quantity") ? "invalid" : "input_quantity"
          }
          ref={quantityRef}
          onChange={handleAddItem}
          name="quantity"
          value={addItem.quantity}
        ></input>
        <Button
          className="addButton"
          text={"재고 추가"}
          onClick={handleClickAddItem}
        />
        <Button
          className="deleteButton"
          text={"재고 삭제"}
          onClick={handleClickDeleteItem}
        />
      </div>
      <AddItemDispatchContext.Provider value={handleClickCheckBox}>
        <AddItemList addItemList={addItemList} />
      </AddItemDispatchContext.Provider>
    </div>
  );
};

export default Add;
