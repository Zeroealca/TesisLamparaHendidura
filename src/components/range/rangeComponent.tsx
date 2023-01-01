import React from "react";
// import "flowbite";

interface rangeComponentProps {
  step?: number;
  text: string;
  type: "orientation" | "width" | "movement" | "intensity";
  reference: React.RefObject<HTMLDivElement>;
  max?: number;
  min?: number;
  defaultValue?: number;
  value?: number;
  state: {
    orientation: number;
    width: number;
    movement: number;
    intensity: number;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      orientation: number;
      width: number;
      movement: number;
      intensity: number;
    }>
  >;
}

const rangeComponent = (props: rangeComponentProps) => {
  const {
    step,
    text,
    type,
    reference,
    max,
    defaultValue,
    state,
    setState,
    value,
    min,
  } = props;

  const handleChange = (value: number) => {
    switch (type) {
      case "orientation":
        if (reference.current) {
          setState({ ...state, orientation: value });
          reference.current.style.top = "0%";
          if (state.width > 50 || state.width < 50) {
            reference.current.style.left = `${50 - state.width / 2}%`;
          } else {
            reference.current.style.left = "25%";
          }
          reference.current.style.transform = `rotate(${value}deg)`;
        }
        break;
      case "width":
        if (reference.current) {
          setState({ ...state, width: value });
          reference.current.style.width = !value ? "1%" : `${value}%`;
          reference.current.style.left = `${50 - value / 2}%`;
        }
        break;
      case "movement":
        if (reference.current) {
          setState({ ...state, movement: value });
          console.log(value - state.width);
          if (state.orientation == 90) {
            if (state.width != 100) {
              if (value - state.width > 50) {
                reference.current.style.top = `${-50 + state.width / 2}%`;
                // alert("No se puede pasar de 50%");
              } else {
                alert("No se puede pasar de 50%");
                reference.current.style.top = `${
                  -50 + value + state.width / 2
                }%`;
              }
            }
          }
          if (state.orientation == 180) {
            reference.current.style.top = "0%";
            if (value - state.width < 0) {
              reference.current.style.left = `0%`;
            } else {
              reference.current.style.left = `${value - state.width}%`;
            }
          }
          if (state.orientation < 90 && state.orientation > 0) {
            reference.current.style.top = "0%";
            if (value - state.width < 0) {
              reference.current.style.left = `0%`;
            } else {
              reference.current.style.left = `${value - state.width}%`;
            }
          }
        }
        break;
      case "intensity":
        if (reference.current) {
          setState({ ...state, intensity: value });
          reference.current.style.opacity = !(value / 100)
            ? "0.1"
            : value / 100 == 1
            ? "0.8"
            : `${value / 100}`;
        }
        break;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-xl font-semibold uppercase">{text}</h2>
        <div className="flex items-center justify-center w-full gap-2">
          <input
            type="range"
            className="range my-6 w-full rounded-lg cursor-pointer"
            step={step || 1}
            onChange={(e) => {
              handleChange(Number(e.target.value));
            }}
            min={min || 0}
            max={max || 100}
            defaultValue={defaultValue || 0}
            // maxLength={max || 100}
          />
          <label id="hola" htmlFor="">
            {value}
          </label>
        </div>
      </div>
    </>
  );
};

export default rangeComponent;
