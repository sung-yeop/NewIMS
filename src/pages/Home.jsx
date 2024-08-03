import React, { useEffect } from "react";
import Button from "../components/Button";
import { useState, useRef } from "react";

const Home = () => {
  const [test, setTest] = useState({
    a: "",
    b: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTest({
      ...test,
      [name]: value,
    });

    console.log(test);
  };

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <div className="Home">
      <input name="a" value={test.a} onChange={handleInput} />
      <input name="b" value={test.b} onChange={handleInput} />
      <Button text={"테스트"}></Button>
    </div>
  );
};

export default Home;
