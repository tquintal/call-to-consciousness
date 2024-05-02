"use client";

import Image from "next/image";
import { useState } from "react";
import { Portfolio } from "@/types/Services";

export const LinkCard = ({ src, description, link }: Portfolio) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <div className="w-96 h-52 shadow-lg bg-gray-300 duration-75 animate-pulse" />}
      <a href={link ?? "#"} rel="noopener noreferrer" target="_blank" className="flex flex-col gap-2">
        <div className="relative group h-fit cursor-pointer shadow-lg">
          <Image
            src={src}
            alt={description}
            width={350}
            height={350}
            onLoad={() => setIsLoading(false)}
            className="w-96 object-contain transition-all duration-300 group-hover:brightness-50"
          />
          <div className="absolute inset-0 bg-black p-6 bg-opacity-20 transition-all flex items-center justify-center opacity-0 duration-300 group-hover:opacity-100">
            <span className="text-white text-lg font-bold">{description}</span>
          </div>
        </div>
        <span className="md:hidden font-semibold">{description}</span>
      </a>
    </>
  );
};
