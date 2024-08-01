import React from "react";
import { useContext } from "react";
import { DeleteItemDispatchContext } from "../../pages/Delete";

const DeleteTableData = ({ index, ...rest }) => {
  const handleDeleteCheckBox = useContext(DeleteItemDispatchContext);
  const handleCheckBox = () => {
    handleDeleteCheckBox(rest.id);
  };

  return (
    <tr>
      <td>
        <input type="checkbox" onClick={handleCheckBox}></input>
      </td>
      <td>{index}</td>
      <td>{rest.name}</td>
      <td>{rest.barcode}</td>
      <td>{rest.location}</td>
      <td>{rest.quantity}</td>
    </tr>
  );
};

export default DeleteTableData;
