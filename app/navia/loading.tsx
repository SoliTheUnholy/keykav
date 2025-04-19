"use client";
import LetterGlitch from "@/components/ui/letter-glitch";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div
      className={`absolute top-0 right-0 z-50 h-screen w-screen overflow-hidden opacity-100 transition-all duration-1000`}
    >
      <div className="text-foreground absolute top-1/2 right-1/2 z-50 flex translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center font-semibold">
        <Image
          height={120}
          width={120}
          alt="logo"
          className="absolute scale-0 rotate-90 animate-spin justify-self-center transition-all duration-500 dark:scale-100 dark:rotate-0"
          src={"/logo.png"}
        ></Image>
        <Image
          height={120}
          width={120}
          alt="logo"
          className="scale-100 rotate-0 animate-spin justify-self-center transition-all duration-500 dark:scale-0 dark:rotate-90"
          src={"/logo-black.png"}
        ></Image>
        <p>در حال بررسی بهترین موقعیت‌ها بر اساس رزومه شما</p>
      </div>
      <LetterGlitch
        glitchColors={["#9F5BE3", "#FFB163"]}
        glitchSpeed={100}
        centerVignette={true}
        outerVignette={true}
        smooth={true}
      />
    </div>
  );
};

export default Loading;
