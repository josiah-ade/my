import { useState } from "react";

export default function UnitPage() {
  const [input, setInput] = useState(0);

  const rem = input / 16;
  const tUnit = (rem * 4).toFixed(1);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <input type="number" onChange={(e) => setInput(parseFloat(e.target.value) || 0)} />
          </div>
          <div>
            <p>REM: {rem.toFixed(2) || 0}rem </p>
            <p>Tailwind Unit: {tUnit || 0} </p>
          </div>
        </div>
      </div>
    </>
  );
}
