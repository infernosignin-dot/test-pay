"use client"

import { Button } from "@/components/ui/button"
import { StepHeader } from "./step-header"
import type { CheckoutData } from "@/app/page"
import { cn } from "@/lib/utils"
import { Shield, Lock, CreditCard, Check } from "lucide-react"

interface StepPaymentProps {
  data: CheckoutData
  onNext: () => void
  onBack: () => void
}

const programmes: Record<string, { name: string }> = {
  erectaware: { name: "ErectAware" },
  hormoneos: { name: "HormoneOS" },
}

const packages: Record<string, { name: string; duration: string; price: number }> = {
  starter: { name: "Starter", duration: "1 Month", price: 2999 },
  recommended: { name: "Recommended", duration: "3 Months", price: 6999 },
  premium: { name: "Premium", duration: "6 Months", price: 11999 },
}

const timeSlots: Record<string, string> = {
  "morning-early": "8:00 AM",
  "morning-mid": "9:00 AM",
  "morning-late": "10:00 AM",
  "afternoon-early": "12:00 PM",
  "afternoon-mid": "2:00 PM",
  "afternoon-late": "4:00 PM",
  "evening-early": "6:00 PM",
  "evening-late": "8:00 PM",
}

function formatDate(dateString: string | null) {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { 
    weekday: "long", 
    month: "long", 
    day: "numeric" 
  })
}

export function StepPayment({ data, onNext, onBack }: StepPaymentProps) {
  const selectedProgramme = data.programme ? programmes[data.programme] : null
  const selectedPackage = data.package ? packages[data.package] : null
  const selectedTime = data.timeSlot ? timeSlots[data.timeSlot] : null

  const handlePayment = () => {
    // In production, this would integrate with Razorpay
    // For now, simulate payment success and proceed
    onNext()
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepHeader 
        title="Review and pay" 
        subtitle="Confirm your selection before payment"
        onBack={onBack}
      />
      
      {/* Order Summary Card */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-4 font-semibold text-foreground">Order Summary</h3>
        
        <div className="space-y-3">
          {/* Programme */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Programme</span>
            <span className="font-medium text-foreground">
              {selectedProgramme?.name || "-"}
            </span>
          </div>
          
          {/* Package */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Package</span>
            <span className="font-medium text-foreground">
              {selectedPackage ? `${selectedPackage.name} (${selectedPackage.duration})` : "-"}
            </span>
          </div>
          
          {/* Scheduled Time */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Consultation</span>
            <span className="text-right font-medium text-foreground">
              {data.date && selectedTime ? (
                <>
                  {formatDate(data.date)}
                  <br />
                  <span className="text-sm text-muted-foreground">{selectedTime}</span>
                </>
              ) : "-"}
            </span>
          </div>
          
          <div className="my-3 border-t border-border" />
          
          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-primary">
              ₹{selectedPackage?.price.toLocaleString() || "0"}
            </span>
          </div>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-3 font-semibold text-foreground">Payment Method</h3>
        
        <div className="space-y-2">
          <div className={cn(
            "flex items-center gap-3 rounded-xl border-2 border-primary bg-secondary p-3"
          )}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Card / UPI / Netbanking</p>
              <p className="text-xs text-muted-foreground">All payment options available</p>
            </div>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <Check className="h-3 w-3 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          <span>100% Secure</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="h-4 w-4" />
          <span>SSL Encrypted</span>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          onClick={handlePayment} 
          className="w-full" 
          size="lg"
        >
          Pay securely
          <Lock className="ml-2 h-4 w-4" />
        </Button>
        
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Secure checkout powered by Razorpay
        </p>
      </div>
    </div>
  )
}
