"use client"

import { useRef, useEffect, useState } from "react"
import type { FormData } from "@/app/page"
import { CTAButton } from "./cta-button"

interface Step3PackageProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onContinue: () => void
}

const PROGRAMME_NAMES = {
  erect: "ErectAware™",
  hormone: "HormoneOS™",
}

const PACKAGE_INFO = {
  essential: { name: "Essential", price: "₹2,999" },
  advanced: { name: "Advanced", price: "₹3,999" },
}

export function Step3Package({ formData, updateFormData, onContinue }: Step3PackageProps) {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const paymentBlockRef = useRef<HTMLDivElement>(null)

  const handleSelectPackage = (pkg: "essential" | "advanced") => {
    updateFormData({ package: pkg })
    
    // Scroll to payment block after a short delay
    setTimeout(() => {
      paymentBlockRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 120)
  }

  return (
    <div className="px-6 py-6 flex flex-col gap-5">
      {/* Package Selection */}
      <div className="opacity-0 animate-fade-up stagger-1">
        <p className="text-[10.5px] tracking-[0.08em] text-[#7A8F6A] font-medium uppercase mb-2.5">
          Select package
        </p>
        <div className="flex flex-col gap-2.5">
          <PackageCard
            name="Essential"
            price="₹2,999"
            features={[
              "12 lab tests",
              "Smart report via WhatsApp",
              "Home sample collection",
            ]}
            selected={formData.package === "essential"}
            onClick={() => handleSelectPackage("essential")}
          />
          <PackageCard
            name="Advanced"
            price="₹3,999"
            features={[
              "18 lab tests",
              "Smart report + interpretation",
              "Specialist doctor consult",
              "Home sample collection",
            ]}
            selected={formData.package === "advanced"}
            onClick={() => handleSelectPackage("advanced")}
            recommended
          />
        </div>
      </div>

      {/* Payment Block - appears after package selection */}
      <div 
        ref={paymentBlockRef}
        className={`transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          formData.package 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-3.5 pointer-events-none h-0 overflow-hidden"
        }`}
      >
        <p className="text-[10.5px] tracking-[0.08em] text-[#7A8F6A] font-medium uppercase mb-2.5">
          Secure payment
        </p>
        
        {/* Payment Sheet */}
        <div className="bg-white border border-[#D4E8BB] rounded-[20px] p-5 shadow-[0_4px_24px_rgba(74,124,31,0.10)]">
          <div className="flex justify-between items-center py-2.5 border-b border-[#ECF5E0] text-[13px]">
            <span className="text-[#7A8F6A]">Programme</span>
            <span className="font-medium text-[#1A2410]">
              {formData.programme ? PROGRAMME_NAMES[formData.programme] : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#ECF5E0] text-[13px]">
            <span className="text-[#7A8F6A]">Package</span>
            <span className="font-medium text-[#1A2410]">
              {formData.package ? PACKAGE_INFO[formData.package].name : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 text-[14px]">
            <span className="font-medium text-[#1A2410]">Total</span>
            <span className="font-serif text-[22px] font-semibold text-[#4A7C1F]">
              {formData.package ? PACKAGE_INFO[formData.package].price : "—"}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex gap-2 my-3">
          {["UPI", "Card", "Net Banking"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method.toLowerCase().replace(" ", ""))}
              className={`
                flex-1 py-2.5 px-1.5 border-[1.5px] rounded-[10px] text-[11px] font-medium
                text-center cursor-pointer transition-all duration-150 select-none
                ${paymentMethod === method.toLowerCase().replace(" ", "")
                  ? "border-[#639922] bg-[#EAF3DE] text-[#4A7C1F]"
                  : "border-[#D4E8BB] bg-[#FAFDF7] text-[#3D4F30] hover:border-[#639922] hover:bg-[#EAF3DE] hover:text-[#4A7C1F]"
                }
                active:scale-[0.96]
              `}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Razorpay Trust Line */}
        <div className="flex items-center justify-center gap-1.5 mb-2 text-[11px] text-[#7A8F6A] opacity-85">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L1.5 3v3c0 2.5 2 4.5 4.5 5 2.5-.5 4.5-2.5 4.5-5V3L6 1z" stroke="#7A8F6A" strokeWidth="1" fill="rgba(74,124,31,0.08)"/>
          </svg>
          Secure checkout powered by Razorpay
        </div>

        <CTAButton onClick={onContinue}>Pay securely →</CTAButton>
        <p className="text-center text-[11.5px] text-[#7A8F6A] mt-2">
          256-bit encrypted · No hidden charges
        </p>
      </div>
    </div>
  )
}

interface PackageCardProps {
  name: string
  price: string
  features: string[]
  selected: boolean
  onClick: () => void
  recommended?: boolean
}

function PackageCard({ name, price, features, selected, onClick, recommended }: PackageCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        border-[1.5px] rounded-2xl p-4 px-[18px] cursor-pointer text-left w-full
        transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        relative select-none
        ${selected 
          ? "border-[#4A7C1F] bg-[#EAF3DE] shadow-[0_4px_20px_rgba(74,124,31,0.18)]" 
          : recommended
            ? "border-[#639922] bg-[#FAFDF7] hover:border-[#639922] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(74,124,31,0.08)]"
            : "border-[#D4E8BB] bg-[#FAFDF7] hover:border-[#639922] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(74,124,31,0.08)]"
        }
        active:scale-[0.98] active:transition-transform active:duration-100
      `}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Recommended Badge */}
      {recommended && (
        <div className="absolute -top-[1px] right-3.5 bg-[#4A7C1F] text-white text-[9.5px] font-medium py-[3px] px-2.5 rounded-b-lg tracking-[0.06em] uppercase">
          Recommended
        </div>
      )}

      {/* Top row */}
      <div className={`flex justify-between items-start mb-2.5 ${recommended ? "mt-1" : ""}`}>
        <p className={`text-[15px] font-medium ${selected ? "text-[#4A7C1F]" : "text-[#1A2410]"}`}>
          {name}
        </p>
        <p className="font-serif text-[20px] font-semibold text-[#4A7C1F]">
          {price}
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-1.5">
        {features.map((feature, i) => (
          <div key={i} className={`flex items-center gap-2 text-[12px] ${selected ? "text-[#3D4F30]" : "text-[#3D4F30]"}`}>
            <div className="w-[5px] h-[5px] rounded-full bg-[#639922] flex-shrink-0" />
            {feature}
          </div>
        ))}
      </div>
    </button>
  )
}
