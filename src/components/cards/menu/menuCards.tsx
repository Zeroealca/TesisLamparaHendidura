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
    <div>
      <a
        href={to}
        className="max-w-[30rem] w-full lg:h-96 h-60 flex flex-col items-center justify-center bg-blacksecondary rounded-xl cursor-pointer group lg:hover:h-[30rem] md:hover:h-[21rem] hover:h-[23rem] transition-all ease-in-out duration-300"
      >
        <section className="bg-blacktertiary mx-auto lg:w-96 w-60 lg:h-96 h-60 lg:-mt-32 -mt-12 rounded-xl shadow-lg z-10">
          <Image
            src={image}
            alt="Picture of the author"
            className="p-5 mx-auto w-full h-full object-cover"
          />
        </section>
        <section className="invisible opacity-0 px-10 group-hover:visible group-hover:opacity-100 group-hover:mt-10 transition-all ease-in-out duration-300 group-hover:transition-all group-hover:ease-out group-hover:delay-200">
          <div className="text-center">
            <h2 className="text-2xl font-semibold uppercase">{title}</h2>
            <p className="text-sm text-center">{description}</p>
          </div>
        </section>
      </a>
    </div>
  );
};
export default MenuCards;
