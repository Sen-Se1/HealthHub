import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify session and get user with profile
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            patient: true,
            doctor: true,
          },
        },
      },
    })

    if (!session || session.expires_at < new Date()) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const user = session.user

    // Get role-specific info
    if (user.role === "patient" && user.patient) {
      return NextResponse.json({
        user: { ...user, ...user.patient },
      })
    } else if (user.role === "doctor" && user.doctor) {
      return NextResponse.json({
        user: { ...user, ...user.doctor },
      })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: true,
      },
    })

    if (!session || session.expires_at < new Date()) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const userId = session.user_id
    const userRole = session.user.role

    let body: any = {}
    const contentType = request.headers.get("content-type") || ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      
      // Helper to get string value or undefined
      const getString = (key: string) => {
        const value = formData.get(key)
        return value ? String(value) : undefined
      }

      // Extract text fields
      body = {
        firstName: getString("firstName"),
        lastName: getString("lastName"),
        phone: getString("phone"),
        dateOfBirth: getString("dateOfBirth"),
        gender: getString("gender"),
        address: getString("address"),
        medicalHistory: getString("medicalHistory"),
        specialization: getString("specialization"),
        qualification: getString("qualification"),
        experienceYears: formData.get("experienceYears") ? Number(formData.get("experienceYears")) : undefined,
        bio: getString("bio"),
      }

      // Handle Files
      const processFile = async (fileKey: string, folder: string = "uploads") => {
        const file = formData.get(fileKey) as File | null
        if (file && file.size > 0) {
          try {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            
            // Create unique filename
            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
            const path = require("path")
            const fs = require("fs/promises")
            
            // Ensure directory exists
            const uploadDir = path.join(process.cwd(), "public", folder)
            try {
              await fs.access(uploadDir)
            } catch {
              await fs.mkdir(uploadDir, { recursive: true })
            }
            
            await fs.writeFile(path.join(uploadDir, filename), buffer)
            return `/${folder}/${filename}`
          } catch (e) {
            console.error(`Error saving ${fileKey}:`, e)
            return null
          }
        }
        return null
      }

      const profilePictureUrl = await processFile("profilePicture")
      if (profilePictureUrl) body.profilePictureUrl = profilePictureUrl

      const cvUrl = await processFile("cv")
      if (cvUrl) body.cvUrl = cvUrl

    } else {
      body = await request.json()
    }

    const { 
      firstName, lastName, phone, dateOfBirth, gender, address, medicalHistory, profilePictureUrl,
      // Doctor specific fields
      specialization, qualification, experienceYears, bio, cvUrl 
    } = body

    // Update user basic info and profile
    await prisma.user.update({
      where: { id: userId },
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        // Only update if provided
        ...(profilePictureUrl && { profile_picture_url: profilePictureUrl }),
        patient:
          userRole === "patient"
            ? {
                update: {
                  date_of_birth: dateOfBirth || null,
                  gender: gender || null,
                  address: address || null,
                  medical_history: medicalHistory || null,
                },
              }
            : undefined,
        doctor:
          userRole === "doctor"
            ? {
                update: {
                  specialization: specialization || undefined,
                  qualification: qualification || null,
                  experience_years: experienceYears || null,
                  bio: bio || null,
                  ...(cvUrl && { cv_url: cvUrl }),
                },
              }
            : undefined,
      },
    })

    // Fetch updated user to return
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true,
        doctor: true,
      },
    })

    if (!updatedUser) {
        return NextResponse.json({ error: "User not found after update" }, { status: 404 })
    }

    // Return structured data matching GET response
    if (updatedUser.role === "patient" && updatedUser.patient) {
      return NextResponse.json({
        user: { ...updatedUser, ...updatedUser.patient },
        success: true
      })
    } else if (updatedUser.role === "doctor" && updatedUser.doctor) {
      return NextResponse.json({
        user: { ...updatedUser, ...updatedUser.doctor },
        success: true
      })
    }

    return NextResponse.json({ user: updatedUser, success: true })
  } catch (error) {
    console.error("[v0] Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
