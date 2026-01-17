import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const rawDoctors = await prisma.doctor.findMany({
      // where: { is_approved: true },
      include: {
        user: true,
      },
      orderBy: {
        user: {
          first_name: "asc",
        },
      },
    })

    const doctors = rawDoctors.map((d) => ({
      id: d.id,
      first_name: d.user.first_name,
      last_name: d.user.last_name,
      profile_picture_url: d.user.profile_picture_url,
      specialization: d.specialization,
      experience_years: d.experience_years,
      bio: d.bio,
      is_approved: d.is_approved,
    }))

    return Response.json({ doctors })
  } catch (error) {
    console.error("[v0] Error fetching doctors:", error)
    return Response.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}
