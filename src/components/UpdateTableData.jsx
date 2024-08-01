import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { UpdateDispatchContext, UpdateStateContext } from "../pages/Update";

const UpdateTableData = ({ index, item }) => {
  const { handleInputUpdateData, handleClickUpdateButton } = useContext(
    UpdateDispatchContext
  );

  const [updateItemView, setUpdateItemView] = useState({
    id: item.id,
    updateLocation: "",
    updateQuantity: "",
  });

  const updateItem = useRef({
    id: item.id,
    updateLocation: "",
    updateQuantity: "",
  });

  const handleUpdateItem = (e) => {
    const { name, value } = e.target;
    if (name === "updateQuantity" && !Number(value)) {
      return;
    }

    setUpdateItemView({
      ...updateItemView,
      [name]: value,
    });

    updateItem.current[name] = value;

    if (
      name === "updateQuantity" &&
      Number(item.quantity) - Number(updateItem.current.updateQuantity) < 0
    ) {
      alert("수량을 확인해주세요.");
      setUpdateItemView({
        ...updateItemView,
        updateQuantity: "",
      });
      updateItem.current.updateQuantity = "";
    }

    handleInputUpdateData(updateItem.current);
  };

  useEffect(() => {
    return () =>
      setUpdateItemView({
        id: item.id,
        updateLocation: "",
        updateQuantity: "",
      });
  }, [handleClickUpdateButton]);

  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{index}</td>
      <td>{item.name}</td>
      <td>{item.barcode}</td>
      <td>{item.location}</td>
      <td>{item.quantity}</td>
      <td className="Input-UpdateData">
        <input
          name="updateLocation"
          onChange={handleUpdateItem}
          value={updateItemView.updateLocation}
        ></input>
      </td>
      <td className="Input-UpdateData">
        <input
          name="updateQuantity"
          onChange={handleUpdateItem}
          value={updateItemView.updateQuantity}
        ></input>
      </td>
    </tr>
  );
};

export default UpdateTableData;
