"use client";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import FifthStep from "./fifth-page";
import SixthStep from "./sixth-page";

export const formSchema = z.object({});

export default function NaviaVip() {
  const [step, setStep] = useState(5);
  const [animation, setAnimation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function ChangeStep(step: number) {
    setAnimation(true);
    setTimeout(() => {
      setStep(step);
      setAnimation(false);
    }, 400);
  }

  function setStepHandler(step: number) {
    if (step == 4) {
      router.push("/login");
      setError("");
      // payment gate + result check
    } else {
      ChangeStep(step);
    }
  }
  return (
    <>
      <BackgroundGradientAnimation />
      <div className="relative z-20 flex h-full min-h-screen w-full flex-col items-center justify-between text-white">
        <span className="h-34"></span>
        <div
          className={`${animation ? "animate-fade-out-left" : "animate-fade-in-right"} transition-all duration-500 ease-in-out`}
        >
          <Form {...form}>
            {step === 5 && <FifthStep setStep={setStepHandler} />}
            {step === 6 && <SixthStep setStep={setStepHandler} />}
          </Form>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <section
          className={`grid w-72 gap-4 justify-self-start py-12 text-center transition-all duration-300 ease-in-out`}
        >
          <p className="text-foreground text-sm">
            مرحله {step === 5 ? "پنجم" : step === 6 ? "ششم" : ""}
          </p>
          <Progress value={step * 15} />
        </section>
      </div>
    </>
  );
}
