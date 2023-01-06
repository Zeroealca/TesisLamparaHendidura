import React, { useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import eye from "../../public/eye.jpg";
import SimulatorCard from "../cards/simulatorCard";
import RangeComponent from "../range/rangeComponent";

const simulatorComponent = () => {
  const lane = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    orientation: 0,
    width: 1,
    movement: 50,
    intensity: 50,
  });

  return (
    <>
      <Head>
        <title>Simulador - Lámpara Hendidura</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center p-24 min-h-screen bg-blackprimary">
        <SimulatorCard>
          <div className="flex items-center flex-col my-2">
            <div className="relative flex items-center justify-center max-w-[200px] w-full max-h-[200px] min-h-[200px] rounded-full">
              <Image
                src={eye}
                alt="logo"
                className=" w-full h-full rounded-md"
              />
              <div
                id="lane"
                className="flex items-center justify-center text-black rounded-xl max-w-[200px] max-h-[200px]"
                ref={lane}
              />
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
                  min={1}
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
              </div>
            </div>
          </div>
        </SimulatorCard>
      </main>
    </>
  );
};

export default simulatorComponent;
