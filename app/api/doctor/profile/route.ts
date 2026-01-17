import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "doctor") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const doctorRaw = await prisma.doctor.findUnique({
      where: { user_id: user.id },
      include: {
        user: true,
      },
    })

    if (!doctorRaw) {
      return Response.json({ error: "Doctor profile not found" }, { status: 404 })
    }

    const doctor = {
      ...doctorRaw,
      first_name: doctorRaw.user.first_name,
      last_name: doctorRaw.user.last_name,
      email: doctorRaw.user.email,
      phone: doctorRaw.user.phone,
      profile_picture_url: doctorRaw.user.profile_picture_url,
    }

    return Response.json({ doctor })
  } catch (error) {
    console.error("[v0] Get doctor profile error:", error)
    return Response.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "doctor") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { specialization, qualification, experienceYears, bio, cvUrl, profilePictureUrl } = await request.json()

    // We first need the doctor ID associated with this user
    const doctorRecord = await prisma.doctor.findUnique({
      where: { user_id: user.id },
    })

    if (!doctorRecord) {
      return Response.json({ error: "Doctor profile not found" }, { status: 404 })
    }

    const doctor = await prisma.doctor.update({
      where: { id: doctorRecord.id },
      data: {
        specialization,
        qualification: qualification || null,
        experience_years: experienceYears || null,
        bio: bio || null,
        cv_url: cvUrl || null,
        user: {
          update: {
            profile_picture_url: profilePictureUrl,
          },
        },
      },
    })

    return Response.json({
      message: "Profile updated successfully",
      doctor,
    })
  } catch (error) {
    console.error("[v0] Update doctor profile error:", error)
    return Response.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
