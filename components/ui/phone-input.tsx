"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { getCountries, getCountryCallingCode } from "libphonenumber-js"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

// Get localized country names
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

const countries = getCountries().map((country) => ({
  code: country,
  name: regionNames.of(country) || country,
  callingCode: `+${getCountryCallingCode(country)}`,
})).sort((a, b) => a.name.localeCompare(b.name));

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function PhoneInput({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  className,
  disabled = false,
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false)
  
  // Parse initial value to find country
  const [selectedCountry, setSelectedCountry] = React.useState<{
    code: string;
    name: string;
    callingCode: string;
  } | null>(() => {
    if (value && value.startsWith('+')) {
      const found = countries.find(c => value.startsWith(c.callingCode));
      return found || countries.find(c => c.code === 'US') || null;
    }
    return countries.find(c => c.code === 'US') || null;
  });

  const [phoneNumber, setPhoneNumber] = React.useState(() => {
    if (value && selectedCountry && value.startsWith(selectedCountry.callingCode)) {
      return value.slice(selectedCountry.callingCode.length);
    }
    return value || "";
  });

  // Sync internal state with external value
  React.useEffect(() => {
    if (value) {
      if (value.startsWith('+')) {
        // Try to find the matching country for the new value
        const found = countries.find(c => value.startsWith(c.callingCode));
        if (found) {
          setSelectedCountry(found);
          setPhoneNumber(value.slice(found.callingCode.length));
        } else {
          setPhoneNumber(value);
        }
      } else {
        setPhoneNumber(value);
      }
    } else {
      setPhoneNumber("");
    }
  }, [value]);

  React.useEffect(() => {
    if (selectedCountry) {
      const fullNumber = phoneNumber ? `${selectedCountry.callingCode}${phoneNumber}` : "";
      // Only call onChange if the value is actually different from the prop
      // and if we have a number or if we want to clear it
      if (fullNumber !== value) {
        onChange?.(fullNumber);
      }
    } else {
      if (phoneNumber !== value) {
        onChange?.(phoneNumber);
      }
    }
  }, [selectedCountry, phoneNumber, onChange, value]);

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setOpen(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // If the user pasted a full international number starting with +
    if (val.startsWith('+')) {
      const found = countries.find(c => val.startsWith(c.callingCode));
      if (found) {
        setSelectedCountry(found);
        val = val.slice(found.callingCode.length);
      }
    }
    
    // Also check if they typed the calling code of the current country without +
    if (selectedCountry && val.startsWith(selectedCountry.callingCode.slice(1))) {
        val = val.slice(selectedCountry.callingCode.length - 1);
    }

    const cleanedVal = val.replace(/[^\d]/g, ""); // Keep only digits
    setPhoneNumber(cleanedVal);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[120px] justify-between px-2 bg-background/50 border-border/50 shrink-0"
            disabled={disabled}
          >
            {selectedCountry ? (
              <span className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap">
                <span className="text-muted-foreground text-xs font-medium">{selectedCountry.code}</span>
                <span className="text-foreground font-semibold">{selectedCountry.callingCode}</span>
              </span>
            ) : (
              "Code"
            )}
            <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.callingCode} ${country.code}`}
                    onSelect={() => handleCountrySelect(country)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry?.code === country.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="flex-1">{country.name}</span>
                    <span className="text-muted-foreground">{country.callingCode}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        placeholder={placeholder}
        value={phoneNumber}
        onChange={handlePhoneChange}
        disabled={disabled}
        className="flex-1 bg-background/50 border-border/50"
      />
    </div>
  )
}
