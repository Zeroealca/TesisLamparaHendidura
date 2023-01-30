import React, { useRef, useState } from "react";
import Head from "next/head";
import eye from "../../public/eye.jpg";
import SimulatorCard from "../cards/simulatorCard";
import RangeComponent from "../range/rangeComponent";
import Icon from "../icons";
import ReturnArrow from "../icons/returnArrow";
import Upload from "../icons/upload";

const simulatorComponent = () => {
  const lane = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    orientation: 0,
    width: 1,
    movement: 50,
    intensity: 50,
    color: "#FFFFFF",
  });
  const [image, setImage] = useState("");

  return (
    <>
      <Head>
        <title>Simulador - Lámpara Hendidura</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center p-24 min-h-screen bg-blackprimary">
        <SimulatorCard>
          <div className="w-1/4">
            <a
              href="/"
              className="flex items-center justify-center gap-5 py-2 px-10 bg-blacktertiary rounded-lg hover:bg-blacktertiary/60 cursor-pointer"
            >
              <Icon
                children={<ReturnArrow />}
                fill="#212121"
                viewBox="16 16"
                height={35}
                width={35}
              />
              Regresar
            </a>
          </div>
          <div className="flex items-center flex-col my-2">
            <div className="relative flex items-center justify-center max-w-[325px] w-full max-h-[325px] min-h-[325px] rounded-full">
              <img
                src={image ? image : eye.src}
                alt="logo"
                className="w-full h-full rounded-md"
              />
              <div
                id="lane"
                className="flex items-center justify-center text-black rounded-xl max-w-[325px] max-h-[325px]"
                ref={lane}
              />
              <label htmlFor="upload-image">
                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="absolute -right-11 bottom-0 hidden"
                />
                <div className="absolute -right-11 bottom-0 cursor-pointer z-10">
                  <Icon
                    children={<Upload />}
                    fill="#FFFFFF"
                    viewBox="16 16"
                    height={35}
                    width={35}
                  />
                </div>
              </label>
            </div>
            <div className="flex justify-center ml-5 text-center my-11 rounded-2xl bg-blacktertiary">
              <div className="m-12">
                <RangeComponent
                  reference={lane}
                  state={state}
                  setState={setState}
                  type="orientation"
                  step={90}
                  max={180}
                  text="ORIENTACIÓN DE LA HENDIDURA"
                  value={state.orientation}
                />
                <RangeComponent
                  reference={lane}
                  state={state}
                  setState={setState}
                  type="width"
                  text="ANCHURA"
                  value={state.width}
                  min={1}
                />
                <RangeComponent
                  reference={lane}
                  state={state}
                  setState={setState}
                  type="movement"
                  text="MOVIMIENTO"
                  value={state.movement}
                  disabled={state.width === 100}
                />
                <RangeComponent
                  reference={lane}
                  state={state}
                  setState={setState}
                  type="intensity"
                  step={25}
                  text="INTENSIDAD DE LA LUZ"
                  value={state.intensity}
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="color" className="text-white">
                    COLOR
                  </label>
                  <input
                    className="w-1/2 h-10 rounded-md "
                    type="color"
                    id="color"
                    name="color"
                    value={state.color}
                    onChange={(e) => {
                      setState({ ...state, color: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </SimulatorCard>
      </main>
    </>
  );
};

export default simulatorComponent;
