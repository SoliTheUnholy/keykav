"use client";
import * as React from "react";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Separator } from "./separator";

interface MultiSelectProps {
  options: {
    label: string;
    rate?: number | null;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    disable?: boolean;
  }[];

  onValueChange: (
    value: Array<{
      value: string;
      coordinates?: [number, number];
      label: string;
      region?: string;
      rate?: number | null;
    }>,
  ) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: Array<{
    value: string;
    coordinates?: [number, number];
    label: string;
    region?: string;
    rate?: number | null;
  }>;

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  popoverClass?: string;
  showall?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      popoverClass,
      showall = false,
      ...props
    },
    ref,
  ) => {
    const selectedValues = defaultValue;
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: {
      value: string;
      coordinates?: [number, number];
      label: string;
      region?: string;
      rate?: number | null;
    }) => {
      const newSelectedValues = selectedValues.find(
        (country) => country.value === option.value,
      )
        ? selectedValues.filter((value) => value.value !== option.value)
        : [...selectedValues, option];
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      onValueChange(newSelectedValues);
    };
    const filteredOptions = options.filter((option) => !option.disable);
    const toggleAll = () => {
      if (selectedValues.length === filteredOptions.length) {
        handleClear();
      } else {
        onValueChange(filteredOptions);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger>
          <div
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "bg-background hover:bg-background flex h-auto min-h-10 w-full items-center justify-between rounded-md border p-1",
              className,
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center gap-1 p-1">
                  {(showall
                    ? selectedValues
                    : selectedValues.slice(0, maxCount)
                  ).map((value) => {
                    const option = options.find((o) => o.value === value.value);
                    const IconComponent = option?.icon;
                    return (
                      <div
                        key={value.value}
                        className={cn(
                          "bg-background text-foreground inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
                        )}
                      >
                        {IconComponent && (
                          <IconComponent className="mr-2 h-4 w-4" />
                        )}
                        {option?.label}
                        <XCircle
                          className="mr-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </div>
                    );
                  })}
                  {!showall && selectedValues.length > maxCount && (
                    <div
                      className={cn(
                        "bg-background text-foreground inline-flex items-center rounded-full border px-2 py-0.5 hover:bg-transparent",
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} کشور دیگر`}
                      <XCircle
                        className="mr-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="text-muted-foreground mx-2 h-4 cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />
                  <ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="text-muted-foreground mx-3 text-sm">
                  {placeholder}
                </span>
                <ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-0", popoverClass)}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="جستجو..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>نتیجه ای یافت نشد</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "border-primary ml-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                      selectedValues.length === filteredOptions.length
                        ? "bg-primary text-background"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <CheckIcon className="h-4 w-4 text-background" />
                  </div>
                  <span>(انتخاب همه)</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.find(
                    (country) => country.value == option.value,
                  );
                  const isDisabled = option.disable; // Check if option is disabled
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => !isDisabled && toggleOption(option)}
                      className={cn(
                        "cursor-pointer",
                        isDisabled && "cursor-not-allowed opacity-50", // Disable styling
                      )}
                    >
                      <div
                        className={cn(
                          "border-primary ml-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "bg-primary text-background"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        {!isDisabled && <CheckIcon className="h-4 w-4 text-background" />}
                      </div>
                      {option.icon && (
                        <option.icon
                          className={cn(
                            "mr-2 h-4 w-4",
                            isDisabled ? "text-muted-foreground" : "",
                          )}
                        />
                      )}
                      <span>
                        {option.label} {option.rate && `(${option.rate}%)`}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 cursor-pointer justify-center border-r"
                      >
                        حذف همه
                      </CommandItem>
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="max-w-full flex-1 cursor-pointer justify-center"
                  >
                    بستن
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
