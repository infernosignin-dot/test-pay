"use client"

import { StepHeader } from "./step-header"
import type { CheckoutData } from "@/app/page"
import { cn } from "@/lib/utils"
import { Check, Zap, Activity } from "lucide-react"

interface StepProgrammeProps {
  data: CheckoutData
  updateData: (updates: Partial<CheckoutData>) => void
  onNext: () => void
  onBack: () => void
}

const programmes = [
  {
    id: "erectaware",
    name: "ErectAware",
    description: "Comprehensive erectile health program with personalized guidance",
    icon: Zap,
    features: ["Daily exercises", "Progress tracking", "Expert support"],
  },
  {
    id: "hormoneos",
    name: "HormoneOS",
    description: "Optimize your hormonal balance naturally",
    icon: Activity,
    features: ["Hormone optimization", "Lifestyle guidance", "Lab tracking"],
  },
]

export function StepProgramme({ data, updateData, onNext, onBack }: StepProgrammeProps) {
  const handleSelect = (programmeId: string) => {
    updateData({ programme: programmeId })
    // Auto-advance after selection with slight delay for visual feedback
    setTimeout(() => {
      onNext()
    }, 250)
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepHeader 
        title="Choose your programme" 
        subtitle="Select the program that fits your goals"
        onBack={onBack}
      />
      
      <div className="space-y-3">
        {programmes.map((programme) => {
          const Icon = programme.icon
          const isSelected = data.programme === programme.id
          
          return (
            <button
              key={programme.id}
              onClick={() => handleSelect(programme.id)}
              className={cn(
                "w-full rounded-2xl border-2 p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-secondary"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{programme.name}</h3>
                    {isSelected && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{programme.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {programme.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Tap to select and continue
      </p>
    </div>
  )
}
