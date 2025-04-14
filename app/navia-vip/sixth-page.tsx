"use client";
import {
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const Unis = [
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
];

const Profs = [
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
];
const SixthStep = ({ setStep }: { setStep: (step: number) => void }) => {
  const [selectedUnis, setSelectedUnis] = useState<
    Array<{
      id: number;
      name: string;
      country: string;
      rating: number;
      type: string;
      ranking: number;
      major: string;
    }>
  >([]);
  const toggleUni = (Uni: {
    id: number;
    name: string;
    country: string;
    rating: number;
    type: string;
    ranking: number;
    major: string;
  }) => {
    const newSelectedValues = selectedUnis.find((unis) => unis.id === Uni.id)
      ? selectedUnis.filter((value) => value.id !== Uni.id)
      : [...selectedUnis, Uni];
    setSelectedUnis(newSelectedValues);
  };
  const [selectedProfs, setSelectedProfs] = useState<
    Array<{
      id: number;
      name: string;
      rating: number;
      collabRate: number;
    }>
  >([]);
  const toggleProf = (Prof: {
    id: number;
    name: string;
    rating: number;
    collabRate: number;
  }) => {
    const newSelectedValues = selectedProfs.find(
      (Profs) => Profs.id === Prof.id,
    )
      ? selectedProfs.filter((value) => value.id !== Prof.id)
      : [...selectedProfs, Prof];
    setSelectedProfs(newSelectedValues);
  };
  return (
    <div className={`grid w-[90vw] gap-8 lg:max-w-[80vw]`}>
      <div className="grid gap-2">
        <h2 className="text-foreground text-2xl">دانشگاه‌های پیشنهادی: </h2>
        <p className="text-muted-foreground">
          بهترین دانشگاه‌ها مناسب با رزومه شما
        </p>
      </div>
      <div className="mb-10 grid gap-2">
        {Unis.map((uni) => {
          const isSelected = selectedUnis.find((unis) => unis.id == uni.id);
          return (
            <GradientCard
              key={uni.id}
              onClick={() => toggleUni(uni)}
              className={cn(
                "relative grid max-w-[90vw] grid-cols-2 items-center justify-around gap-4 rounded-md p-2 transition-all duration-300 ease-in-out hover:scale-[1.025] hover:cursor-pointer sm:flex sm:flex-row lg:max-w-[80vw]",
                isSelected ? "border-primary" : "",
              )}
            >
              <div
                className={cn(
                  "border-primary absolute right-2 flex h-5 w-5 items-center justify-center rounded-sm border sm:relative",
                  isSelected
                    ? "bg-primary text-background"
                    : "opacity-50 [&_svg]:invisible",
                )}
              >
                <CheckIcon className="text-background h-5 w-5" />
              </div>
              <span className="text-center">{uni.name}</span>
              <span className="text-center">{uni.country}</span>
              <span className="text-center">{uni.rating}</span>
              <span className="text-center">{uni.type}</span>
              <span className="text-center">{uni.ranking}</span>
              <span className="text-center">{uni.major}</span>
            </GradientCard>
          );
        })}
      </div>
      <div className="grid gap-2">
        <h2 className="text-foreground text-2xl">اساتید پیشنهادی: </h2>
        <p className="text-muted-foreground">
          بهترین اساتید مناسب با رزومه شما
        </p>
      </div>
      <div className="mx-auto mb-10 flex flex-wrap justify-center gap-4 lg:gap-8">
        {Profs.map((Prof) => {
          const isSelected = selectedProfs.find((Profs) => Profs.id == Prof.id);
          return (
            <GradientCard
              key={Prof.id}
              onClick={() => toggleProf(Prof)}
              className={cn(
                "relative flex w-fit flex-col items-center justify-around gap-4 rounded-md transition-all duration-300 ease-in-out hover:scale-[1.025] hover:cursor-pointer",
                isSelected ? "border-primary" : "",
              )}
            >
              <div
                className={cn(
                  "border-primary absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border",
                  isSelected
                    ? "bg-primary text-background"
                    : "opacity-50 [&_svg]:invisible",
                )}
              >
                <CheckIcon className="text-background h-5 w-5" />
              </div>
              <Image
                alt="Random user"
                height={100}
                width={100}
                //change this
                src="/passport.jpg"
                className="aspect-square h-24 w-24 rounded-full object-cover"
              />
              <CardTitle>{Prof.name}</CardTitle>
              <CardDescription className="flex w-24 items-center justify-center gap-4">
                <Globe />
                <GraduationCap />
              </CardDescription>
              <div className="grid grid-cols-3 grid-rows-2 items-center gap-2">
                <Progress className="col-span-2" value={Prof.rating} />
                <span className="text-muted-foreground col-span-1 text-xs text-nowrap">
                  وزن علمی
                </span>
                <Progress className="col-span-2" value={Prof.collabRate} />
                <span className="text-muted-foreground col-span-1 text-xs text-nowrap">
                  همکاری ایرانی
                </span>
              </div>
            </GradientCard>
          );
        })}
      </div>
      <div className="mx-auto grid w-sm gap-4">
        <div className="mx-auto grid w-full grid-cols-2 gap-4">
          <Button
            onClick={() => setStep(7)}
            className="rounded-full px-6"
            variant={"outline"}
          >
            <ChevronRight />
            مرحله بعد
          </Button>
          <Button
            onClick={() => setStep(5)}
            className="rounded-full px-6"
            variant={"ghost"}
          >
            مرحله قبل
            <ChevronLeft />
          </Button>
        </div>
        <Button
          onClick={() => {
            setStep(62);
          }}
          variant={"link"}
          className="text-muted-foreground hover:cursor-pointer"
        >
          نیازمند انتخاب دستی هستید؟ اینجا رو کلیک کنید
        </Button>
      </div>
    </div>
  );
};

export default SixthStep;
