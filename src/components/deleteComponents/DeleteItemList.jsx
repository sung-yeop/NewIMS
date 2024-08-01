import React, { useEffect } from "react";
import DeleteTableData from "./DeleteTableData";
import { useRef } from "react";
import Button from "../Button";

const DeleteItemList = ({ items }) => {
  const keyRef = useRef(0);
  const index = useRef(1);

  useEffect(() => {
    index.current = 1;
  }, []);

  return (
    <div className="DeleteItemList">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>번호</th>
            <th>상품명</th>
            <th>바코드</th>
            <th>로케이션</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <DeleteTableData
              key={keyRef.current++}
              index={index.current++}
              id={item.id}
              name={item.name}
              barcode={item.barcode}
              location={item.location}
              quantity={item.quantity}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteItemList;
