/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GradientCard } from "@/components/ui/gradient-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MutedInput } from "@/components/ui/muted-input";

const ThirdStep = ({
  setStep,
  formControl,
}: {
  setStep: (step: number) => void;
  formControl: any;
}) => {
  return (
    <div className={`grid gap-4`}>

      <div className="grid gap-2 text-center">
        <h2 className="text-2xl text-foreground">رزومت رو چک کنیم؟</h2>
        <p className="text-muted-foreground max-w-[90vw]">
          اگه نیازه اطلاعاتت ویرایش بشه، دکمه ویرایش اطلاعات رو بزن
        </p>
      </div>
      <div className="grid gap-6">
        <GradientCard className="w-lg max-w-[90vw]">
          <form className="grid gap-2">
            <FormField
              control={formControl}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5">
                  <FormLabel>نام:</FormLabel>
                  <FormControl>
                    <MutedInput className="sm:col-span-4 col-span-5" placeholder="نام و نام خانوادگی" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-5" />
                </FormItem>
              )}
            />
            <FormField
              control={formControl}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5">
                  <FormLabel>ایمیل:</FormLabel>
                  <FormControl>
                    <MutedInput className="sm:col-span-4 col-span-5" placeholder="ایمیل" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-5" />
                </FormItem>
              )}
            />
            <FormField
              control={formControl}
              name="major"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5">
                  <FormLabel className="text-nowrap">رشته تحصیلی:</FormLabel>
                  <FormControl>
                    <MutedInput className="sm:col-span-4 col-span-5" placeholder="رشته تحصیلی" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-5" />
                </FormItem>
              )}
            />
            <FormField
              control={formControl}
              name="university"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5">
                  <FormLabel>دانشگاه:</FormLabel>
                  <FormControl>
                    <MutedInput className="sm:col-span-4 col-span-5" placeholder="دانشگاه" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-5" />
                </FormItem>
              )}
            />
          </form>
        </GradientCard>
        <div className="mx-auto grid w-full gap-4 grid-cols-2 md:w-2/3">
          <Button
            onClick={() => setStep(4)}
            className="rounded-full px-6"
            variant={"outline"}
          >
            <ChevronRight />
            مرحله بعد
          </Button>
          <Button
            onClick={() => setStep(2)}
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

export default ThirdStep;
