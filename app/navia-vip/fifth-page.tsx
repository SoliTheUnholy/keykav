"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";
export const countries: Array<{
  value: string;
  coordinates?: [number, number];
  label: string;
  region?: string;
  rate?: number | null;
}> = [
  {
    value: "United States",
    coordinates: [-95.7129, 37.0902],
    label: "آمریکا",
    region: "eu-northamerica",
    rate: 45,
  }, // Strict visa policies for Iranian students, especially in STEM fields. Only strong academic profiles have better chances.
  {
    value: "Canada",
    coordinates: [-106.3468, 56.1304],
    label: "کانادا",
    region: "eu-northamerica",
    rate: 49,
  }, // High demand has led to more stringent application reviews for Iranian applicants in recent years.
  {
    value: "Mexico",
    coordinates: [-102.5528, 23.6345],
    label: "مکزیک",
    region: "eu-northamerica",
    rate: 65,
  },
  {
    value: "Nicaragua",
    coordinates: [-85.2072, 12.8654],
    label: "نیکاراگوئه",
    region: "eu-northamerica",
    rate: null,
  }, //50
  {
    value: "Costa Rica",
    coordinates: [-84.1945, 9.7489],
    label: "کاستاریکا",
    region: "eu-northamerica",
    rate: null,
  }, //55
  {
    value: "Jamaica",
    coordinates: [-77.2975, 18.1096],
    label: "جامائیکا",
    region: "eu-northamerica",
    rate: null,
  }, //60
  {
    value: "Puerto Rico",
    coordinates: [-66.5901, 18.2208],
    label: "پورتوریکو",
    region: "eu-northamerica",
    rate: null,
  }, // No acceptance due to U.S. dependency
  {
    value: "Netherlands",
    coordinates: [5.2913, 52.1326],
    label: "هلند",
    region: "eu-northamerica",
    rate: 55,
  }, // Moderate acceptance rates; proficiency in English is essential.
  {
    value: "Belgium",
    coordinates: [4.469936, 50.503887],
    label: "بلژیک",
    region: "eu-northamerica",
    rate: 50,
  }, // Moderate acceptance rates for Computer Science and IT-related programs.
  {
    value: "Luxembourg",
    coordinates: [6.1296, 49.8153],
    label: "لوکزامبورگ",
    region: "eu-northamerica",
    rate: 55,
  }, // Small but growing interest in international students, especially in tech.
  {
    value: "France",
    coordinates: [2.2137, 46.2276],
    label: "فرانسه",
    region: "eu-northamerica",
    rate: 50,
  }, // Moderate acceptance rates; influenced by diplomatic relations.
  {
    value: "Switzerland",
    coordinates: [8.2275, 46.8182],
    label: "سوئیس",
    region: "eu-northamerica",
    rate: 45,
  }, // Competitive academic environment and rigorous admission criteria.
  {
    value: "Monaco",
    coordinates: [7.4128, 43.7384],
    label: "موناکو",
    region: "eu-northamerica",
    rate: 90,
  },
  {
    value: "Austria",
    coordinates: [14.5501, 47.5162],
    label: "اتریش",
    region: "eu-northamerica",
    rate: 55,
  }, // Favorable for students proficient in German, with moderate acceptance rates.
  {
    value: "Germany",
    coordinates: [10.4515, 51.1657],
    label: "آلمان",
    region: "eu-northamerica",
    rate: 60,
  }, // Favorable immigration policies, but competitive programs may have lower acceptance rates.
  {
    value: "Italy",
    coordinates: [12.5674, 41.8719],
    label: "ایتالیا",
    region: "eu-northamerica",
    rate: 79,
  }, // Favorable acceptance rates, especially in technical universities.
  {
    value: "Spain",
    coordinates: [-3.7492, 40.4637],
    label: "اسپانیا",
    region: "eu-northamerica",
    rate: 45,
  }, // Favorable acceptance rates, particularly for applicants with language proficiency.
  {
    value: "Portugal",
    coordinates: [-8.2245, 39.3999],
    label: "پرتغال",
    region: "eu-northamerica",
    rate: 50,
  }, // Welcoming policies for international students, particularly in tech fields.
  {
    value: "Andorra",
    coordinates: [1.5218, 42.5063],
    label: "آندورا",
    region: "eu-northamerica",
    rate: 55,
  }, // Limited but favorable acceptance rates for niche programs.
  {
    value: "United Kingdom",
    coordinates: [-3.435973, 55.378051],
    label: "انگلستان",
    region: "eu-northamerica",
    rate: 40,
  }, // Competitive admissions and stringent visa requirements.
  {
    value: "Ireland",
    coordinates: [-8.2439, 53.4129],
    label: "ایرلند",
    region: "eu-northamerica",
    rate: 50,
  }, // Competitive programs in tech fields; strong profiles preferred.
  {
    value: "Denmark",
    coordinates: [9.5018, 56.2639],
    label: "دانمارک",
    region: "eu-northamerica",
    rate: 55,
  }, // Highly competitive programs in CS, with moderate acceptance rates.
  {
    value: "Norway",
    coordinates: [8.4689, 60.472],
    label: "نروژ",
    region: "eu-northamerica",
    rate: 65,
  }, // Tuition-free education makes Norway a popular choice, with high acceptance rates.
  {
    value: "Sweden",
    coordinates: [18.6435, 60.1282],
    label: "سوئد",
    region: "eu-northamerica",
    rate: 60,
  }, // Supportive policies for international students, particularly in postgraduate studies.
  {
    value: "Finland",
    coordinates: [25.748152, 61.92411],
    label: "فنلاند",
    region: "eu-northamerica",
    rate: 70,
  }, // High acceptance rates for CS programs due to innovative educational policies.
  {
    value: "Estonia",
    coordinates: [25.0136, 58.5953],
    label: "استونی",
    region: "eu-northamerica",
    rate: 75,
  },
  {
    value: "Latvia",
    coordinates: [24.6032, 56.8796],
    label: "لتونی",
    region: "eu-northamerica",
    rate: 70,
  },
  {
    value: "Lithuania",
    coordinates: [23.8813, 55.1694],
    label: "لیتوانی",
    region: "eu-northamerica",
    rate: 72,
  },
  {
    value: "Iceland",
    coordinates: [-19.0208, 64.9631],
    label: "ایسلند",
    region: "eu-northamerica",
    rate: 65,
  }, // Strong focus on research and postgraduate studies in CS.
  {
    value: "Brazil",
    coordinates: [-51.9253, -14.235],
    label: "برزیل",
    region: "asia-africa-southamerica",
    rate: 40,
  }, // Emerging destination for international students, but still moderately competitive.
  {
    value: "India",
    coordinates: [78.9629, 20.5937],
    label: "هند",
    region: "asia-africa-southamerica",
    rate: 50,
  }, // Moderate acceptance rates; mostly for technical programs like Computer Science.
  {
    value: "Turkey",
    coordinates: [35.2433, 38.9637],
    label: "ترکیه",
    region: "eu-northamerica",
    rate: 80,
  }, // High acceptance rates due to cultural and geographical proximity.
  {
    value: "Malaysia",
    coordinates: [101.9758, 4.2105],
    label: "مالزی",
    region: "asia-africa-southamerica",
    rate: 70,
  }, // Simplified visa processes and affordable tuition fees.
  {
    value: "Thailand",
    coordinates: [100.9925, 15.87],
    label: "تایلند",
    region: "asia-africa-southamerica",
    rate: 70,
  }, // High acceptance rates for affordable tech and CS programs.
  {
    value: "China",
    coordinates: [104.1954, 35.8617],
    label: "چین",
    region: "asia-africa-southamerica",
    rate: 70,
  }, // Increasing internationalization in education; moderate acceptance rates.
  {
    value: "Russia",
    coordinates: [105.3188, 61.524],
    label: "روسیه",
    region: "eu-northamerica",
    rate: null,
  }, // Focused on technical and engineering programs, with moderate acceptance rates.
  {
    value: "Romania",
    coordinates: [24.9668, 45.9432],
    label: "رومانی",
    region: "eu-northamerica",
    rate: 80,
  },
  {
    value: "Philippines",
    coordinates: [121.774, 12.8797],
    label: "فیلیپین",
    region: "asia-africa-southamerica",
    rate: 60,
  }, // Popular for technical education with moderate acceptance rates.
  {
    value: "Cyprus",
    coordinates: [33.4299, 35.1264],
    label: "قبرس",
    region: "eu-northamerica",
    rate: null,
  }, //75
  {
    value: "South Korea",
    coordinates: [127.7669, 35.9078],
    label: "کره جنوبی",
    region: "asia-africa-southamerica",
    rate: 40,
  }, // Strict admission and visa policies, especially for technical fields.
  {
    value: "Egypt",
    coordinates: [30.8025, 26.8206],
    label: "مصر",
    region: "asia-africa-southamerica",
    rate: 15,
  }, // Very restrictive visa policies for Iranian students.
  {
    value: "Greece",
    coordinates: [21.8243, 39.0742],
    label: "یونان",
    region: "eu-northamerica",
    rate: 50,
  }, // Accessible programs in Computer Science with moderate acceptance.
  {
    value: "Czech Republic",
    coordinates: [15.472962, 49.817492],
    label: "جمهوری چک",
    region: "eu-northamerica",
    rate: 45,
  }, // Increasingly popular for technical education with moderate acceptance rates.
  {
    value: "Qatar",
    coordinates: [51.1839, 25.3548],
    label: "قطر",
    region: "asia-africa-southamerica",
    rate: 60,
  }, // Growing infrastructure and educational opportunities attract international students.
  {
    value: "Lebanon",
    coordinates: [35.8623, 33.8547],
    label: "لبنان",
    region: "asia-africa-southamerica",
    rate: 60,
  },
  {
    value: "Japan",
    coordinates: [138.2529, 36.2048],
    label: "ژاپن",
    region: "asia-africa-southamerica",
    rate: 40,
  }, // Stringent visa policies and language barriers.
  {
    value: "Australia",
    coordinates: [174.885971, -40.900557],
    label: "استرالیا",
    region: "asia-africa-southamerica",
    rate: 45,
  }, // Recent tightening of visa regulations for Iranian students.
];

export default function FifthStep({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [selectedCountries, setSelectedCountries] = useState<
    Array<{
      value: string;
      coordinates?: [number, number];
      label: string;
      region?: string;
      rate?: number | null;
    }>
  >([]);
  const toggleOption = (option: {
    value: string;
    coordinates?: [number, number];
    label: string;
    region?: string;
    rate?: number | null;
  }) => {
    const newSelectedValues = selectedCountries.find(
      (country) => country.value === option.value,
    )
      ? selectedCountries.filter((value) => value.value !== option.value)
      : [...selectedCountries, option];
    setSelectedCountries(newSelectedValues);
  };
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="grid gap-2 text-center">
        <h2 className="text-foreground max-w-[90vw] text-2xl">
          دوست داری چطوری ادامه بدیم؟
        </h2>
        <p className="text-muted-foreground max-w-[90vw]">
          کشوری که مناسب‌تره رو انتخاب کن
        </p>
      </div>
      <div className="flex">
        <div className="bg-muted h-full w-full grow"></div>
        <Card className="bg-background grid w-fit gap-4 rounded-sm p-2 sm:p-4">
          <p className="text-right text-xl">انتخاب کشور</p>
          <MultiSelect
            options={countries}
            className="w-[90vw] max-w-80"
            onValueChange={setSelectedCountries}
            defaultValue={selectedCountries}
            placeholder="انتخاب کنید"
            popoverClass="max-w-80 w-[90vw]"
            maxCount={4}
          />
          <div className="grid w-xs max-w-[90vw] gap-2">
            <h2 className="text-foreground text-right text-xl font-semibold">
              کشور های پیشنهادی
            </h2>
            <ul className="flex flex-wrap gap-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center gap-1 p-1">
                  {countries.slice(0, 6).map((value) => {
                    return (
                      <div
                        key={value.value}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleOption(value);
                        }}
                        className={`bg-background text-foreground inline-flex cursor-pointer items-center rounded-full border px-4 py-1 text-xs font-semibold transition-all ${
                          selectedCountries.find(
                            (country) => country.value === value.value,
                          ) && "bg-primary !text-background"
                        }`}
                      >
                        {value?.label} {value.rate && `(${value.rate}%)`}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ul>
            <p className="text-muted-foreground text-right text-xs">
              برترین کشور‌ها بر اساس شانس پذیرش شما
            </p>
          </div>
          <Button
            onClick={() => setStep(6)}
            className="h-12"
            variant={"outline"}
          >
            انتخاب کشور
          </Button>
        </Card>
      </div>
    </div>
  );
}
