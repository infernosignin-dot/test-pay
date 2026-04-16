"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StepHeader } from "./step-header"
import type { CheckoutData } from "@/app/page"
import { ArrowRight } from "lucide-react"

interface StepPersonalInfoProps {
  data: CheckoutData
  updateData: (updates: Partial<CheckoutData>) => void
  onNext: () => void
}

export function StepPersonalInfo({ data, updateData, onNext }: StepPersonalInfoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(data.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number"
    }
    
    if (!data.age.trim()) {
      newErrors.age = "Age is required"
    } else if (parseInt(data.age) < 18 || parseInt(data.age) > 100) {
      newErrors.age = "Age must be between 18 and 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onNext()
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepHeader 
        title="Let&apos;s get started" 
        subtitle="Tell us a bit about yourself"
      />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
            className={errors.age ? "border-destructive" : ""}
            min={18}
            max={100}
          />
          {errors.age && (
            <p className="text-xs text-destructive">{errors.age}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleSubmit} className="w-full" size="lg">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
