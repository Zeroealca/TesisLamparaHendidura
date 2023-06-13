import Parte1 from "../../public/assets/lampara/1.webp";
import Parte2 from "../../public/assets/lampara/2.webp";
import Parte3 from "../../public/assets/lampara/3.webp";
import Parte4 from "../../public/assets/lampara/4.webp";
import Parte5 from "../../public/assets/lampara/5.webp";
import Parte6 from "../../public/assets/lampara/6.webp";
import Parte7 from "../../public/assets/lampara/7.webp";
import Parte8 from "../../public/assets/lampara/8.webp";
import Parte9 from "../../public/assets/lampara/9.webp";
import Parte10 from "../../public/assets/lampara/10.webp";
import Lampara from "../../public/assets/lampara/pngegg.webp";
import { Tooltip as ReactTooltip } from "react-tooltip";
import SimulatorButton from "src/components/simulator/simulatorButton";
import ReturnArrow from "src/components/icons/returnArrow";
import { useRouter } from "next/router";

const Partes = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5 max-w-[95%] mx-auto">
      <div className="self-start">
        <SimulatorButton
          name="Volver"
          icon={<ReturnArrow />}
          onClick={() => router.push("/")}
        />
      </div>
      <h1 className="text-4xl font-bold text-white">
        Partes de la lámpara de hendidura
      </h1>
      <div className="relative w-72 group">
        <div
          id="part1"
          className="absolute top-0 left-[90px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte1.src} className="w-[67px]" />
          <ReactTooltip anchorId="part1" place="left" content="Portalámparas" />
        </div>

        <div
          id="part2"
          className="absolute top-[140px] left-[80px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte2.src} className="w-[65px]" />
          <ReactTooltip
            anchorId="part2"
            place="left"
            content="Control milimétrico longitudinal de la hendidura"
          />
        </div>

        <div
          id="part3"
          className="absolute top-[165px] left-[95px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte3.src} className="w-[18px]" />
          <ReactTooltip
            anchorId="part3"
            place="left"
            content="Dispositivo de cambio de filtros"
          />
        </div>

        <div
          id="part4"
          className="absolute top-[183px] left-[65px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte4.src} className="w-[30px]" />
          <ReactTooltip
            anchorId="part4"
            place="left"
            content="Control milimétrico longitudinal de la hendidura"
          />
        </div>

        <div
          id="part5"
          className="absolute top-[240px] left-[117px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte5.src} className="w-[25px]" />
          <ReactTooltip
            anchorId="part5"
            place="right"
            content="Selector de cambios de aumento"
            style={{ zIndex: 999999 }}
          />
        </div>

        <div
          id="part6"
          className="absolute top-[220px] left-[15px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte6.src} className="w-[90px]" />
          <ReactTooltip
            anchorId="part6"
            place="left"
            content="Lentes oculares"
          />
        </div>

        <div
          id="part7"
          className="absolute top-[65px] left-[178px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte7.src} className="w-[47px]" />
          <ReactTooltip
            anchorId="part7"
            place="right"
            content="Punto de fijación luminoso"
          />
        </div>

        <div
          id="part8"
          className="absolute top-[210px] left-[215px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte8.src} className="w-[20px]" />
          <ReactTooltip anchorId="part8" place="right" content="Mentonera" />
        </div>

        <div
          id="part9"
          className="absolute top-[350px] left-[118px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte9.src} className="w-[15px]" />
          <ReactTooltip
            anchorId="part9"
            place="right"
            content="Ajuste de la anchura de la hendidura"
          />
        </div>

        <div
          id="part10"
          className="absolute top-[398px] left-[37px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help"
        >
          <img src={Parte10.src} className="w-[70px]" />
          <ReactTooltip
            anchorId="part10"
            place="left"
            content="Dispositivo de elevación y ajuste de enfoque"
          />
        </div>
        <img
          src={Lampara.src}
          className="transition-all duration-700 group-hover:grayscale -z-10"
        />
      </div>
    </div>
  );
};

interface IRenderComponent {
  id: string;
  src: string;
  top: string;
  left: string;
  width: string;
  content: string;
  place: "left" | "right" | "top" | "bottom";
  px?: string;
}

const RenderComponent: React.FC<IRenderComponent> = (props) => {
  const { px } = props;
  return (
    <>
      <div
        className={`absolute top-[${props.top}px] left-[${props.left}px] z-10 group-hover:scale-110 transition-all duration-700 cursor-help`}
        id={props.id}
      >
        <img
          src={props.src}
          className={`w-[${props.width}${px ? "px" : px}]`}
        />
      </div>
      <ReactTooltip
        anchorId={props.id}
        place={props.place}
        content={props.content}
        style={{ zIndex: 999999 }}
      />
    </>
  );
};

export default Partes;
