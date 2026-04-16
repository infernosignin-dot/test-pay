"use client"

import { StepHeader } from "./step-header"
import type { CheckoutData } from "@/app/page"
import { cn } from "@/lib/utils"
import { Check, Star } from "lucide-react"

interface StepPackageProps {
  data: CheckoutData
  updateData: (updates: Partial<CheckoutData>) => void
  onNext: () => void
  onBack: () => void
}

const packages = [
  {
    id: "starter",
    name: "Starter",
    duration: "1 Month",
    price: 2999,
    originalPrice: 4999,
    features: ["Basic program access", "Email support", "Progress tracking"],
    popular: false,
  },
  {
    id: "recommended",
    name: "Recommended",
    duration: "3 Months",
    price: 6999,
    originalPrice: 12999,
    features: ["Full program access", "Priority support", "Weekly check-ins", "Personalized plan"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    duration: "6 Months",
    price: 11999,
    originalPrice: 24999,
    features: ["Everything in Recommended", "1-on-1 coaching", "Lab test support", "Lifetime community"],
    popular: false,
  },
]

export function StepPackage({ data, updateData, onNext, onBack }: StepPackageProps) {
  const handleSelect = (packageId: string) => {
    updateData({ package: packageId })
    // Auto-advance after selection with slight delay for visual feedback
    setTimeout(() => {
      onNext()
    }, 250)
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepHeader 
        title="Select your package" 
        subtitle="Choose the duration that works for you"
        onBack={onBack}
      />
      
      <div className="space-y-3">
        {packages.map((pkg) => {
          const isSelected = data.package === pkg.id
          const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
          
          return (
            <button
              key={pkg.id}
              onClick={() => handleSelect(pkg.id)}
              className={cn(
                "relative w-full rounded-2xl border-2 p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-secondary"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50",
                pkg.popular && "ring-2 ring-primary ring-offset-2"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  <Star className="h-3 w-3 fill-current" />
                  Most Popular
                </div>
              )}
              
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {pkg.duration}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{pkg.originalPrice.toLocaleString()}
                    </span>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                      {discount}% off
                    </span>
                  </div>
                  
                  <ul className="mt-3 space-y-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                )}>
                  {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
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
