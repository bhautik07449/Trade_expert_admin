import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { Check, ChevronDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

const MultiSelectBox = ({
  placeholders,
  options,
  value = [],
  onChange,
  label,
  error,
}) => {
  const [open, setOpen] = useState(false);

  const handleUnselect = (itemValue) => {
    onChange(value.filter((v) => v !== itemValue));
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="grid gap-0.5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full hover:bg-transparent capitalize h-auto min-h-10 py-2"
            >
              <div className="flex flex-wrap gap-1 items-center overflow-hidden">
                {value.length > 0 ? (
                  value.map((val) => {
                    const option = options?.find((o) => o.value === val);
                    return (
                      <Badge
                        key={val}
                        variant="secondary"
                        className="mr-1 mb-1 font-normal"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnselect(val);
                        }}
                      >
                        {option?.label || val}
                        <X className="ml-1 h-3 w-3 cursor-pointer" />
                      </Badge>
                    );
                  })
                ) : (
                  <span className="text-muted-foreground">{placeholders}</span>
                )}
              </div>
              <ChevronDown className="opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 lg:w-[362px]" align="start">
            <Command>
              <CommandInput placeholder="Search..." className="h-9" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options?.map((option) => {
                    const isSelected = value.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          if (isSelected) {
                            onChange(value.filter((v) => v !== option.value));
                          } else {
                            onChange([...value, option.value]);
                          }
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <Check className={cn("h-4 w-4")} />
                        </div>
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {error && <p className="text-destructive text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default MultiSelectBox;
