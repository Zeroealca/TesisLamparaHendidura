import Image, { StaticImageData } from "next/image";

interface InformationSelectedProps {
  name: string;
  img: StaticImageData;
  data: string[];
}
const InformationSelected = ({ name, img, data }: InformationSelectedProps) => {
  return (
    <div className="w-full flex flex-col group">
      <div className="w-full h-full relative rounded-xl flex flex-col items-center justify-center cursor-pointer transition delay-75">
        <Image
          src={img}
          alt={"404"}
          className="absolute w-full h-full object-cover blur-sm"
        />
        <span className="z-10 text-black/75 text-4xl font-bold text-center">
          {name}
        </span>
      </div>
      <div className="w-full h-full mt-10 overflow-auto bg-blacktertiary rounded-lg py-3 hidden group-hover:block transition delay-75">
        {data.map((item, index) => (
          <div className="mb-2 px-8 text-grayprimary overflow-auto">
            <span className="text-xl font-bold capitalize">
              {index + 1}. {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationSelected;
