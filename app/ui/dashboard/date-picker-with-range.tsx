"use client"

import * as React from "react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { fr } from "date-fns/locale"
import { FaCalendar } from "react-icons/fa"

export default function DatePickerWithRange({
    className,
    value,
    onChange,
}: React.HTMLAttributes<HTMLDivElement> & { value: DateRange | undefined, onChange: (date: DateRange | undefined) => void }) {

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start rounded-full border-none focus-visible:ring-2 font-semibold text-sm",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <FaCalendar className="mr-2 text-marron"/>
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {format(value.from, "dd/LL/yyyy", { locale: fr })} -{" "}
                                    {format(value.to, "dd/LL/yyyy", { locale: fr })}
                                </>
                            ) : (
                                format(value.from, "dd/LL/yyyy", { locale: fr })
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={onChange}
                        numberOfMonths={2}
                        locale={fr}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}