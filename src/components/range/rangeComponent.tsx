import React, { useEffect, useState } from "react";
// import "flowbite";

interface rangeComponentProps {
  step?: number;
  text: string;
  type: "orientation" | "width" | "movement" | "intensity";
  reference: React.RefObject<HTMLDivElement>;
  max?: number;
  min?: number;
  value: number;
  disabled?: boolean;
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
    state,
    setState,
    value,
    min,
    disabled,
  } = props;

  useEffect(() => {
    if (reference.current) {
      reference.current.style.opacity = !(state.intensity / 100)
        ? "0.1"
        : state.intensity / 100 == 1
        ? "0.8"
        : `${state.intensity / 100}`;
    }
  }, [state.intensity]);

  useEffect(() => {
    if (reference.current) {
      reference.current.style.width = !state.width ? "1%" : `${state.width}%`;
    }
  }, [state.width]);

  useEffect(() => {
    if (reference.current) {
      if (state.orientation == 90) {
        if (state.width != 100) {
          if (state.movement + state.width < 100) {
            console.log(Math.ceil(-50 + state.movement + state.width / 2));
            reference.current.style.top = `${
              -50 + state.movement + state.width / 2
            }%`;
          }
        }
      }
      if (state.orientation == 180 || state.orientation == 1) {
        reference.current.style.top = "0%";
        if (state.movement - state.width < 0) {
          reference.current.style.left = `0%`;
        } else {
          reference.current.style.left = `${state.movement - state.width / 2}%`;
        }
      }
    }
  }, [state.movement]);

  useEffect(() => {
    if (reference.current) {
      reference.current.style.top = "0%";
      if (state.width > 50 || state.width < 50) {
        reference.current.style.left = `${50 - state.width / 2}%`;
      } else {
        reference.current.style.left = "25%";
      }
      reference.current.style.transform = `rotate(${state.orientation}deg)`;
    }
  }, [state.orientation]);

  const handleChange = (value: number) => {
    switch (type) {
      case "orientation":
        setState({
          ...state,
          orientation: value,
          movement: 50,
        });
        break;
      case "width":
        setState({
          ...state,
          width: value,
          movement:
            state.movement > 50
              ? Math.ceil(-50 + value / 2)
              : Math.ceil(50 - value / 2),
        });
        break;
      case "movement":
        setState({
          ...state,
          movement: value,
        });
        break;
      case "intensity":
        setState({ ...state, intensity: value });
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
            onChange={(e) => handleChange(Number(e.target.value))}
            min={min || 0}
            max={max || 100}
            value={value}
            disabled={disabled}
            // maxLength={max || 100}
          />
          <div className="max-w-[30px] w-full">
            <label>{value}</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default rangeComponent;
