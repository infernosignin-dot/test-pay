"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StepHeader } from "./step-header"
import type { CheckoutData } from "@/app/page"
import { MapPin, Navigation, Check, Loader2 } from "lucide-react"

interface StepAddressProps {
  data: CheckoutData
  updateData: (updates: Partial<CheckoutData>) => void
  onBack: () => void
}

export function StepAddress({ data, updateData, onBack }: StepAddressProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDetecting, setIsDetecting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.address.trim()) {
      newErrors.address = "Address is required"
    }
    
    if (!data.pincode.trim()) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(data.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode"
    }
    
    if (!data.city.trim()) {
      newErrors.city = "City is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDetectLocation = () => {
    setIsDetecting(true)
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In production, you would reverse geocode the coordinates
          // For demo, we'll simulate a detected address
          setTimeout(() => {
            updateData({
              address: "123 Main Street, Near Central Park",
              pincode: "110001",
              city: "New Delhi",
            })
            setIsDetecting(false)
          }, 1500)
        },
        () => {
          // Error or permission denied
          setIsDetecting(false)
          alert("Unable to detect location. Please enter manually.")
        }
      )
    } else {
      setIsDetecting(false)
      alert("Geolocation is not supported by your browser.")
    }
  }

  const handleSubmit = () => {
    if (validate()) {
      setIsComplete(true)
    }
  }

  if (isComplete) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Booking Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="mt-6 rounded-xl bg-secondary p-4 text-left">
            <p className="text-sm text-muted-foreground">Delivery Address:</p>
            <p className="mt-1 font-medium text-foreground">{data.address}</p>
            <p className="text-foreground">{data.city} - {data.pincode}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepHeader 
        title="Delivery address" 
        subtitle="Where should we deliver your kit?"
        onBack={onBack}
      />
      
      {/* GPS Detection Button */}
      <button
        onClick={handleDetectLocation}
        disabled={isDetecting}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-secondary/50 p-4 text-primary transition-all hover:border-primary hover:bg-secondary"
      >
        {isDetecting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-medium">Detecting location...</span>
          </>
        ) : (
          <>
            <Navigation className="h-5 w-5" />
            <span className="font-medium">Detect my location automatically</span>
          </>
        )}
      </button>
      
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="address"
              placeholder="Enter your full address"
              value={data.address}
              onChange={(e) => updateData({ address: e.target.value })}
              className={`pl-10 ${errors.address ? "border-destructive" : ""}`}
            />
          </div>
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="6-digit pincode"
              value={data.pincode}
              onChange={(e) => updateData({ pincode: e.target.value })}
              className={errors.pincode ? "border-destructive" : ""}
              maxLength={6}
            />
            {errors.pincode && (
              <p className="text-xs text-destructive">{errors.pincode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Your city"
              value={data.city}
              onChange={(e) => updateData({ city: e.target.value })}
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && (
              <p className="text-xs text-destructive">{errors.city}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleSubmit} className="w-full" size="lg">
          Complete Booking
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
