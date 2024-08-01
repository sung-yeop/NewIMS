import React, { useEffect, useRef } from "react";
import { memo } from "react";
import UpdateTableData from "./UpdateTableData";
import Button from "../Button";

const UpdateItemList = ({ list }) => {
  const keyRef = useRef(1);

  useEffect(() => {
    keyRef.current = 1;
  }, [list]);

  return (
    <div className="UpdateItemList">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>번호</th>
            <th>상품명</th>
            <th>바코드</th>
            <th>현재 로케이션</th>
            <th>수량</th>
            <th>이동 로케이션</th>
            <th>이동 수량</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <UpdateTableData
                key={keyRef.current++}
                index={keyRef.current}
                item={item}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(UpdateItemList);
