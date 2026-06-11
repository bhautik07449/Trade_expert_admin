import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../service/auth.service";
import { setSelectedCountry } from "../../store/slice/countryFilterSlice";
import PresencesService from "../../service/presences.service";
import {
  Globe,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "../../lib/utils";

export function Navbar({ title }) {
  const [profile, setProfile] = useState();
  const [countryOptions, setCountryOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state) => state.countryFilter.selectedCountry
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AuthService.getProfile();
        setProfile(response?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await PresencesService.getCountry();
        if (res?.data?.objects?.countries?.geometries) {
          const countries = res.data.objects.countries.geometries
            .map((item) => ({
              label: item?.properties?.name,
              value: item?.properties?.name,
            }))
            .filter((item) => item.label)
            .sort((a, b) => a.label.localeCompare(b.label));
          setCountryOptions([
            { label: "All Countries", value: "" },
            ...countries,
          ]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    getCountries();
  }, []);

  const handleSelect = (value) => {
    dispatch(setSelectedCountry(value === selectedCountry ? "" : value));
    setOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCountry(""));
  };

  const displayLabel = selectedCountry
    ? countryOptions.find((o) => o.value === selectedCountry)?.label
    : null;

  return (
    <header className="sticky top-0 z-10 w-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-md">
      <div className="mx-4 sm:mx-8 flex h-14 items-center gap-4">

        {/* Left: menu + title */}
        <div className="flex items-center space-x-4 lg:space-x-0 shrink-0">
          <SheetMenu />
          <h1 className="font-bold text-slate-200 text-lg">{title}</h1>
        </div>

        {/* Center: Global Country Filter */}
        <div className="flex flex-1 items-center justify-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                id="global-country-filter"
                className={cn(
                  "flex items-center gap-2 h-9 px-3 rounded-lg border transition-all duration-200 w-full max-w-[280px] text-sm font-medium",
                  "bg-white/15 border-white/30 text-white",
                  "hover:bg-white/25 hover:border-white/50",
                  open && "bg-white/25 border-white/50 ring-2 ring-white/20"
                )}
              >
                <Globe className="w-4 h-4 text-white/80 shrink-0" />
                <span className="flex-1 text-left truncate">
                  {displayLabel ?? (
                    <span className="text-white/70">Select Country</span>
                  )}
                </span>
                {selectedCountry ? (
                  <X
                    className="w-3.5 h-3.5 text-white/70 hover:text-white shrink-0 transition-colors"
                    onClick={handleClear}
                  />
                ) : (
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-white/70 shrink-0 transition-transform duration-200",
                      open && "rotate-180"
                    )}
                  />
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="p-0 w-[280px] shadow-2xl border-0 overflow-hidden rounded-xl"
              align="center"
              sideOffset={8}
            >
              {/* Popup header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2.5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/80" />
                <span className="text-white text-sm font-semibold tracking-wide">
                  Filter by Country
                </span>
              </div>

              <Command className="rounded-none">
                <div className="border-b border-gray-100">
                  <CommandInput
                    placeholder="Search country..."
                    className="h-9 text-sm border-0 focus:ring-0"
                  />
                </div>

                <CommandList className="max-h-64 overflow-y-auto">
                  <CommandEmpty>
                    <div className="flex flex-col items-center gap-1.5 py-6 text-gray-400">
                      <Globe className="w-8 h-8 opacity-30" />
                      <span className="text-sm">No country found</span>
                    </div>
                  </CommandEmpty>

                  <CommandGroup>
                    {countryOptions.map((option) => {
                      const isSelected = selectedCountry === option.value;
                      const isAll = option.value === "";
                      return (
                        <CommandItem
                          key={option.value || "all"}
                          value={option.label}
                          onSelect={() => handleSelect(option.value)}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm rounded-none transition-colors",
                            isSelected
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          <span
                            className={cn(
                              "flex items-center justify-center w-5 h-5 rounded-full text-xs shrink-0",
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-400"
                            )}
                          >
                            {isAll ? "✦" : option.label.charAt(0)}
                          </span>
                          <span className="flex-1 truncate">{option.label}</span>
                          <Check
                            className={cn(
                              "w-3.5 h-3.5 shrink-0 text-blue-600 transition-opacity",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>

                {/* Footer */}
                {selectedCountry && (
                  <div className="border-t border-gray-100 px-3 py-2">
                    <button
                      onClick={() => {
                        dispatch(setSelectedCountry(""));
                        setOpen(false);
                      }}
                      className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Clear filter
                    </button>
                  </div>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right: user nav */}
        <div className="flex items-center space-x-2 shrink-0">
          <UserNav profile={profile} />
        </div>
      </div>
    </header>
  );
}
