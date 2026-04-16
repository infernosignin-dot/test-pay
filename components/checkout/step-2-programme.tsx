"use client"

import { useRef, useEffect } from "react"
import type { FormData } from "@/app/page"
import { CTAButton } from "./cta-button"

interface Step2ProgrammeProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onContinue: () => void
}

export function Step2Programme({ formData, updateFormData, onContinue }: Step2ProgrammeProps) {
  const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null)

  const handleSelect = (programme: "erect" | "hormone") => {
    updateFormData({ programme })
    
    // Clear any existing timer
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current)
    }
    
    // Auto-advance after 600ms
    autoAdvanceTimer.current = setTimeout(() => {
      onContinue()
    }, 600)
  }

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current)
      }
    }
  }, [])

  const handleManualContinue = () => {
    if (!formData.programme) return
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current)
    }
    onContinue()
  }

  const buttonText = formData.programme === "erect" 
    ? "Continue with ErectAware™ →" 
    : formData.programme === "hormone"
      ? "Continue with HormoneOS™ →"
      : "Choose a programme →"

  return (
    <div className="px-6 py-6 flex flex-col gap-5">
      {/* Programme Selection */}
      <div className="opacity-0 animate-fade-up stagger-1">
        <p className="text-[10.5px] tracking-[0.08em] text-[#7A8F6A] font-medium uppercase mb-2.5">
          Which programme?
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <ProgrammeCard
            id="erect"
            name="ErectAware™"
            subtitle="Erectile health"
            selected={formData.programme === "erect"}
            onClick={() => handleSelect("erect")}
            icon={
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#639922" strokeWidth="1.3"/>
                <path d="M5 8h6M8 5v6" stroke="#639922" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            }
          />
          <ProgrammeCard
            id="hormone"
            name="HormoneOS™"
            subtitle="Hormonal health"
            selected={formData.programme === "hormone"}
            onClick={() => handleSelect("hormone")}
            icon={
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v4M8 10v4M2 8h4M10 8h4" stroke="#639922" strokeWidth="1.3" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="2.5" stroke="#639922" strokeWidth="1.3"/>
              </svg>
            }
          />
        </div>
      </div>

      {/* CTA */}
      <div className="opacity-0 animate-fade-up stagger-2">
        <CTAButton onClick={handleManualContinue} disabled={!formData.programme}>
          {buttonText}
        </CTAButton>
        <p className="text-center text-[11.5px] text-[#7A8F6A] mt-2">
          You can change this anytime
        </p>
      </div>
    </div>
  )
}

interface ProgrammeCardProps {
  id: string
  name: string
  subtitle: string
  selected: boolean
  onClick: () => void
  icon: React.ReactNode
}

function ProgrammeCard({ name, subtitle, selected, onClick, icon }: ProgrammeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        border-[1.5px] rounded-2xl p-4 cursor-pointer text-left
        transition-all duration-[200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        relative overflow-hidden select-none
        ${selected 
          ? "border-[#4A7C1F] bg-[#EAF3DE] shadow-[0_4px_16px_rgba(74,124,31,0.18)] -translate-y-0.5" 
          : "border-[#D4E8BB] bg-[#FAFDF7] hover:border-[#639922] hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(74,124,31,0.08)]"
        }
        active:scale-[0.97] active:transition-transform active:duration-100
      `}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Gradient overlay for selected state */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#EAF3DE] to-transparent rounded-[14px] transition-opacity duration-[220ms] ${selected ? "opacity-100" : "opacity-0"}`} />
      
      <div className="relative z-10">
        <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center mb-2.5 transition-colors duration-200 ${
          selected ? "bg-[rgba(99,153,34,0.25)]" : "bg-[#EAF3DE]"
        }`}>
          {icon}
        </div>
        <p className={`text-[13px] font-medium leading-[1.3] mb-0.5 transition-colors duration-200 ${
          selected ? "text-[#4A7C1F]" : "text-[#1A2410]"
        }`}>
          {name}
        </p>
        <p className={`text-[11px] transition-colors duration-200 ${
          selected ? "text-[#3D4F30]" : "text-[#7A8F6A]"
        }`}>
          {subtitle}
        </p>
      </div>
    </button>
  )
}
