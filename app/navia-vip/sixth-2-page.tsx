"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SixthStep2 = ({ setStep }: { setStep: (step: number) => void }) => {
  return (
    <div className={`grid w-[90vw] gap-4`}>
      <div className="grid gap-2">
        <h2 className="text-foreground text-2xl">دانشگاه‌های پیشنهادی: </h2>
        <p className="text-muted-foreground max-w-[90vw]">
          بهترین دانشگاه‌ها مناسب با رزومه شما
        </p>
      </div>
      <div className="grid gap-2">
        <h2 className="text-foreground text-2xl">اساتید پیشنهادی: </h2>
        <p className="text-muted-foreground max-w-[90vw]">
          بهترین اساتید مناسب با رزومه شما
        </p>
      </div>
      <div className="mx-auto grid w-sm gap-6">
        <div className="mx-auto grid w-full grid-cols-2 gap-4 md:w-2/3">
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
          <Button
            onClick={() => {
              setStep(6);
            }}
            variant={"link"}
            className="text-muted-foreground hover:cursor-pointer"
          >
            نیازمند انتخاب هوشمنذ هستید؟ اینجا رو کلیک کنید
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SixthStep2;
