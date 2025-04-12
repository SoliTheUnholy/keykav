"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  phone: z
    .string()
    .regex(new RegExp(/^(\+98|0)?9\d{9}$/), "شماره را به درستی وارد نمایید."),
  otp: z.string().min(6, "رمز یکبار مصرف را وارد کنید."),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      otp: "",
    },
  });

  function SendCode() {
    setLoading(true);
    form.trigger("phone").then(() => {
      if (!form.getFieldState("phone").error) {
        //otp send api call here + if success
        setLoading(false);
        setTimeRemaining(initialTime);
        setOtp(true);
      }
      setLoading(false);
    });
  }
  function Submit() {
    setLoading(true);
    form.trigger("otp").then(() => {
      if (!form.getFieldState("otp").error) {
        router.push("/navia-vip");
        //otp check api call here + if success
        setLoading(false);
      }
      setLoading(false);
    });
  }
  const initialTime = 2 * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [resend, setResend] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === -1) {
          return -1;
        } else if (prevTime === 0) {
          setResend(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  }, []);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  useEffect(() => {
    if (otp) {
      const abortController = new AbortController();

      if ("OTPCredential" in window) {
        const ac = new AbortController();
        navigator.credentials
          .get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((otp: any) => {
            if (otp && otp.code) {
              form.setValue("otp", otp.code);
              Submit();
            }
          })
          .catch((err) => {
            console.log("Error reading OTP:", err);
          });

        return () => {
          ac.abort();
        };
      }

      return () => {
        abortController.abort();
      };
    }
  }, [otp]);
  return (
    <div className="grid md:grid-cols-3">
      <Image
        className="absolute -z-10 h-screen bg-cover opacity-50 blur-3xl md:relative"
        height={1024}
        width={463}
        alt="gradient"
        //change it
        src={"/gradient.png"}
      ></Image>
      <div className="grid h-screen items-center justify-center md:col-span-2">
        <Form {...form}>
          <form className={`grid w-[90vw] max-w-90 gap-1`}>
            <Image
              height={120}
              width={120}
              alt="logo"
              className="absolute scale-0 rotate-90 justify-self-center transition-all duration-500 dark:scale-100 dark:rotate-0"
              src={"/logo.png"}
            ></Image>
            <Image
              height={120}
              width={120}
              alt="logo"
              className="scale-100 rotate-0 justify-self-center transition-all duration-500 dark:scale-0 dark:-rotate-90"
              src={"/logo-black.png"}
            ></Image>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem
                  className={`transition-all duration-500 ${otp && "h-0 translate-y-1/2 scale-y-0 opacity-0"}`}
                >
                  <FormLabel className="mx-auto mb-4 text-2xl">
                    ثبت نام/ورود به ماشین ناویا
                  </FormLabel>
                  <FormMessage className="mx-auto" />
                  <FormControl>
                    <Input
                      className="h-10 rounded-md text-center placeholder:text-center"
                      placeholder="09xxxx1234"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem
                  className={`transition-all duration-500 ${!otp && "h-0 translate-y-1/2 scale-y-0 opacity-0"}`}
                >
                  <FormLabel className="mx-auto mb-4 text-2xl">
                    رمز یکبار مصرف
                  </FormLabel>
                  <FormMessage className="mx-auto" />
                  <div className="flex justify-center gap-1">
                    <Button
                      disabled={!resend}
                      variant={"ghost"}
                      className="grow border"
                      onClick={() => {
                        form.setValue("otp", "");
                        setTimeRemaining(-1);
                        setResend(false);
                        try {
                          fetch("https:///api/Sign/SendPhoneNumber", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              PhoneNumber: form.getValues("phone"),
                            }),
                          }).then(async (response) => {
                            if (response.ok) {
                              setTimeRemaining(initialTime);
                            } else {
                              setResend(true);
                            }
                          });
                        } catch (error) {
                          setResend(true);
                          console.error("Error submitting data:", error);
                        }
                      }}
                    >
                      {timeRemaining != 0 && timeRemaining != -1 ? (
                        minutes + ":" + (seconds <= 9 ? "0" + seconds : seconds)
                      ) : !resend ? (
                        <>
                          <Loader className="text-muted-foreground animate-spin" />
                        </>
                      ) : (
                        "ارسال مجدد"
                      )}
                    </Button>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="justify-center gap-1">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <Button
              className="h-10 rounded-md font-semibold"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (!otp) {
                  SendCode();
                } else {
                  Submit();
                }
              }}
            >
              {loading ? (
                <>
                  <Loader className="text-muted-foreground mx-2 animate-spin" />
                  منتظر بمانید
                </>
              ) : !otp ? (
                "ارسال کد تایید"
              ) : (
                "ثبت نام"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
