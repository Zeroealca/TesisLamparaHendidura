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
    color: string;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      orientation: number;
      width: number;
      movement: number;
      intensity: number;
      color: string;
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
      const step = (100 - state.width) / 100;
      if (!state.orientation || state.orientation == 180) {
        reference.current.style.width = !state.width ? "1%" : `${state.width}%`;
        const maxLeft = 100 - state.width;
        const position = maxLeft - (100 - state.movement) * step;
        reference.current.style.left = `${position}%`;
      }
      if (state.orientation == 90) {
        const position = (state.movement - 50) * step;
        reference.current.style.width = !state.width ? "1%" : `${state.width}%`;
        reference.current.style.top = `${position}%`;
        reference.current.style.left = `${50 - state.width / 2}%`;
      }
    }
  }, [state.width]);

  useEffect(() => {
    if (reference.current) reference.current.style.background = state.color;
  }, [state.color]);

  useEffect(() => {
    if (reference.current) {
      const step = (100 - state.width) / 100;
      if (state.orientation == 90 && state.width != 100) {
        const position = (state.movement - 50) * step;
        reference.current.style.top = `${position}%`;
        reference.current.style.left = `${50 - state.width / 2}%`;
      }
      if (
        state.orientation == 180 ||
        (!state.orientation && state.width != 100)
      ) {
        reference.current.style.top = "0px";
        const maxLeft = 100 - state.width;
        const position = maxLeft - (100 - state.movement) * step;
        reference.current.style.left = `${position}%`;
      }
    }
  }, [state.movement, state.orientation]);

  useEffect(() => {
    if (reference.current) {
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
            className="range my-6 w-full half-lg cursor-pointer"
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
