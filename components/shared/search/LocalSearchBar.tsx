"use client";

import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

interface LocalSearchBarProps {
  route: string;
  iconPostion: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPostion,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchBarProps) => {
  return (
    <div
      className={`background-light800_darkgradient  flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPostion === "left" && (
        <Image
          src={imgSrc}
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={""}
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPostion === "right" && (
        <Image
          src={imgSrc}
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
