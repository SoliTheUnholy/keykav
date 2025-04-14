"use client";

import { ChevronLeft, ChevronRight, Globe, GraduationCap } from "lucide-react";
import { CardDescription, CardTitle } from "../../components/ui/card";
import { GradientCard } from "../../components/ui/gradient-card";
import Image from "next/image";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useState } from "react";
const visible = Array.from({ length: 3 }, () => Math.floor(Math.random() * 12));
visible.push(Math.floor(Math.random() * 3));
const ForthStep = ({
  setStep,
  profs,
}: {
  setStep: (step: number) => void;
  profs: Array<{ firstName: string; lastName: string; id: string }>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-20 flex w-[90vw] flex-col items-center gap-6 sm:w-[80vw]">
      <div className="grid w-full gap-2 self-start">
        <h1 className="text-foreground text-2xl text-nowrap">
          اساتید پیشنهادی:
        </h1>
        <span className="text-muted-foreground text-nowrap">
          بهترین اساتید مناسب با رزومه شما
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent //change the url
            className="gap-4 rounded-3xl border-0 bg-[url(/gradient.png)] bg-cover pt-36 pb-12"
          >
            <DialogHeader className="gap-6">
              <DialogTitle className="text-primary text-center text-4xl font-medium">
                ماشین هوشمند ناویا
              </DialogTitle>
              <span className="text-center text-xl">
                مسیر مهاجرتت رو دستت بگیر
              </span>
              <ul className="text-foreground/75 mx-auto mt-6 flex w-fit list-disc flex-col items-start gap-3 text-sm font-light">
                <span className="text-foreground self-center text-center text-sm">
                  امکانات نسخه پرو:
                </span>
                <li>برداشت محدودیت از تمام امکانات طرح رایگان</li>
                <li>استخراج و پیشنهاد هوشمند دستاوردهای شما</li>
                <li>امکان بهبود هوشمند و دستی متن ایمیل</li>
                <li>برخورداری از به‌روزرسانی‌های بعدی ماشین ناویا</li>
                <li>قابلیت ویرایش و استفاده نامحدود برای سه ماه</li>
              </ul>
              <span className="text-foreground mt-12 text-center text-sm">
                ۵۸۸.۰۰۰ تومان/۳ماه
              </span>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="mx-auto w-full max-w-80 rounded-full px-6"
                onClick={() => setStep(5)}
                variant={"outline"}
              >
                امروز شروع کن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {profs.map((prof, index) => (
          <GradientCard
            key={prof.id}
            onClick={() => setOpen(true)}
            className={`${!visible.includes(index) && "blur-xs"} flex w-fit flex-col items-center gap-4 duration-500 ease-in-out hover:scale-[1.025]`}
          >
            <Image
              alt="Random user"
              height={100}
              width={100}
              //change this
              src="/passport.jpg"
              className="aspect-square h-24 w-24 rounded-full object-cover"
            />
            <CardTitle>
              {prof.firstName} {prof.lastName}
            </CardTitle>
            <CardDescription className="flex w-24 items-center justify-center gap-4">
              <Globe />
              <GraduationCap />
            </CardDescription>
            <div className="grid grid-cols-3 grid-rows-2 items-center gap-2">
              <Progress className="col-span-2" value={80} />
              <span className="text-muted-foreground col-span-1 text-xs text-nowrap">
                وزن علمی
              </span>
              <Progress className="col-span-2" value={80} />
              <span className="text-muted-foreground col-span-1 text-xs text-nowrap">
                همکاری ایرانی
              </span>
            </div>
          </GradientCard>
        ))}
      </div>
      <div className="mx-auto my-10 grid w-80 max-w-[90vw] grid-cols-2">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full px-6"
          variant={"outline"}
        >
          <ChevronRight />
          مرحله بعد
        </Button>
        <Button
          onClick={() => setStep(3)}
          className="rounded-full px-6"
          variant={"ghost"}
        >
          مرحله قبل
          <ChevronLeft />
        </Button>
      </div>
    </div>
  );
};

export default ForthStep;
