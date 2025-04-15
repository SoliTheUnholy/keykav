"use client";
import {
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { GradientCard } from "@/components/ui/gradient-card";
import { cn } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { countries } from "./fifth-page";
import { MultiSelect } from "@/components/ui/multi-select";
const Profs = [
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
  { id: Math.random(), name: "Luke Zettlemoyer", rating: 24, collabRate: 70 },
];
const data = [
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
  {
    id: Math.random(),
    name: "University of Washington",
    country: "آمریکا",
    rating: 80,
    type: "برتر",
    ranking: 21,
    major: "امنیت رایانه‌ای",
  },
];
export type UniType = {
  id: number;
  name: string;
  country: string;
  rating: number;
  type: string;
  ranking: number;
  major: string;
};

const SixthStep2 = ({ setStep }: { setStep: (step: number) => void }) => {
  const [selectedProfs, setSelectedProfs] = useState<
    Array<{
      id: number;
      name: string;
      rating: number;
      collabRate: number;
    }>
  >([]);
  const toggleProf = (Prof: {
    id: number;
    name: string;
    rating: number;
    collabRate: number;
  }) => {
    const newSelectedValues = selectedProfs.find(
      (Profs) => Profs.id === Prof.id,
    )
      ? selectedProfs.filter((value) => value.id !== Prof.id)
      : [...selectedProfs, Prof];
    setSelectedProfs(newSelectedValues);
  };
  const columns: ColumnDef<UniType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <>
          <span className="absolute right-4">ردیف</span>
          <Checkbox
            className="mr-8"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </>
      ),
      cell: ({ row }) => (
        <Checkbox
          className="mr-8"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            Profs.map((prof) => {
              if (prof.name === row.getValue("name")) {
                toggleProf(prof);
              }
            });
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            نام دانشگاه‌
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "country",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            کشور
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("country")}</div>
      ),
    },
    {
      accessorKey: "ranking",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            رتبه جهانی
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("ranking")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            رده
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            استاد
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("rating")}</div>
      ),
    },
    {
      accessorKey: "major",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            زمینه تحقیقاتی
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("major")}</div>
      ),
    },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const [selectedCountries, setSelectedCountries] = useState<
    Array<{
      value: string;
      coordinates?: [number, number];
      label: string;
      region?: string;
      rate?: number | null;
    }>
  >([]);
  const [selectedMajors, setSelectedMajors] = useState<
    Array<{
      value: string;
      label: string;
    }>
  >([]);
  return (
    <div className={`grid w-[90vw] gap-8 lg:max-w-[80vw]`}>
      <div className="grid w-full gap-4">
        <div className="grid items-center justify-between gap-2 sm:flex sm:flex-wrap">
          <div className="col-span-2 grid items-center gap-2 sm:flex">
            <span className="text-foreground text-xs text-nowrap">
              جست‌و‌جوی دانشگاه:
            </span>
            <Input
              className="!bg-background sm:min-w-72"
              placeholder="جست‌و‌جوی دانشگاه"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
          </div>
          <div className="grid items-center gap-2 sm:flex">
            <span className="text-xs text-nowrap">فیلتر کشور ها:</span>
            <MultiSelect
              options={countries}
              className="max-w-80"
              onValueChange={setSelectedCountries}
              defaultValue={selectedCountries}
              placeholder="انتخاب کنید"
              popoverClass="max-w-80 "
              maxCount={1}
            />
          </div>
          <div className="grid items-center gap-2 sm:flex">
            <span className="text-foreground text-xs text-nowrap">
              فیلتر فیلد تحقیقاتی:
            </span>
            <MultiSelect
              options={[{ value: "computer", label: "کامپیوتر" }]}
              className="max-w-80"
              onValueChange={setSelectedMajors}
              defaultValue={selectedMajors}
              placeholder="انتخاب کنید"
              popoverClass="max-w-80"
              maxCount={1}
            />
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                ستون ها <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        <div className="rounded-md border">
          <Table className="grid">
            <TableHeader className="grid">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="grid grid-cols-7">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="grid items-center justify-center"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="grid">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <Collapsible asChild key={row.id}>
                    <TableRow
                      className="grid grid-cols-7"
                      data-state={row.getIsSelected() && "selected"}
                    >
                      <CollapsibleTrigger asChild className="text-foreground">
                        <TableCell className="absolute flex items-center justify-center gap-2 hover:cursor-pointer">
                          <ChevronDown />
                          <span>{index + 1}</span>
                        </TableCell>
                      </CollapsibleTrigger>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="grid items-center justify-center"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                      <CollapsibleContent asChild>
                        <TableCell className="col-span-7">
                          <div className="mx-auto mb-10 flex flex-wrap justify-center gap-4 lg:gap-8">
                            {Profs.map((Prof) => {
                              const isSelected = selectedProfs.find(
                                (Profs) => Profs.id == Prof.id,
                              );
                              return (
                                <GradientCard
                                  key={Prof.id}
                                  onClick={() => toggleProf(Prof)}
                                  className={cn(
                                    "relative flex w-fit flex-col items-center justify-around gap-4 rounded-md transition-all duration-300 ease-in-out hover:scale-[1.025] hover:cursor-pointer",
                                    isSelected ? "border-primary" : "",
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "border-primary absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border",
                                      isSelected
                                        ? "bg-primary text-background"
                                        : "opacity-50 [&_svg]:invisible",
                                    )}
                                  >
                                    <CheckIcon className="text-background h-5 w-5" />
                                  </div>
                                  <Image
                                    alt="Random user"
                                    height={100}
                                    width={100}
                                    //change this
                                    src="/passport.jpg"
                                    className="aspect-square h-24 w-24 rounded-full object-cover"
                                  />
                                  <CardTitle>{Prof.name}</CardTitle>
                                  <CardDescription className="flex w-24 items-center justify-center gap-4">
                                    <Globe />
                                    <GraduationCap />
                                  </CardDescription>
                                  <div className="grid grid-cols-3 grid-rows-2 items-center gap-2">
                                    <Progress
                                      className="col-span-2"
                                      value={Prof.rating}
                                    />
                                    <span className="text-muted-foreground col-span-1 text-xs text-nowrap">
                                      وزن علمی
                                    </span>
                                    <Progress
                                      className="col-span-2"
                                      value={Prof.collabRate}
                                    />
                                    <span className="text-muted-foreground col-span-1 text-xs text-nowrap">
                                      همکاری ایرانی
                                    </span>
                                  </div>
                                </GradientCard>
                              );
                            })}
                          </div>
                        </TableCell>
                      </CollapsibleContent>
                    </TableRow>
                  </Collapsible>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    نتیجه ای یافت نشد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>{" "}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {selectedProfs.length} از {Profs.length} استاد انتخاب شد.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              قبل
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              بعد
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-sm gap-4">
        <div className="mx-auto grid w-full grid-cols-2 gap-4">
          <Button
            onClick={() => setStep(6)}
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
        <Button
          onClick={() => {
            setStep(6);
          }}
          variant={"link"}
          className="text-muted-foreground hover:cursor-pointer"
        >
          نیازمند انتخاب دستی هستید؟ اینجا رو کلیک کنید
        </Button>
      </div>
    </div>
  );
};

export default SixthStep2;
