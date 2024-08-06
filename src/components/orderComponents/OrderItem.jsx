import React, { useEffect, useState, useRef } from "react";
import Button from "../Button";

const OrderItem = ({ handleOrderItem }) => {
  const [item, setItem] = useState({
    name: "",
    barcode: "",
    quantity: "",
    isChecked: false,
  });

  const itemRef = useRef("");

  const handleInputItem = (e) => {
    const { name, value } = e.target;

    if (name === "quantity" && isNaN(value)) {
      return;
    }
    setItem({
      ...item,
      [name]: value,
    });
  };

  useEffect(() => {
    itemRef.current = {
      ["id"]: `${item.name}+${item.barcode}`,
      ...item,
    };
  }, [item]);

  const handleClickOrderButton = () => {
    handleOrderItem(itemRef.current);
    setItem({
      name: "",
      barcode: "",
      quantity: "",
      isChecked: false,
    });
  };

  return (
    <div className="OrderItem">
      <span>상품명 : </span>
      <input name="name" value={item.name} onChange={handleInputItem}></input>
      <span>바코드 : </span>
      <input
        name="barcode"
        value={item.barcode}
        onChange={handleInputItem}
      ></input>
      <span>수량 : </span>
      <input
        name="quantity"
        value={item.quantity}
        onChange={handleInputItem}
      ></input>
      <Button text={"발주"} onClick={handleClickOrderButton}></Button>
    </div>
  );
};

export default OrderItem;
