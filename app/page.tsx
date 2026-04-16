"use client"

import { useState, useRef } from "react"
import { StepIndicator } from "@/components/checkout/step-indicator"
import { MotiveBanner } from "@/components/checkout/motive-banner"
import { Step1Personal } from "@/components/checkout/step-1-personal"
import { Step2Programme } from "@/components/checkout/step-2-programme"
import { Step3Package } from "@/components/checkout/step-3-package"
import { Step4Address } from "@/components/checkout/step-4-address"
import { ConfirmScreen } from "@/components/checkout/confirm-screen"

export type FormData = {
  name: string
  phone: string
  age: string
  city: string
  programme: "erect" | "hormone" | null
  package: "essential" | "advanced" | null
  address: string
  pincode: string
  city2: string
  timeSlot: string | null
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [exitingStep, setExitingStep] = useState<number | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    age: "",
    city: "",
    programme: null,
    package: null,
    address: "",
    pincode: "",
    city2: "",
    timeSlot: null,
  })

  const screenRef = useRef<HTMLDivElement>(null)

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const goToStep = (step: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setExitingStep(currentStep)
    
    setTimeout(() => {
      setCurrentStep(step)
      setExitingStep(null)
      setIsTransitioning(false)
      if (screenRef.current) {
        screenRef.current.scrollTop = 0
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 200)
  }

  const goToConfirm = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setShowConfirm(true)
      setIsTransitioning(false)
    }, 220)
  }

  const motiveContent: Record<number, { title: string; sub: string }> = {
    2: { title: "You're taking\na great step.", sub: "Choose the programme that fits you" },
    3: { title: "Excellent choice.", sub: "Pick the package that works for you" },
    4: { title: "Almost there!", sub: "Just tell us where to come" },
  }

  const getStepClass = (step: number) => {
    if (currentStep === step) {
      return "block opacity-100 translate-x-0"
    }
    if (exitingStep === step) {
      return "block opacity-0 -translate-x-7"
    }
    return "hidden"
  }

  return (
    <div className="min-h-screen min-h-dvh flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[400px] bg-white/60 backdrop-blur-[20px] border border-[#D4E8BB]/80 rounded-[32px] p-1.5 shadow-[0_20px_60px_rgba(74,124,31,0.15),0_4px_12px_rgba(74,124,31,0.08)] relative z-10">
        {/* Main Screen */}
        <div 
          ref={screenRef}
          className={`bg-white rounded-[28px] overflow-hidden min-h-[600px] relative transition-all duration-[250ms] ${
            showConfirm ? "hidden" : "block"
          }`}
        >
          {/* Step 1 */}
          <div className={`transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getStepClass(1)}`}>
            <StepIndicator current={1} total={4} label="Let's start" />
            <Step1Personal 
              formData={formData} 
              updateFormData={updateFormData}
              onContinue={() => goToStep(2)}
            />
          </div>

          {/* Step 2 */}
          <div className={`transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getStepClass(2)}`}>
            <MotiveBanner 
              title={motiveContent[2].title} 
              subtitle={motiveContent[2].sub}
              show={currentStep === 2}
            />
            <StepIndicator current={2} total={4} label="Select programme" compact />
            <Step2Programme 
              formData={formData} 
              updateFormData={updateFormData}
              onContinue={() => goToStep(3)}
            />
          </div>

          {/* Step 3 */}
          <div className={`transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getStepClass(3)}`}>
            <MotiveBanner 
              title={motiveContent[3].title} 
              subtitle={motiveContent[3].sub}
              show={currentStep === 3}
            />
            <StepIndicator current={3} total={4} label="Select package" compact />
            <Step3Package 
              formData={formData} 
              updateFormData={updateFormData}
              onContinue={() => goToStep(4)}
            />
          </div>

          {/* Step 4 */}
          <div className={`transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getStepClass(4)}`}>
            <MotiveBanner 
              title={motiveContent[4].title} 
              subtitle={motiveContent[4].sub}
              show={currentStep === 4}
            />
            <StepIndicator current={4} total={4} label="Home collection" compact />
            <Step4Address 
              formData={formData} 
              updateFormData={updateFormData}
              onContinue={goToConfirm}
            />
          </div>
        </div>

        {/* Confirm Screen */}
        {showConfirm && (
          <ConfirmScreen formData={formData} />
        )}
      </div>
    </div>
  )
}
