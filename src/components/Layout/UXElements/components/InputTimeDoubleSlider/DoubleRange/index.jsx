import "./styles.css";
// import logo from "./logo.svg";
import { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

export default function DoubleInputRange() {
  //Time Range Selection methods/state/constants
  const curTime = new Date();
  const timeMax = 12 * 60 - 1;
  const curMin = (curTime.getHours() % 12) * 60 + curTime.getMinutes();
  const [minTimeCaption, set_minTimeCaption] = useState("");
  const [maxTimeCaption, set_maxTimeCaption] = useState("");
  const handleTimeChange = (e) => {
    let h = Math.floor(e.minValue / 60);
    let m = e.minValue % 60;
    let minH = h.toString().padStart(2, "0");
    let minM = m.toString().padStart(2, "0");
    set_minTimeCaption(minH + ":" + minM);

    let hh = Math.floor(e.maxValue / 60);
    let mm = e.maxValue % 60;
    let maxH = hh.toString().padStart(2, "0");
    let maxM = mm.toString().padStart(2, "0");
    set_maxTimeCaption(maxH + ":" + maxM);
  };
  const getTimeLabels = () => {
    let arr = [];
    for (let i = 0; i <= 12; i++) {
      arr.push(i.toString().padStart(2, "0") + ":00");
    }
    return arr;
  };
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
      </header>
      <hr />
      <div>
        <h1>multi-range-slider-react demo</h1>
      </div>
      <hr />
      <div className="multi-range-slider-container">
        <b>Time-Range</b>
        <hr />
        <div>
          <span>labels=</span>
          <span style={{ fontSize: "12px" }}>
            {" "}
            [{getTimeLabels().join(", ")}]{" "}
          </span>
        </div>
        <div>min = {0}</div>
        <div>max = {timeMax}</div>
        <div>step = 1</div>
        <div>subSteps = true</div>
        <MultiRangeSlider
          labels={getTimeLabels()}
          min={0}
          max={timeMax}
          minValue={curMin}
          maxValue={timeMax}
          step={1}
          subSteps={true}
          minCaption={minTimeCaption}
          maxCaption={maxTimeCaption}
          onInput={handleTimeChange}
        />
        <div className="divOutput">
          <div>onInput :</div>
          <div>
            <span>{minTimeCaption}</span>
            <span>{maxTimeCaption}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
