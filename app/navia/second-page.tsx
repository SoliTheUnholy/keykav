"use client";
import React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GradientCard } from "@/components/ui/gradient-card";

export default function SecondStep({
  setStep,
  setFile,
  files,
}: {
  setStep: (step: number) => void;
  setFile: (file: File) => void;
  files: File;
}) {
  return (
    <GradientCard className="relative pb-12">
      <FileUpload file={files} onChange={(file:File) => setFile(file)} />
      <Link
        href="#"
        className="hover:text-primary text-nowrap text-muted-foreground absolute right-1/2 bottom-0 my-4 translate-x-1/2 text-sm"
      >
        رزومه نداری؟ اینجا رو ببین
      </Link>
      <div
        className={`absolute bottom-0 left-1/2 -z-10 grid w-full -translate-x-1/2 grid-cols-2 gap-4 opacity-0 transition-all duration-500 md:w-2/3 ${files && "translate-y-full opacity-100"} pt-6`}
      >
        <Button
          onClick={() => {
            setStep(3);
          }}
          className="rounded-full px-6"
          variant={"outline"}
        >
          <ChevronRight />
          مرحله بعد
        </Button>
        <Button
          onClick={() => {
            setStep(1);
          }}
          className="rounded-full px-6"
          variant={"ghost"}
        >
          مرحله قبل
          <ChevronLeft />
        </Button>
      </div>
    </GradientCard>
  );
}
