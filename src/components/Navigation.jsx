import React, { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.scss";
import { ItemStateContext } from "../App";

const activeStyle = {
  color: "red",
  textDecoration: "underline",
};
const deactiveStyle = {
  color: "black",
  textDecoration: "none",
};

const Navigation = () => {
  const dropId = useRef(10);
  const { navigationURL } = useContext(ItemStateContext);

  return (
    <div className="Navigation">
      <div className="Navigation-Title">
        <img className="logo" src="/src/assets/logo.png" />
        <section>IMS</section>
      </div>
      {navigationURL.map((navMenu) => {
        return (
          <div
            className="Navigation-Main"
            key={`${dropId.current++}-${navMenu.title}`}
          >
            <NavLink
              to={navMenu.url}
              className={({ isActive }) => {
                return isActive ? "active" : "";
              }}
            >
              <span className="icon">{navMenu.icon}</span>
              <span className="title">{navMenu.title}</span>
            </NavLink>
            <div className="Navigation-Drop">
              {navMenu.drop
                ? navMenu.drop.map((navDrop) => (
                    <NavLink
                      key={navDrop.key}
                      to={navDrop.url}
                      className={({ isActive }) => {
                        return isActive ? "active" : "";
                      }}
                    >
                      <span className="icon">{navDrop.icon}</span>
                      <span className="title">{navDrop.title}</span>
                    </NavLink>
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
