import React, { useEffect, useState } from "react";
import { state_ } from "../simulator/simulatorComponent";
// import "flowbite";

interface rangeComponentProps {
  step?: number;
  text: string;
  type: "orientation" | "width" | "movement" | "intensity" | "zoom";
  lane: React.RefObject<HTMLDivElement>;
  max?: number;
  min?: number;
  imageRef: React.RefObject<HTMLImageElement>;
  value: number;
  disabled?: boolean;
  state: state_;
  setState: React.Dispatch<React.SetStateAction<state_>>;
  setTechnique?: React.Dispatch<React.SetStateAction<string | string[]>>;
}

const rangeComponent = (props: rangeComponentProps) => {
  const {
    step,
    text,
    type,
    lane,
    imageRef,
    max,
    state,
    value,
    min,
    disabled,
    setState,
    setTechnique,
  } = props;
  useEffect(() => {
    if (lane.current) {
      lane.current.style.opacity = `${state.intensity / 3}%`;
    }
  }, [state.intensity]);

  useEffect(() => {
    if (lane.current) {
      const step = (100 - state.width) / 100;
      const maxLeft = 100 - state.width;
      if (!state.orientation || state.orientation == 180) {
        lane.current.style.width = !state.width ? "1%" : `${state.width}%`;
        const position = maxLeft - (100 - state.movement) * step;
        lane.current.style.left = `${position}%`;
        return;
      }
      if (state.orientation == 90) {
        const position = (state.movement - 50) * step;
        lane.current.style.width = !state.width ? "1%" : `${state.width}%`;
        lane.current.style.top = `${position}%`;
        lane.current.style.left = `${50 - state.width / 2}%`;
        return;
      } else if (state.orientation < 90) {
        lane.current.style.width = !state.width ? "1%" : `${state.width}%`;
        const step = (100 - state.width) / 100;
        const radians = state.orientation * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const positionX =
          (100 - state.width) / 2 + (state.movement - 50) * step * cos;
        const positionY = (state.movement - 50) * step * sin;
        lane.current.style.top = `${positionY}%`;
        lane.current.style.left = `${positionX}%`;
      } else if (state.orientation > 90) {
        lane.current.style.width = !state.width ? "1%" : `${state.width}%`;
        const step = (100 - state.width) / 100;
        const radians = (state.orientation - 180) * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const positionX =
          (100 - state.width) / 2 + (state.movement - 50) * step * cos;
        const positionY = (state.movement - 50) * step * sin;
        lane.current.style.top = `${positionY}%`;
        lane.current.style.left = `${positionX}%`;
      }
    }
  }, [state.width]);

  useEffect(() => {
    if (lane.current) lane.current.style.background = state.color;
  }, [state.color]);

  useEffect(() => {
    if (lane.current) {
      if (state.width != 100) {
        const step = (100 - state.width) / 100;
        if (state.orientation === 90) {
          const position = (state.movement - 50) * step;
          lane.current.style.top = `${position}%`;
          lane.current.style.left = `${50 - state.width / 2}%`;
        } else if (state.orientation === 180 || !state.orientation) {
          lane.current.style.top = "0px";
          const maxLeft = 100 - state.width;
          const positionX = maxLeft - (100 - state.movement) * step;
          lane.current.style.left = `${positionX}%`;
        } else if (state.orientation < 90) {
          const radians = state.orientation * (Math.PI / 180);
          const cos = Math.cos(radians);
          const sin = Math.sin(radians);
          const positionX =
            (100 - state.width) / 2 + (state.movement - 50) * step * cos;
          const positionY = (state.movement - 50) * step * sin;
          lane.current.style.top = `${positionY}%`;
          lane.current.style.left = `${positionX}%`;
        } else if (state.orientation > 90) {
          const radians = (state.orientation - 180) * (Math.PI / 180);
          const cos = Math.cos(radians);
          const sin = Math.sin(radians);
          const positionX =
            (100 - state.width) / 2 + (state.movement - 50) * step * cos;
          const positionY = (state.movement - 50) * step * sin;
          lane.current.style.top = `${positionY}%`;
          lane.current.style.left = `${positionX}%`;
        }
      }
    }
  }, [state.movement, state.orientation]);

  useEffect(() => {
    if (lane.current) {
      lane.current.style.transform = `rotate(${state.orientation}deg)`;
      lane.current.style.top = "0%";
      lane.current.style.left = `${state.width / 2 - state.movement}%}`;
    }
  }, [state.orientation]);

  useEffect(() => {
    if (imageRef.current && lane.current) {
      imageRef.current.style.transform = `scale(${(state.zoom * 100) / 100})`;
    }
  }, [state.zoom]);

  // useEffect(() => {
  //   if (state.orientation === 45 && state.intensity === 0) {
  //     setTechnique("Difusa");
  //   }
  //   if (
  //     (state.orientation === 30 || state.orientation === 45) &&
  //     state.intensity === 25
  //   ) {
  //     return setTechnique(["Directa (Paralelepípedo)", "Indirecta"]);
  //   }
  //   if (
  //     (state.orientation === 30 || state.orientation === 45) &&
  //     state.intensity === 50
  //   ) {
  //     return setTechnique("Directa (Sección óptica)");
  //   }
  //   if (
  //     (state.orientation === 30 || state.orientation === 45) &&
  //     state.intensity === 75
  //   ) {
  //     return setTechnique(["HAZ CÓNICO", "DISPERSIÓN ESCLERAL"]);
  //   }
  //   if (state.orientation === 60 && state.intensity === 50) {
  //     return setTechnique("Retro-iluminación Directa");
  //   }
  //   if (state.orientation === 60 && state.intensity === 75) {
  //     return setTechnique("Reflexión Especular");
  //   }
  //   if (state.orientation === 60 && state.intensity === 0) {
  //     return setTechnique("Técnica de Van Herick");
  //   }
  //   if (
  //     (state.orientation === 70 || state.orientation === 90) &&
  //     state.intensity === 50
  //   ) {
  //     return setTechnique("Iluminación Tangencial");
  //   }
  //   if (state.intensity === 50) {
  //     return setTechnique("Retro-iluminación Indirecta");
  //   }
  //   if (state.intensity === 25) {
  //     return setTechnique("Iluminación filtrada");
  //   }
  // }, [state.orientation, state.intensity]);

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
      case "zoom":
        setState({ ...state, zoom: value });
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
