import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const CommonBox = ({
  placeholders,
  options,
  value,
  onChange,
  label,
  error,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-2">
        <Label>{label}</Label>
        <div className="grid gap-0.5">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between w-full hover:bg-transparent capitalize"
              >
                {value ? (
                  options?.find((option) => option.value === value)
                    ?.label
                ) : (
                  <span className="line-clamp-1">{placeholders}</span>
                )}
                <ChevronDown className="opacity-50 max-sm:size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 lg:w-[362px]" align="start">
              <Command>
                <CommandInput placeholder="search..." className="h-9" />
                <CommandList>
                  <CommandEmpty>not found</CommandEmpty>
                  <CommandGroup>
                    {options?.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          onChange(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {error && <p className="text-destructive text-xs">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default CommonBox;