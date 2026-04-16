"use client"

import { useRef, useState } from "react"
import type { FormData } from "@/app/page"
import { CTAButton } from "./cta-button"

interface Step1PersonalProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onContinue: () => void
}

export function Step1Personal({ formData, updateFormData, onContinue }: Step1PersonalProps) {
  const phoneRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const [shakeField, setShakeField] = useState<string | null>(null)

  const handleNameBlur = () => {
    if (formData.name.trim().length >= 2) {
      setTimeout(() => phoneRef.current?.focus(), 80)
    }
  }

  const handlePhoneInput = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10)
    updateFormData({ phone: cleaned })
    if (cleaned.length === 10) {
      setTimeout(() => ageRef.current?.focus(), 80)
    }
  }

  const handleContinue = () => {
    if (!formData.name.trim()) {
      setShakeField("name")
      nameRef.current?.focus()
      setTimeout(() => setShakeField(null), 300)
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setShakeField("phone")
      phoneRef.current?.focus()
      setTimeout(() => setShakeField(null), 300)
      return
    }
    onContinue()
  }

  const inputClass = (field: string) => `
    w-full px-3.5 py-[13px] border border-[#D4E8BB] rounded-xl text-[15px]
    bg-[#FAFDF7] text-[#1A2410] font-sans outline-none
    transition-all duration-[180ms]
    focus:border-[#639922] focus:shadow-[0_0_0_3px_rgba(99,153,34,0.12)] focus:bg-white
    placeholder:text-[#7A8F6A]
    ${formData[field as keyof FormData] ? "border-[#639922] bg-white" : ""}
    ${shakeField === field ? "animate-shake" : ""}
  `

  return (
    <div className="px-6 py-6 flex flex-col gap-5">
      {/* Header */}
      <div className="opacity-0 animate-fade-up stagger-1">
        <h1 className="font-serif text-[22px] font-medium text-[#1A2410] leading-[1.3] mb-[3px]">
          Complete your<br />booking
        </h1>
        <p className="text-[13px] text-[#7A8F6A]">Takes less than 30 seconds</p>
      </div>

      {/* Form Fields */}
      <div className="opacity-0 animate-fade-up stagger-2">
        <p className="text-[10.5px] tracking-[0.08em] text-[#7A8F6A] font-medium uppercase mb-2.5">
          Your details
        </p>
        <div className="flex flex-col gap-2.5">
          <input
            ref={nameRef}
            type="text"
            placeholder="What should we call you?"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            onBlur={handleNameBlur}
            onKeyDown={(e) => e.key === "Enter" && phoneRef.current?.focus()}
            className={inputClass("name")}
            autoComplete="name"
          />
          <div className="flex gap-2">
            <div className="px-3.5 py-[13px] border border-[#D4E8BB] rounded-xl text-[15px] text-[#7A8F6A] bg-[#FAFDF7] whitespace-nowrap font-sans">
              +91
            </div>
            <input
              ref={phoneRef}
              type="tel"
              placeholder="Where should we send updates?"
              value={formData.phone}
              onChange={(e) => handlePhoneInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ageRef.current?.focus()}
              className={`flex-1 ${inputClass("phone")}`}
              maxLength={10}
              autoComplete="tel"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <input
              ref={ageRef}
              type="number"
              placeholder="Your age"
              value={formData.age}
              onChange={(e) => updateFormData({ age: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleContinue()}
              className={inputClass("age")}
              min={18}
              max={80}
              autoComplete="off"
            />
            <select
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className={inputClass("city")}
            >
              <option value="">Your city</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Hyderabad</option>
              <option>Pune</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="opacity-0 animate-fade-up stagger-3">
        <CTAButton onClick={handleContinue}>Continue →</CTAButton>
        <p className="text-center text-[11.5px] text-[#7A8F6A] mt-2">
          100% private · No spam
        </p>
      </div>

      {/* Trust Strip */}
      <div className="opacity-0 animate-fade-up stagger-4 flex justify-between pt-3 border-t border-[#ECF5E0]">
        <TrustItem label="NABL certified labs" />
        <TrustItem label="Specialist doctor" />
        <TrustItem label="Home collection" />
      </div>
    </div>
  )
}

function TrustItem({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-[3px] flex-1">
      <div className="w-1.5 h-1.5 rounded-full bg-[#639922] mb-0.5" />
      <p className="text-[10px] text-[#7A8F6A] text-center leading-[1.3]">{label}</p>
    </div>
  )
}
