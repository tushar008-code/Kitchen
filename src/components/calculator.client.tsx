"use client";

import React, { useState } from "react";

function Calculator() {
  const [val, setVal] = useState({ num: 0, num2: 0, res: 0 });
  function calculate() {
    setVal((prev) => ({ ...prev, res: prev.num + prev.num2 }));
  }
  return (
    <div>
      <input
        type="text"
        value={val.num}
        onChange={(e) =>
          setVal((prev) => ({ ...prev, num: Number(e.target.value) }))
        }
        placeholder="num1"
      />
      <input
        type="text"
        value={val.num2}
        onChange={(e) =>
          setVal((prev) => ({ ...prev, num2: Number(e.target.value) }))
        }
        placeholder="num2"
      />
      <button onClick={calculate}>=</button>
      <h5>{val.res}</h5>
    </div>
  );
}

export default Calculator;
