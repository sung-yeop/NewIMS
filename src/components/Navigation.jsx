import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

const Navigation = ({ name, url, drop }) => {
  if (drop) {
    return (
      <div className="Navigation-Main">
        <Link to={url}>{name}</Link>
        <div className="Navigation-Drop">
          {drop.map((nav) => {
            return (
              <Link key={nav.id} to={nav.url}>
                {nav.title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="Navigation-Main">
        <Link to={url}>{name}</Link>
      </div>
    );
  }
};

export default Navigation;
