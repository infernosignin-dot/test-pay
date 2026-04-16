"use client"

import { useRef, useState } from "react"
import type { FormData } from "@/app/page"
import { CTAButton } from "./cta-button"

interface Step4AddressProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onContinue: () => void
}

const TIME_SLOTS = [
  "7–9 am",
  "9–11 am",
  "11am–1pm",
  "1–3 pm",
  "3–5 pm",
  "5–7 pm",
]

export function Step4Address({ formData, updateFormData, onContinue }: Step4AddressProps) {
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "done">("idle")
  const pincodeRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)

  const handleUseLocation = () => {
    if (!navigator.geolocation) return
    
    setLocationStatus("loading")
    
    navigator.geolocation.getCurrentPosition(
      () => {
        setTimeout(() => {
          updateFormData({ pincode: "110001", city2: "New Delhi" })
          setLocationStatus("done")
          addressRef.current?.focus()
        }, 700)
      },
      () => {
        setLocationStatus("idle")
      }
    )
  }

  const inputClass = `
    w-full px-3.5 py-[13px] border border-[#D4E8BB] rounded-xl text-[15px]
    bg-[#FAFDF7] text-[#1A2410] font-sans outline-none
    transition-all duration-[180ms]
    focus:border-[#639922] focus:shadow-[0_0_0_3px_rgba(99,153,34,0.12)] focus:bg-white
    placeholder:text-[#7A8F6A]
  `

  return (
    <div className="px-6 py-6 flex flex-col gap-5">
      {/* Success Banner */}
      <div className="opacity-0 animate-fade-up stagger-1 bg-[#EAF3DE] border border-[#D4E8BB] rounded-[14px] p-3.5 px-4 flex items-center gap-3">
        <div className="w-[34px] h-[34px] rounded-full bg-[#4A7C1F] flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#4A7C1F]">Payment successful</p>
          <p className="text-[11px] text-[#3D4F30]">Now schedule your home collection</p>
        </div>
      </div>

      {/* Header */}
      <div className="opacity-0 animate-fade-up stagger-2">
        <h2 className="font-serif text-[20px] font-medium text-[#1A2410] leading-[1.3]">
          Where should<br />we collect?
        </h2>
        <p className="text-[13px] text-[#7A8F6A] mt-1">Our phlebotomist comes to you</p>
      </div>

      {/* Location Button */}
      <div className="opacity-0 animate-fade-up stagger-3">
        <button
          onClick={handleUseLocation}
          disabled={locationStatus === "loading"}
          className={`
            w-full py-[13px] px-4 border-[1.5px] border-[#639922] rounded-xl
            bg-[#EAF3DE] text-[#4A7C1F] text-[13px] font-medium
            flex items-center justify-center gap-2 cursor-pointer
            transition-all duration-[180ms] select-none
            hover:bg-[#F4FAF0] hover:border-[#4A7C1F]
            active:scale-[0.98]
          `}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {locationStatus === "loading" ? (
            "Locating…"
          ) : locationStatus === "done" ? (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8L7 11L12 5" stroke="#4A7C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Location set
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="6" r="2.5" stroke="#4A7C1F" strokeWidth="1.2"/>
                <path d="M7 1v1M7 12v1M1 7h1M12 7h1" stroke="#4A7C1F" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M7 8.5C4.5 8.5 3 10 3 11.5h8c0-1.5-1.5-3-4-3z" fill="#4A7C1F" opacity="0.3"/>
              </svg>
              Use my current location
            </>
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="opacity-0 animate-fade-up stagger-4 flex items-center gap-2.5">
        <div className="flex-1 h-px bg-[#ECF5E0]" />
        <span className="text-[11px] text-[#7A8F6A]">or enter manually</span>
        <div className="flex-1 h-px bg-[#ECF5E0]" />
      </div>

      {/* Address Fields */}
      <div className="opacity-0 animate-fade-up stagger-5">
        <p className="text-[10.5px] tracking-[0.08em] text-[#7A8F6A] font-medium uppercase mb-2.5">
          Collection address
        </p>
        <div className="flex flex-col gap-2.5">
          <input
            ref={addressRef}
            type="text"
            placeholder="Flat / house no., building, street"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && pincodeRef.current?.focus()}
            className={inputClass}
            autoComplete="street-address"
          />
          <div className="grid grid-cols-2 gap-2.5">
            <input
              ref={pincodeRef}
              type="number"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => updateFormData({ pincode: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && cityRef.current?.focus()}
              className={inputClass}
              autoComplete="postal-code"
            />
            <input
              ref={cityRef}
              type="text"
              placeholder="City"
              value={formData.city2}
              onChange={(e) => updateFormData({ city2: e.target.value })}
              className={inputClass}
              autoComplete="address-level2"
            />
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <p className="text-[10.5px] tracking-[0.08em] text-[#7A8F6A] font-medium uppercase mb-2.5">
          Preferred time slot
        </p>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => updateFormData({ timeSlot: slot })}
              className={`
                py-2.5 px-1.5 border rounded-[10px] text-[12px] text-center
                cursor-pointer transition-all duration-150 select-none
                ${formData.timeSlot === slot
                  ? "border-[#4A7C1F] bg-[#EAF3DE] text-[#4A7C1F] font-medium"
                  : "border-[#D4E8BB] bg-[#FAFDF7] text-[#3D4F30] hover:border-[#639922]"
                }
                active:scale-[0.95]
              `}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div>
        <CTAButton onClick={onContinue}>Confirm collection →</CTAButton>
        <p className="text-center text-[11.5px] text-[#7A8F6A] mt-2">
          {"We'll send a reminder on WhatsApp"}
        </p>
      </div>
    </div>
  )
}
