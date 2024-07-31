import React, { useEffect } from "react";
import { useRef, memo } from "react";
import { useContext } from "react";
import { AddItemDispatchContext } from "../pages/Add";

const TableData = ({ index, ...rest }) => {
  const keyRef = useRef(0);
  const dataKeys = Object.keys(rest.addItem);
  dataKeys.pop();

  const handleClickCheckBox = useContext(AddItemDispatchContext);

  useEffect(() => {
    keyRef.current = 0;
  }, [rest]);

  return rest.addItem.barcode !== "" &&
    rest.addItem.name !== "" &&
    rest.addItem.loaction !== "" &&
    rest.addItem.quantity !== "" ? (
    <tr>
      <td key={keyRef.current++}>
        <input
          type="checkbox"
          onClick={() =>
            handleClickCheckBox(rest.addItem.barcode, rest.addItem.location)
          }
        ></input>
      </td>
      <td key={keyRef.current++}>{index}</td>
      {dataKeys.map((key) => (
        <td key={keyRef.current++}>{rest.addItem[key]}</td>
      ))}
    </tr>
  ) : (
    <></>
  );
};

export default React.memo(TableData);
