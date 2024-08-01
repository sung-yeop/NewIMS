import React, { useRef, memo, useEffect } from "react";
import AddTableData from "./AddTableData";

const AddItemList = ({ addItemList }) => {
  const keyRef = useRef(0);
  const indexRef = useRef(1);

  useEffect(() => {
    indexRef.current = 1;
  }, [addItemList]);

  return (
    <div className="AddItemList">
      <table>
        <caption>추가 목록</caption>
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
          {/* {addItemList.length > 0 ? (
            addItemList.map((addItem) => {
              return (
                <TableData
                  key={addItem.barcode + addItem.location}
                  index={indexRef.current++}
                  addItem={addItem}
                />
              );
            })
          ) : (
            <TableData key={0} index={indexRef.current++} addItem={[undefined]} />
          )} */}
          {addItemList.map((addItem) => {
            return (
              <AddTableData
                key={addItem.barcode + addItem.location}
                index={indexRef.current++}
                addItem={addItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(AddItemList);
