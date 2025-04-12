"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SixthStep = ({ setStep }: { setStep: (step: number) => void }) => {
  return (
    <div className={`grid gap-4`}>
      <div className="grid gap-2 text-center">
        <h2 className="text-foreground text-2xl">دانشگاه‌های پیشنهادی: </h2>
        <p className="text-muted-foreground max-w-[90vw]">
          بهترین دانشگاه‌ها مناسب با رزومه شما
        </p>
      </div>
      <div className="grid w-sm gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default SixthStep;
