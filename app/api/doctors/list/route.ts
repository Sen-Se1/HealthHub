import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const specialization = searchParams.get("specialization") || ""

    const where: any = {
      is_approved: true,
    }

    if (specialization && specialization !== "all") {
      where.specialization = specialization
    }

    if (search) {
      where.OR = [
        { user: { first_name: { contains: search, mode: "insensitive" } } },
        { user: { last_name: { contains: search, mode: "insensitive" } } },
        { bio: { contains: search, mode: "insensitive" } },
        { specialization: { contains: search, mode: "insensitive" } },
      ]
    }

    const rawDoctors = await prisma.doctor.findMany({
      where,
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
