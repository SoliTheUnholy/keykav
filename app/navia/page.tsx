"use client";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FirstStep from "@/app/navia/first-page";
import SecondStep from "@/app/navia/second-page";
import ThirdStep from "@/app/navia/third-page";
import ForthStep from "@/app/navia/forth-page";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
const fileSizeLimit = 20 * 1024 * 1024;

const formSchema = z.object({
  name: z.string().min(2, " نام خود را به درستی وارد کنید.").max(50),
  email: z.string().email(" ایمیل خود را به درستی وارد کنید."),
  major: z.string().min(2, " نام رشته خود را به درستی وارد کنید.").max(50),
  university: z
    .string()
    .min(2, " نام دانشگاه خود را به درستی وارد کنید.")
    .max(50),
  CV: z
    .any()
    .refine((file) => file && ["application/pdf"].includes(file.type), {
      message: "فرمت فایل پشتیبانی نمیشود.",
    })
    .refine((file) => file.size <= fileSizeLimit, {
      message: "حجم عکس نباید بیشتر از 20Mb باشد.",
    }),
});

export default function Navia() {
  const [step, setStep] = useState(1);
  const [profs, setProfs] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/users").then((res) =>
      res.json().then((list) => setProfs(list.users)),
    );
  }, []);
  const [animation, setAnimation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      major: "",
      university: "",
    },
  });

  function ChangeStep(step: number) {
    setAnimation(true);
    setTimeout(() => {
      setStep(step);
      setAnimation(false);
    }, 400);
  }

  function setStepHandler(step: number) {
    if (step == 3) {
      form.trigger("CV").then((isValid) => {
        if (isValid) {
          //api call
          ChangeStep(step);
        } else {
          setError(form.formState.errors.CV?.message?.toString() || null);
        }
      });
    } else if (step == 4) {
      form.trigger(["name", "email", "major", "university"]).then((isValid) => {
        if (isValid) {
          //loading animation start
          //api call + use setProfs here
          ChangeStep(step);
          //loading animation stop
        }
      });
    } else if (step == 5) {
      // payment gate + result check
      router.push("/login");
    } else {
      ChangeStep(step);
    }
  }
  return (
    <>
      <BackgroundGradientAnimation />
      <div className="relative z-20 flex h-full min-h-svh w-full flex-col items-center justify-between text-white">
        <span className="h-34"></span>
        <div
          className={`${animation ? "animate-fade-out-left" : "animate-fade-in-right"} transition-all duration-500 ease-in-out`}
        >
          <Form {...form}>
            {step === 1 && <FirstStep setStep={setStepHandler} />}
            {step === 2 && (
              <SecondStep
                setStep={setStepHandler}
                setFile={(file: File) => {
                  form.setValue("CV", file);
                  router.refresh();
                }}
                files={form.getValues("CV")}
              />
            )}
            {step === 3 && (
              <ThirdStep formControl={form.control} setStep={setStepHandler} />
            )}
            {step === 4 && profs.length >= 12 && (
              <ForthStep setStep={setStepHandler} profs={profs.slice(0, 12)} />
            )}
          </Form>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <section
          className={`grid w-72 gap-4 justify-self-start py-12 text-center transition-all duration-300 ease-in-out`}
        >
          <p className="text-foreground text-sm">
            مرحله{" "}
            {step === 1
              ? "اول"
              : step === 2
                ? "دوم"
                : step === 3
                  ? "سوم"
                  : step === 4
                    ? "چهارم"
                    : step === 5
                      ? "پنجم"
                      : step === 6
                        ? "ششم"
                        : ""}
          </p>
          <Progress value={step * 15} />
        </section>
      </div>
    </>
  );
}
