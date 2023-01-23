import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
interface MenuCardsProps {
  title: string;
  description: string;
  image: StaticImageData;
  to: string;
}
const MenuCards = ({ title, description, image, to }: MenuCardsProps) => {
  return (
    <main>
      <a
        href={to}
        className="w-[30rem] h-96 flex flex-col items-center justify-center bg-blacksecondary rounded-xl cursor-pointer group hover:h-[30rem] transition-all ease-in-out duration-300"
      >
        <section className="bg-blacktertiary mx-auto w-96 -mt-32 rounded-xl shadow-lg z-10">
          <Image
            src={image}
            alt="Picture of the author"
            className="p-5 mx-auto w-full object-contain"
          />
        </section>
        <section className="invisible opacity-0 px-10 group-hover:visible group-hover:opacity-100 group-hover:mt-10 transition-all ease-in-out duration-300 group-hover:transition-all group-hover:ease-out group-hover:delay-200">
          <div className="text-center">
            <h2 className="text-2xl font-semibold uppercase">{title}</h2>
            <p className="text-sm text-center">{description}</p>
          </div>
        </section>
      </a>
    </main>
  );
};
export default MenuCards;
