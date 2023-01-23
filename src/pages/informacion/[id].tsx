import { useRouter } from "next/router";
import Image from "next/image";
import data_information from "./data/information";
import Eye from "../../public/eye.jpg";
import Sintomas from "../../public/sintomas.jpg";
import Diagnostico from "../../public/diagnostico.jpg";
import Tratamiento from "../../public/tratamiento.jpg";

const about = () => {
  const router = useRouter();
  const id = parseFloat(router.query.id as string);
  const newdata = data_information.find((item) => item.id === id);

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-3/5 h-4/5 bg-blacksecondary rounded-xl flex flex-col items-center">
        <section className="-mt-20 flex flex-col items-center">
          <Image
            className="rounded-full"
            src={Eye}
            alt={"404"}
            width={300}
            height={300}
          />
          <span className="font-bold text-4xl w-full py-5">
            {newdata?.name}
          </span>
        </section>
        <section className="w-full overflow-auto grid grid-cols-3 gap-8 items-center justify-center px-10">
          <div className="h-full w-full flex flex-col justify-center group">
            <div className="h-1/2 w-full relative rounded-xl flex flex-col items-center justify-center cursor-pointer">
              <Image
                src={Tratamiento}
                alt={"404"}
                className="absolute w-full h-full object-cover blur-sm"
              />
              <span className="z-10 text-black/75 text-4xl font-bold">
                Investigadores
              </span>
            </div>
            <div className="w-full mt-10 h-48 overflow-auto bg-blacktertiary rounded-lg py-3 hidden group-hover:block">
              {newdata?.treatment?.map((item, index) => {
                return (
                  <div className="mb-2 px-8 text-grayprimary overflow-auto">
                    <span className="text-xl font-bold">
                      {index + 1}. {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-full bg-blacktertiary rounded-xl flex flex-col items-center justify-center">
            <Image
              src={Diagnostico}
              alt={"404"}
              className="w-full h-full object-cover blur-sm"
            />
          </div>
          <div className="h-full bg-blacktertiary rounded-xl flex flex-col items-center justify-center">
            <Image
              src={Tratamiento}
              alt={"404"}
              className="w-full h-full object-cover blur-sm"
            />
            {/* <div className="absolute flex flex-col">
              <span className="font-bold text-2xl">Tratamiento</span>
            </div> */}
          </div>
          <div className="h-full bg-blacktertiary rounded-xl flex flex-col items-center justify-center">
            <Image
              src={Tratamiento}
              alt={"404"}
              className="w-full h-full object-cover blur-sm"
            />
          </div>
        </section>
      </div>
    </main>
  );
};
export default about;
