"use client"

import type { FormData } from "@/app/page"

interface ConfirmScreenProps {
  formData: FormData
}

const PROGRAMME_NAMES = {
  erect: "ErectAware™",
  hormone: "HormoneOS™",
}

const PACKAGE_INFO = {
  essential: "Essential · ₹2,999",
  advanced: "Advanced · ₹3,999",
}

export function ConfirmScreen({ formData }: ConfirmScreenProps) {
  return (
    <div className="bg-white rounded-[28px] overflow-hidden min-h-[600px]">
      <div className="px-6 py-10 flex flex-col items-center text-center gap-4">
        {/* Big Check */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A7C1F] to-[#639922] flex items-center justify-center shadow-[0_8px_24px_rgba(74,124,31,0.30)] animate-pop-in">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14L11.5 19.5L22 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title */}
        <div>
          <p className="font-serif text-[26px] font-semibold text-[#1A2410] leading-[1.2]">
            {"You're booked."}
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-[13px] text-[#7A8F6A] leading-[1.6] max-w-[260px]">
          Our team will confirm your slot on WhatsApp within 2 hours.
        </p>

        {/* Summary Card */}
        <div className="w-full bg-[#FAFDF7] border border-[#D4E8BB] rounded-2xl p-4 mt-2">
          <SummaryRow 
            label="Programme" 
            value={formData.programme ? PROGRAMME_NAMES[formData.programme] : "Not selected"} 
          />
          <SummaryRow 
            label="Package" 
            value={formData.package ? PACKAGE_INFO[formData.package] : "Not selected"} 
          />
          <SummaryRow 
            label="Time slot" 
            value={formData.timeSlot || "Not selected"} 
            isLast 
          />
        </div>

        {/* Trust Line */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#639922]" />
          <p className="text-[11px] text-[#7A8F6A]">
            NABL certified · Private · Specialist reviewed
          </p>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, isLast }: { label: string; value: string; isLast?: boolean }) {
  return (
    <div className={`flex justify-between py-[7px] text-[13px] ${isLast ? "" : "border-b border-[#ECF5E0]"}`}>
      <span className="text-[#7A8F6A]">{label}</span>
      <span className="font-medium text-[#1A2410]">{value}</span>
    </div>
  )
}
