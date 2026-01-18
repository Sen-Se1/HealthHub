import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const searchFields = searchParams.getAll("searchFields") // name, specialization, qualification, experience_years, bio
    const minExperience = parseInt(searchParams.get("minExperience") || "0")
    const maxExperience = parseInt(searchParams.get("maxExperience") || "100")
    const sortBy = searchParams.get("sortBy") || "relevance" 

    const where: any = {
      is_approved: true,
      experience_years: {
        gte: minExperience,
        lte: maxExperience,
      }
    }

    if (search) {
      const searchMode = "insensitive" as const
      const orConditions: any[] = []
      
      // Default to searching all text fields if no specific fields selected
      const fields = searchFields.length > 0 ? searchFields : ['name', 'specialization', 'qualification', 'bio']

      if (fields.includes('name')) {
        const searchTerms = search.trim().split(/\s+/).filter(Boolean)
        if (searchTerms.length > 0) {
            orConditions.push({
                AND: searchTerms.map(term => ({
                    OR: [
                        { user: { first_name: { contains: term, mode: searchMode } } },
                        { user: { last_name: { contains: term, mode: searchMode } } }
                    ]
                }))
            })
        } else {
             // Fallback if split results in empty (unlikely with trim)
            orConditions.push({ user: { first_name: { contains: search, mode: searchMode } } })
            orConditions.push({ user: { last_name: { contains: search, mode: searchMode } } })
        }
      }
      
      if (fields.includes('specialization')) {
        orConditions.push({ specialization: { contains: search, mode: searchMode } })
      }
      
      if (fields.includes('qualification')) {
        orConditions.push({ qualification: { contains: search, mode: searchMode } })
      }

      if (fields.includes('bio')) {
        orConditions.push({ bio: { contains: search, mode: searchMode } })
      }

      if (orConditions.length > 0) {
        where.OR = orConditions
      }
    }

    let orderBy: any = {}
    switch (sortBy) {
        case "experience_desc":
            orderBy = { experience_years: "desc" }
            break;
        case "experience_asc":
            orderBy = { experience_years: "asc" }
            break;
        // visual only for now as price is not in the model yet, or we assume something else
        // default to id desc for stable sort if relevance
        default:
            orderBy = { id: "desc" }
            break;
    }

    const rawDoctors = await prisma.doctor.findMany({
      where,
      include: {
        user: true,
      },
      orderBy,
    })

    const doctors = rawDoctors.map((d) => ({
      id: d.id,
      first_name: d.user.first_name,
      last_name: d.user.last_name,
      profile_picture_url: d.user.profile_picture_url,
      phone: d.user.phone,
      specialization: d.specialization,
      experience_years: d.experience_years,
      qualification: d.qualification,
      cv_url: d.cv_url,
      bio: d.bio,
      is_approved: d.is_approved,
    }))

    return Response.json({ doctors })
  } catch (error) {
    console.error("[v0] Error fetching doctors:", error)
    return Response.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}
