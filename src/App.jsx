import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState({
    second: "00",
    minute: "00",
    hour: "00",
  });

  // creating section for digital time in hands of clock
  const secondHandHeight = 150;
  const minuteHandHeight = 150;
  const hourHandHeight = 100;

  const numLabels = 5;

  const secondLabelSteps = secondHandHeight / numLabels;
  const minuteLabelSteps = minuteHandHeight / numLabels;
  const hourLabelSteps = hourHandHeight / numLabels;

  // declare function for creating label
  function createLabelDiv(numOfLabels, labelSteps, timeElement, divClass) {
    for (var i = 0; i < numOfLabels; i++) {
      const label = document.createElement("div");
      label.classList.add(divClass);
      label.style.bottom = `${i * labelSteps}px`;
      timeElement.appendChild(label);
    }
  }
  // declare function for updating label
  function updateLabel(labelElement, currentTimeUnit) {
    labelElement.forEach((label) => {
      label.textContent = currentTimeUnit;
    });
  }

  //for analog clock
  useEffect(() => {
    const secondElement = document.getElementById("second-hand");
    const minuteElement = document.getElementById("minute-hand");
    const hourElement = document.getElementById("hour-hand");

    // create label div
    createLabelDiv(numLabels, minuteLabelSteps, minuteElement, "minute");
    createLabelDiv(numLabels, hourLabelSteps, hourElement, "hour");
    createLabelDiv(numLabels, secondLabelSteps, secondElement, "second");

    // for analog
    const d = new Date();
    const sec = d.getSeconds() * 6;
    const min = d.getMinutes() * 6;
    const hr = d.getHours() * 30 + Math.round(min / 12);

    //for digital
    const secondLabels = document.querySelectorAll(".second");
    const minuteLabels = document.querySelectorAll(".minute");
    const hourLabels = document.querySelectorAll(".hour");

    let hours = d.getHours();
    if(hours>12){
      hours -= 12;
    }else if(hours == 0){
      hours=12
    }

    // interval
    const interval = setInterval(() => {
      //update time in boxes
      updateLabel(secondLabels, d.getSeconds());
      updateLabel(minuteLabels, d.getMinutes());
      updateLabel(hourLabels, hours);

      // for analog hands rotation
      setTimer({
        second: sec,
        minute: min,
        hour: hr,
      });
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div id="clock">
        <div id="point"></div>
        <div
          id="minute-hand"
          style={{ transform: `rotate(${timer?.minute}deg)` }}
        ></div>
        <div
          id="hour-hand"
          style={{ transform: `rotate(${timer?.hour}deg)` }}
        ></div>
        <div
          id="second-hand"
          style={{ transform: `rotate(${timer?.second}deg)` }}
        ></div>
      </div>
    </>
  );
}

export default App;
