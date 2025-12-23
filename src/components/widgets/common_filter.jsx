import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import CommonButton from "./common_button";
import { CommonTextField } from "./common_textField";
import CommonBox from "../common/common_box";

const CommonFiltter = ({ filterData = [], onApplyFilters, onClearFilters }) => {
    const [filterValues, setFilterValues] = useState(() => {
        const initialState = {};
        filterData.forEach((filter, index) => {
            initialState[filter.placeholder || `filter_${index}`] = "";
        });
        return initialState;
    });

    const handleTextChange = (key, value) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSelectChange = (key, value) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onApplyFilters?.(filterValues);
    };

    const handleClear = () => {
        const cleared = {};
        filterData.forEach((filter, index) => {
            cleared[filter.placeholder || `filter_${index}`] = "";
        });
        setFilterValues(cleared);
        onClearFilters?.(cleared);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <CommonButton
                    variant="outline"
                    size="sm"
                    aria-label="Open Filters"
                >
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-sm" />
                        <span className="hidden md:inline">Filter</span>
                    </div>
                </CommonButton>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="text-lg font-semibold">
                        Filters
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-6 grid gap-5 overflow-y-auto max-h-[70vh] pr-1">
                    {filterData.map((list, index) => (
                        <div key={index} className="w-full">
                            {list.type === "text" && (
                                <CommonTextField
                                    label={list.label}
                                    placeholder={list.placeholder}
                                    value={filterValues[list.placeholder] || ""}
                                    onChange={(e) =>
                                        handleTextChange(list.placeholder, e.target.value)
                                    }
                                />
                            )}

                            {list.type === "select" && (
                                <CommonBox
                                    placeholders={list.placeholder}
                                    options={list.value}
                                    value={filterValues[list.placeholder] || ""}
                                    onChange={(val) =>
                                        handleSelectChange(list.placeholder, val)
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>

                <SheetFooter className="mt-6 flex gap-3">
                    <SheetClose asChild>
                        <CommonButton
                            size="sm"
                            className="w-full"
                            onClick={handleApply}
                        >
                            Apply Filters
                        </CommonButton>
                    </SheetClose>

                    <SheetClose asChild>
                        <CommonButton
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={handleClear}
                        >
                            Reset
                        </CommonButton>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CommonFiltter;