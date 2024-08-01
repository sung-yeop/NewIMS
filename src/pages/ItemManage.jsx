import React from "react";
import { useContext } from "react";
import { ItemStateContext } from "../App";
import ViewCurrentUnits from "../components/ItemManage/ViewCurrentUnits";
import ViewCurrentKinds from "../components/ItemManage/ViewCurrentKinds";

import "./ItemManage.scss";

const ItemManage = () => {
  const { items } = useContext(ItemStateContext);
  return (
    <div className="ItemManage">
      <div>
        <div className="ItemManage-Summary">
          <ViewCurrentUnits items={items} />
          <ViewCurrentKinds items={items} />
        </div>
      </div>
      <div>재고 변동 이력</div>
    </div>
  );
};

export default ItemManage;
