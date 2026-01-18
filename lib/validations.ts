import { z } from "zod"
import { isValidPhoneNumber, isPossiblePhoneNumber } from "libphonenumber-js"

// Strict email validation to prevent loose formats like bddjj@hdh.cs
const strictEmail = z.string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email format"
  )
  .refine((val: string) => {
    const domain = val.split("@")[1]
    const tld = domain.split(".").pop()?.toLowerCase()
    // Specifically blocking retired or commonly abused "fake-looking" TLDs
    const forbiddenTlds = ["cs", "test", "example", "invalid", "localhost"]
    return tld && !forbiddenTlds.includes(tld)
  }, {
    message: "This email domain is not supported or is invalid"
  })

const phoneSchema = z.string()
  .optional()
  .or(z.literal(""))
  .refine((val) => {
    if (!val) return true
    return isValidPhoneNumber(val)
  }, {
    message: "Please enter a valid international phone number (e.g. +1234567890)"
  })

// Auth Schemas
export const loginSchema = z.object({
  email: strictEmail,
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: strictEmail,
  phone: phoneSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
  role: z.enum(["patient", "doctor"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

// Profile Schemas
export const patientProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: phoneSchema,
  dateOfBirth: z.string().nullable().optional().or(z.literal("")),
  gender: z.enum(["male", "female"]).nullable().optional().or(z.literal("")),
  address: z.string().nullable().optional().or(z.literal("")),
  medicalHistory: z.string().nullable().optional().or(z.literal("")),
  profilePictureUrl: z.string().nullable().optional(),
})

export const doctorProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: phoneSchema,
  specialization: z.string().nullable().optional().or(z.literal("")),
  qualification: z.string().nullable().optional().or(z.literal("")),
  experienceYears: z.coerce.number().min(0).nullable().optional(),
  bio: z.string().nullable().optional().or(z.literal("")),
  cvUrl: z.string().nullable().optional(),
  profilePictureUrl: z.string().nullable().optional(),
})

// Appointment Schema
export const appointmentSchema = z.object({
  doctorId: z.number().positive(),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  reasonForVisit: z.string().min(1, "Reason for visit is required"),
})

// Contact Us Schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: strictEmail,
  role: z.enum(["patient", "doctor", "visitor"]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Forgot/Reset Password Schemas
export const forgotPasswordSchema = z.object({
  email: strictEmail,
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required").optional(),
}).refine((data) => !data.confirmPassword || data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
