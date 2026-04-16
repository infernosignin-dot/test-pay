"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { StepHeader } from "./step-header"
import type { CheckoutData } from "@/app/page"
import { cn } from "@/lib/utils"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface StepSchedulingProps {
  data: CheckoutData
  updateData: (updates: Partial<CheckoutData>) => void
  onNext: () => void
  onBack: () => void
}

const timeSlots = [
  { id: "morning-early", label: "8:00 AM", period: "Morning" },
  { id: "morning-mid", label: "9:00 AM", period: "Morning" },
  { id: "morning-late", label: "10:00 AM", period: "Morning" },
  { id: "afternoon-early", label: "12:00 PM", period: "Afternoon" },
  { id: "afternoon-mid", label: "2:00 PM", period: "Afternoon" },
  { id: "afternoon-late", label: "4:00 PM", period: "Afternoon" },
  { id: "evening-early", label: "6:00 PM", period: "Evening" },
  { id: "evening-late", label: "8:00 PM", period: "Evening" },
]

function getNextDays(count: number) {
  const days = []
  const today = new Date()
  
  for (let i = 1; i <= count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      date: date.toISOString().split("T")[0],
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    })
  }
  
  return days
}

export function StepScheduling({ data, updateData, onNext, onBack }: StepSchedulingProps) {
  const [availableDays, setAvailableDays] = useState<ReturnType<typeof getNextDays>>([])
  const [startIndex, setStartIndex] = useState(0)
  const visibleDays = 5

  useEffect(() => {
    setAvailableDays(getNextDays(14))
  }, [])

  const canGoBack = startIndex > 0
  const canGoForward = startIndex + visibleDays < availableDays.length

  const handleDateSelect = (date: string) => {
    updateData({ date })
  }

  const handleTimeSelect = (timeSlot: string) => {
    updateData({ timeSlot })
  }

  const isValid = data.date && data.timeSlot

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepHeader 
        title="Choose your preferred time" 
        subtitle="Select a date and time for your consultation"
        onBack={onBack}
      />
      
      {/* Date Selection */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Select Date</h3>
          <div className="flex gap-1">
            <button
              onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
              disabled={!canGoBack}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                canGoBack 
                  ? "bg-secondary text-foreground hover:bg-secondary/80" 
                  : "text-muted-foreground/30"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setStartIndex((prev) => Math.min(availableDays.length - visibleDays, prev + 1))}
              disabled={!canGoForward}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                canGoForward 
                  ? "bg-secondary text-foreground hover:bg-secondary/80" 
                  : "text-muted-foreground/30"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          {availableDays.slice(startIndex, startIndex + visibleDays).map((day) => (
            <button
              key={day.date}
              onClick={() => handleDateSelect(day.date)}
              className={cn(
                "flex flex-1 flex-col items-center rounded-xl border-2 py-3 transition-all duration-200",
                data.date === day.date
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <span className={cn(
                "text-xs",
                data.date === day.date ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {day.day}
              </span>
              <span className="text-lg font-semibold">{day.dayNum}</span>
              <span className={cn(
                "text-xs",
                data.date === day.date ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {day.month}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Time Selection */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-foreground">Select Time</h3>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleTimeSelect(slot.id)}
              className={cn(
                "rounded-xl border-2 px-2 py-3 text-center transition-all duration-200",
                data.timeSlot === slot.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <span className="text-sm font-medium">{slot.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button 
          onClick={onNext} 
          className="w-full" 
          size="lg"
          disabled={!isValid}
        >
          Continue to payment
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
