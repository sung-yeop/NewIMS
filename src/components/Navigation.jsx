import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";
import { ItemStateContext } from "../App";

const Navigation = () => {
  const dropId = useRef(10);
  const { navigationURL } = useContext(ItemStateContext);
  console.log(navigationURL);

  return (
    <div className="Navigation">
      {navigationURL.map((navMenu) => {
        return (
          <div
            className="Navigation-Main"
            key={`${dropId.current++}-${navMenu.title}`}
          >
            <Link to={navMenu.url}>{navMenu.title}</Link>
            <div
              className="Navigation-Drop"
              // key={`${dropId.current++}+${navMenu.title}`}
            >
              {navMenu.drop
                ? navMenu.drop.map((navDrop) => (
                    <Link key={navDrop.key} to={navDrop.url}>
                      {navDrop.title}
                    </Link>
                  ))
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
