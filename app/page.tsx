"use client"

import { useState } from "react"
import { StepPersonalInfo } from "@/components/checkout/step-personal-info"
import { StepProgramme } from "@/components/checkout/step-programme"
import { StepPackage } from "@/components/checkout/step-package"
import { StepScheduling } from "@/components/checkout/step-scheduling"
import { StepPayment } from "@/components/checkout/step-payment"
import { StepAddress } from "@/components/checkout/step-address"
import { ProgressBar } from "@/components/checkout/progress-bar"

export interface CheckoutData {
  name: string
  phone: string
  age: string
  programme: string | null
  package: string | null
  date: string | null
  timeSlot: string | null
  address: string
  pincode: string
  city: string
}

const TOTAL_STEPS = 6

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<CheckoutData>({
    name: "",
    phone: "",
    age: "",
    programme: null,
    package: null,
    date: null,
    timeSlot: null,
    address: "",
    pincode: "",
    city: "",
  })

  const updateData = (updates: Partial<CheckoutData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-6">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <div className="mt-6">
          {currentStep === 1 && (
            <StepPersonalInfo
              data={data}
              updateData={updateData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <StepProgramme
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <StepPackage
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <StepScheduling
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 5 && (
            <StepPayment
              data={data}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 6 && (
            <StepAddress
              data={data}
              updateData={updateData}
              onBack={prevStep}
            />
          )}
        </div>
      </div>
    </main>
  )
}
