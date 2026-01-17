export interface User {
  id: number
  email: string
  role: "patient" | "doctor" | "admin"
  first_name: string
  last_name: string
  phone?: string
  profile_picture_url?: string
  created_at: string
  updated_at: string
}

export interface Patient extends User {
  date_of_birth?: string
  gender?: string
  address?: string
  medical_history?: string
  emergency_contact?: string
  emergency_phone?: string
}

export interface Doctor extends User {
  specialization: string
  qualification?: string
  experience_years?: number
  cv_url?: string
  bio?: string
  is_approved: boolean
  approval_date?: string
}

export interface Appointment {
  id: number
  patient_id: number
  doctor_id: number
  appointment_date: string
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled"
  reason_for_visit?: string
  notes?: string
  created_at: string
  updated_at: string
}
