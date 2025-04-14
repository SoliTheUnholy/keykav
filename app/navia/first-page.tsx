"use client";

export default function FirstStep({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-foreground w-xl max-w-[90vw] text-center text-pretty">
        همانطور که می‌دانید، رویه‌ی معمول اپلای تحصیلی بسیار وقت‌گیر، طاقت‌فرسا
        و ناشناخته است. ماشین ناویا در این بخش به شما کمک می‌کند تا برنامه‌ی
        نهایی خود را پیدا کنید و اپلای بهینه و هدفمندتری را انجام دهید.
      </p>
      <button
        onClick={() => {
          setStep(2);
        }}
        className="relative inline-flex h-10 max-w-40 overflow-hidden rounded-full p-[2px]"
      >
        <span className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9F5BE3_0%,#FFB163_50%,#9F5BE3_100%)]" />
        <span className="bg-background text-foreground inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-5 py-0.5 text-sm font-medium text-nowrap backdrop-blur-3xl hover:opacity-95">
          اولین قدم رو بردار !
        </span>
      </button>
    </div>
  );
}
